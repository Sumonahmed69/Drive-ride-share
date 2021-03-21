import React, { useContext } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './../../firebaseConfig';
import { useState } from 'react';
import { UserContext } from './../../App';
import { useHistory, useLocation } from 'react-router';
import icon from '../../fakeData/images/ggl.png';
import icon2 from '../../fakeData/images/ffff.png';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: "",
        photo: "",
        email: "",
        password: '',
        error: '',
        sucess: false
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { photoURL, displayName, email } = res.user;
                const signedInUser = {

                    isSignedIn: true,
                    name: displayName,
                    photo: photoURL,
                    email: email
                }
                setUser(signedInUser);
                // history.replace(from);
                console.log(res);
            })

            .catch(err => {
                console.log("error")
            })
    }

    const handleSignOut = () => {

        firebase.auth().signOut()
            .then(res => {
                const signedOutuser = {
                    isSignedIn: false,
                    name: "",
                    photo: "",
                    email: ""
                }
                setUser(signedOutuser);
            })
            .catch(err => {
                console.log("error");

            })
    }


    const handleBlur = (e) => {
        let isformValid = true;
        if (e.target.name === 'email') {
            isformValid = /\S+@\S+\.\S+/.test(e.target.value);

        }

        if (e.target.name === 'password') {
            isformValid = e.target.value.length > 6;
        }

        if (isformValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            updateUserName(user.name);
        }
    }

    const handleOnSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.sucess = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.sucess = false;
                    setUser(newUserInfo);

                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.sucess = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log("sing user info user", user);


                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.sucess = false;
                    setUser(newUserInfo);
                });

        }
        e.preventDefault();
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    }


    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        // user.updateProfile ({
        //     displayName: name 
        // })
        // .then(function () {
        //     console.log("usern name update done");
        //     // Update successful.
        // }).catch(function (error) {
        //     console.log(" update erre");
        //     // An error happened.
        // });

    }
    return (

        <div className='form'>

            < div className='login-frm' >

                {
                    user.isSignedIn ? <h4 >Logout</h4> :
                        <h4 >Login</h4>
                }


                <form onSubmit={handleOnSubmit}>
                    {newUser && <input type="text" name='name' className="login-input" placeholder='Enter your Name' onBlur={handleBlur} />}          <br />
                    <input type="text" name='email' onBlur={handleBlur} className="login-input" placeholder="Enter your email" required id="" /> <br />
                    <input type="password" name='password' onBlur={handleBlur} className="login-input" placeholder="Enter your Password" required id="" /> <br />
                    <input type="submit" id='btn' value="LOGIN" />
                </form>
                <small style={{ color: 'red' }}> {user.error}</small>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New user sign up</label><br />
                {
                    user.sucess && <small style={{ color: 'green' }}> user {newUser ? "created" : "logged in"} successfully</small>

                }
            </div >



            <div className='login-frm'>
                <br />
                {
                    user.isSignedIn ? <button onClick={handleSignOut} >logout</button> :
                        <button id='google-btn' onClick={handleSignIn} > <img className='icon' src={icon} alt="" /> Login with Google</button>
                }

                <button id='google-btn' onClick={handleFbSignIn}  > <img className='icon' src={icon2} alt="" /> Login with Facebook</button>

            </div>







        </div>
    );
};

export default Login;