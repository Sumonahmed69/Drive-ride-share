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
            <div className="input col-md-2">
                <div className=' text-bg'>
                    <p>mirpur</p>
                    <p>To</p>
                    <p>danmoindhi</p>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default Destination;