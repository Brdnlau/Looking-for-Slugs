import React, { useEffect, useState } from "react";
import "./DiscoverPage.css";
import NavbarHome from "./Navbar";
import Box from "./Box";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  firestorePullEvents,
  firestoreAddUserToEvent,
  signIn,
  firestoreLeaveEvent,
} from "../firestoreHandler";
import { CreateEventButton } from "./CreateEventButton";
import { importLocationImages } from "../helper_functions/ImageMapping";

function Discover() {
  const [user] = useAuthState(auth);
  const [eventsList, setEventsList] = useState([]);
  const locationImages = importLocationImages();

  function handleJoinEvent(docID) {
    if (firestoreAddUserToEvent(user.uid, docID)) {
    setEventsList((prevEventsList) =>
        prevEventsList.map((event) =>
        event.id === docID
            ? { ...event, joined: [user.displayName, ...event.joined] }
            : event
        )
    );
    } else {
        alert("Error joining Event");
    }
  }

  function handleLeaveEvent(docID) {
    if (firestoreLeaveEvent(user.uid, docID)) {
      setEventsList((prevEventsList) =>
        prevEventsList.map((event) =>
          event.id === docID
            ? {
                ...event,
                joined: event.joined.filter((id) => id !== user.displayName),
              }
            : event
        )
      );
    } else {
      alert("Error leaving Event");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      return await firestorePullEvents();
    };
    fetchData().then((firestoreAllEvents) => {
      setEventsList(firestoreAllEvents);
    });
  }, []);

  return (
    <div>
      <NavbarHome user={user} />
      <div className="Discover_txt">
        <h1>Discover</h1>
        <button className="filter">Filter</button>
        {user ? <CreateEventButton class="create-button" /> : <></>}
      </div>
      <div className="boxes">
        <Row>
          {eventsList.map((events) => (
            <Col sm={3}>
              <Box
                id={events.id}
                buttonClick={
                  user && events.joined.includes(user.displayName)
                    ? handleLeaveEvent
                    : handleJoinEvent
                }
                buttonText={
                  user && events.joined.includes(user.displayName)
                    ? "Leave"
                    : "Join"
                }
                title={events.title}
                organizer={events.creatorName}
                time={events.time}
                date={events.date}
                location={events.location}
                content={events.description}
                memberCount={events.joined.length}
                members={events.joined}
                capacity={events.capacity}
                showPrimaryButton={!user || (events.joined.length - events.capacity == 0) && !(events.joined.includes(user.displayName))? false : true}
                image={locationImages[events.location][0]}
                map={locationImages[events.location][1]}
              ></Box>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Discover;
