import React, { useState } from 'react';
import './Vehicles.css'
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Vehicles = (props) => {

    const { img, vehicleType } = props.vehicle;
 
    const history = useHistory()

    const handelRide = () => {
        
        history.push(`/destination/${vehicleType}`);
    }

    

    return (
        <Card className='col-md-2 card' >
            <img src={img} alt=""/>            
            <button id='vehicles-btn' onClick={handelRide}>{vehicleType}</button>
        </Card>
    );
};

export default Vehicles;