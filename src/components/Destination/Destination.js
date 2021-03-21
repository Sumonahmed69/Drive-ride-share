import React from 'react';
import './Destination.css';

const Destination = () => {


    return (
        <div className='row'>
            <div className="input col-md-6">
                <input type="text " placeholder="from" className="input-field"></input>
                <input type="text " placeholder="to" className="input-field"></input>
                <button className="input-field" id='input-btn'>Search </button>
            </div>

<iframe src="https://www.google.com/maps"  frameborder="0">
    
</iframe>

        </div>

    );
};

export default Destination;