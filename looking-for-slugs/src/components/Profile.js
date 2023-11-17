import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import './Profile.css'
import Card from 'react-bootstrap/Card';
import Box from './Box.js';
import Logout from "./Logout";
import ListGroup from 'react-bootstrap/ListGroup';

export default function Profile(props) {
  const user = props.user
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
            <Box/>
            <Box/>
        </Col>
        <Col sm={4}>
            <div class = "Created">
                <h1>Created Events</h1>
            </div>
            <Box/>
        </Col>
    </Row>
  )
}

