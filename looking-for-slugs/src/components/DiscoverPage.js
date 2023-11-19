import React, { useEffect, useState } from 'react';
import './DiscoverPage.css';
import NavbarHome from './Navbar';
import Box from './Box';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateEventModal from './create_event_modal';
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { firestorePullEvents, firestoreAddUserToEvent, signIn } from '../firestoreHandler';

function Discover(){
    const [user, loading, error] = useAuthState(auth);
    const [eventsList, setEventsList] = useState([]);

    function handleJoinEvent(docID) {
        if (!user) {
            signIn().then((newUser) => 
            {firestoreAddUserToEvent(newUser.uid, docID);
            setEventsList();
            });
        } else {
            firestoreAddUserToEvent(user.uid, docID);
            setEventsList(prevEventsList =>
            prevEventsList.map(event => event.id === docID ? { ...event, joined: event.joined.concat([""])} : event));
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            return await firestorePullEvents();
        }
        
        fetchData()
        .then((firestoreAllEvents) => {
            setEventsList(firestoreAllEvents);
        });

    }, [user]);

    return (
        <div>
            <NavbarHome/>
            <div className="Discover_txt">
                <h1>Discover</h1>
                <button className="filter">Filter</button>
                <CreateEventModal class="create-button"/>
            </div>
            <div className="boxes">
                <Row>
                {eventsList.map((events) => 
                <Col sm={3}> 
                    <Box id={events.id} buttonClick={handleJoinEvent} buttonText={user && events.joined.includes(user.uid) ? "Leave" : "Join"}
                        title={events.title}
                        time={events.time}
                        location={events.location}
                        content={events.description}
                        memberCount={events.joined.length}
                    ></Box>
                </Col>)}
                </Row>
            </div>
        </div>
    );
}

export default Discover;