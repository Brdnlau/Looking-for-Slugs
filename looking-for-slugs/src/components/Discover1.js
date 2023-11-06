import React, { useState } from 'react';
import './Discover1.css';
import NavbarHome from './Navbar';
import Box from './Box';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function Discover(){
    const [boxes, setBoxes] = useState([]);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [location, setlocation] = useState('');
    const [content, setContent] = useState('');

    const addBox = () => {
        if (title && time && location && content) {
            const newBox = {
                title: title,
                time: time,
                location: location,
                content: content,
            };
            setBoxes([...boxes, newBox]);
            setTitle('');
            setTime('');
            setlocation('');
            setContent('');
        }
    }

    const removeBox = (index) => {
        const newBoxes = [...boxes];
        newBoxes.splice(index, 1);
        setBoxes(newBoxes);
    }

    return (
        <div>
            <NavbarHome/>
            <div className="Discover_txt">
                <h1>Discover</h1>
                <button className="filter">Filter</button>
            </div>
            <div className="box-input">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={addBox}>Add Box</button>
            </div>
            <div className="boxes">
                <Row>
                    {boxes.map((box, index) => ( 
                    <Col sm={3}> 
                    <Box
                        key={index}
                        title={box.title}
                        time={box.time}
                        location={box.location}
                        content={box.content}
                        onRemove={() => removeBox(index)}
                    />
                    </Col>))}
                </Row>
            </div>
        </div>
    );
}

export default Discover;