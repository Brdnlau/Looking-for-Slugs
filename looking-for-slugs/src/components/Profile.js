import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import './Profile.css'
import Card from 'react-bootstrap/Card';
import Box from './Box.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { firestorePullUserInfo, fireStoreDeleteEvent } from '../firestoreHandler.js';

export default function Profile(props) {
    const [joinedEvents, setJoinedEvents] = useState("LOADING EVENTS");
    const [createdEvents, setCreatedEvents] = useState("LOADING EVENTS");

    const user = props.user

    function handleDeleteEvent(docID) {
        fireStoreDeleteEvent(docID);
    }
    
    function handleLeaveEvent(docID) {
        return;
    }

    useEffect(() => {
        const fetchData = async () => {
            return await firestorePullUserInfo(user.uid);
        }
        
        fetchData()
        .then((userInfo) => {
            setJoinedEvents(userInfo.joinedEvents.map((events) =>  
            <Box id={events.id} buttonClick={handleLeaveEvent} buttonText="Leave"
                title={events.title}
                time={events.time}
                location={events.location}
                content={events.description}
                memberCount={events.joined.length}
            ></Box>))
            setCreatedEvents(userInfo.createdEvents.map((events) =>  
            <Box id={events.id} buttonClick={handleDeleteEvent} buttonText="Delete"
                title={events.title}
                time={events.time}
                location={events.location}
                content={events.description}
                memberCount={events.joined.length}
            ></Box>))
        });

    }, []);
    return (
        <Row className='Rows'>
            <Col sm={4}>
                <div class = "profile_div">
                    <h1>Profile</h1>
                    <Card>
                        <Card.Img class = "profile_pic" src={user.photoURL} />
                        <Card.Body>
                            <Card.Title class = "user_name">{user.displayName}</Card.Title>
                            <Card.Text class = "center">Rating 5.0/5.0</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
            <Col sm={4}>
                <div class = "Joined">
                    <h1>Joined Events</h1>
                </div>
                {joinedEvents}
            </Col>
            <Col sm={4}>
                <div class = "Created">
                    <h1>Created Events</h1>
                </div>
                {createdEvents}
            </Col>
        </Row>
    )
}

