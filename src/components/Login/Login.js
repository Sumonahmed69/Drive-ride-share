import React, { useContext } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './../../firebaseConfig';
import { useState } from 'react';
import { UserContext } from './../../App';


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
        password: ''

    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const provider = new firebase.auth.GoogleAuthProvider();
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
                .then(res => {

                    console.log(res);

                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    console.log('err')
                  });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                   
                    // ...
                    console.log("signInIfo" ,user);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });

        }
        e.preventDefault();
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        // user.updateProfile({
        //     displayName: "",
        // }).then(function () {
        //     // Update successful.
        // }).catch(function (error) {
        //     // An error happened.
        // });

    }
    return (
        <div className='login-frm'>
            {
                user.isSignedIn ? <button onClick={handleSignOut} >logout</button> :
                    <button onClick={handleSignIn} >login</button>
            } <br/> <br/>
            <button>Sign in With Facebook</button>

            {
                user.isSignedIn && <div>
                    <p> WELCOME {user.name}</p>
                    <p> {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h3>Our Authentication</h3>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New user sign up</label>
            <form onSubmit={handleOnSubmit}>
                {newUser && <input type="text" name='name' onBlur={handleBlur} />}          <br />
                <input type="text" name='email' onBlur={handleBlur} className="login-input" placeholder="email" required id="" /> <br />
                <input type="password" name='password' onBlur={handleBlur} className="login-input" placeholder="passs" required id="" /> <br />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default Login;