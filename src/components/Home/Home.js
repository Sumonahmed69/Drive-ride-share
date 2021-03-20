import React, { useEffect, useState } from 'react';
import './Home.css';
import vehicleData from '../../fakeData/data.json'
import Vehicles from './../vehicles/Vehicles';




const Home = () => {

    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(vehicleData);
    }, [])

    return (
        <div>



            <div className="row" >
                {
                    vehicles.map(vehicle => <Vehicles vehicle={vehicle} > </Vehicles>)
                }
            </div>

        </div>
    );
};

export default Home;