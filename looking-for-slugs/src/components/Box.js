import React from 'react';
import './Box.css'
import Card from 'react-bootstrap/Card';
import fillerImage from '../components/images/filler_image.jpg';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


function Box(thing) {
    return (
        <div class = "margins">
            <Card>
                <div class = "top_section">
                    <Card.Img variant="top" class = "top_image" src={fillerImage} />
                    <Button variant="light">Join</Button>{' '}
                    <Badge pill bg="light" text="dark">
                        - / 30
                    </Badge>
                </div>
                <Card.Body>
                <Card.Title><span class = "bold">{thing.title}</span></Card.Title>
                <Card.Text class = "fix_margin">
                    <span class = "bold">Time:</span> <span class = "time">{thing.time}</span>
                </Card.Text>
                <Card.Text>
                    <span class = "bold">Location:</span> {thing.location}
                </Card.Text>
                <Card.Text>
                    <span class = "bold">Description:</span> {thing.content}
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Box;