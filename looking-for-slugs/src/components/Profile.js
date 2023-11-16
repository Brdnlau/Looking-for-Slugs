import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import './Profile.css'
import Card from 'react-bootstrap/Card';

export default function Profile(props) {
  const user = props.user
  return (
    <Row>
        <Col sm={4}>
            <div class = "profile_div">
                <Card>
                    <Card.Img class = "profile_pic" src={user.photoURL} />
                    <Card.Body>
                        <Card.Title class = "user_name">{user.displayName}</Card.Title>
                        <Card.Text class = "center">Rating 5.0/5.0</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Col>
        <Col sm={8}>
        </Col>
    </Row>
  )
}

