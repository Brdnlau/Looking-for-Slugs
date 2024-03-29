import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import "./Profile.css";
import Card from "react-bootstrap/Card";
import Box from "../../Box/Box.js";
import {
  firestorePullUserInfo,
  fireStoreDeleteEvent,
  firestoreLeaveEvent,
} from "../../../Firebase/firestoreHandler.js";
import { importLocationImages } from "../../../helper_functions/ImageMapping.js";

export default function Profile(props) {
  const [joinedEvents, setJoinedEvents] = useState("");
  const [createdEvents, setCreatedEvents] = useState("");
  const locationImages = importLocationImages();
  const user = props.user;

  function handleDeleteEvent(docID) {
    if (fireStoreDeleteEvent(docID)) {
      setCreatedEvents((prevEventsList) =>
        prevEventsList.filter((box) => box.props.id !== docID)
      );
    } else {
      alert("Unable to delete event");
    }
  }

  function handleLeaveEvent(docID) {
    if (firestoreLeaveEvent(user.uid, docID)) {
      setJoinedEvents((prevEventsList) =>
        prevEventsList.filter((box) => box.props.id !== docID)
      );
    } else {
      alert("Error leaving event");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      return await firestorePullUserInfo(user.uid);
    };

    fetchData().then((userInfo) => {
      if (!userInfo) {
        return;
      }
      setJoinedEvents(
        userInfo.joinedEvents.map((events) => (
          <Box
            id={events.id}
            buttonClick={handleLeaveEvent}
            buttonText="Leave"
            title={events.title}
            organizer={events.creatorName}
            time={events.time}
            date={events.date}
            location={events.location}
            content={events.description}
            memberCount={events.joined.length}
            members={events.joined}
            capacity={events.capacity}
            showPrimaryButton={true}
            image={locationImages[events.location][0]}
            map={locationImages[events.location][1]}
          ></Box>
        ))
      );
      setCreatedEvents(
        userInfo.createdEvents.map((events) => (
          <Box
            id={events.id}
            buttonClick={handleDeleteEvent}
            buttonText="Delete"
            title={events.title}
            organizer={events.creatorName}
            time={events.time}
            date={events.date}
            location={events.location}
            content={events.description}
            memberCount={events.joined.length}
            members={events.joined}
            capacity={events.capacity}
            edit={true}
            showPrimaryButton={true}
            image={locationImages[events.location][0]}
            map={locationImages[events.location][1]}
          ></Box>
        ))
      );
    }, []);
  }, []);
  return (
    <Row className="Rows">
      <Col sm={4}>
        <div class="profile_div">
          <h1>Profile</h1>
          <Card>
            <Card.Img class="profile_pic" src={user.photoURL} />
            <Card.Body>
              <Card.Title class="user_name">{user.displayName}</Card.Title>
              <Card.Text class="center">Rating 5.0/5.0</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Col>
      <Col sm={4}>
        <div class="Joined">
          <h1>Joined Events</h1>
        </div>
        {joinedEvents}
      </Col>
      <Col sm={4}>
        <div class="Created">
          <h1>Created Events</h1>
        </div>
        {createdEvents}
      </Col>
    </Row>
  );
}
