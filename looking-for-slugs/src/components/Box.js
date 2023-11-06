import React from 'react';
import './Box.css'

function Box(thing) {
    return (
        <div className='box'>
            <h2>{thing.title}</h2>
            <h2 className='time'>{thing.time}</h2>
            <h2>{thing.location}</h2>
            <p>{thing.content}</p>
            <button onClick={thing.onRemove}>remove</button>
        </div>
    );
}

export default Box;