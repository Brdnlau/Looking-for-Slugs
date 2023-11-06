import React from 'react';
import './Box.css'

function Box(thing) {
    return (
        <div className='box'>
            <h2>Title: {thing.title}</h2>
            <h2 className='time'>Time: {thing.time}</h2>
            <h2>Location: {thing.location}</h2>
            <p>Description: {thing.content}</p>
            <button onClick={thing.onRemove}>remove</button>
        </div>
    );
}

export default Box;