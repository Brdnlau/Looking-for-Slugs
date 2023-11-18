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
    const [eventsList, setEventsList] = useState("LOADING EVENTS");

    function handleJoinEvent(docID) {
        if (!user) {
            signIn().then(() => {console.log(user)});
        } else {
            firestoreAddUserToEvent(user.uid, docID);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            return await firestorePullEvents();
        }
        
        fetchData()
        .then((firestoreAllEvents) => {
            setEventsList(firestoreAllEvents.map((events) => 
            <Col sm={3}> 
                <Box id={events.id} buttonClick={handleJoinEvent} buttonText="Join"
                    title={events.title}
                    time={events.time}
                    location={events.location}
                    content={events.description}
                    memberCount={events.joined.length}
                ></Box>
            </Col>))
        });

    }, []);

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
                    {eventsList}
                </Row>
            </div>
        </div>
    );
}

export default Discover;