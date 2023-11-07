import React, { useState } from 'react';
import './DiscoverPage.css';
import NavbarHome from './Navbar';
import Box from './Box';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateEventModal from './create_event_modal';
import { firestorePullEvents } from '../firestoreHandler';


function Discover(){
    const firestoreList = firestorePullEvents();
    const [allEvents, setAllEvents] = useState(<div></div>);

    setTimeout(() => {
        setAllEvents(firestoreList.map((events) => 
            <Col sm={3}> 
                <Box
                    title={events[0]}
                    time={events[1]}
                    location={events[2]}
                    content={events[3]}
                ></Box>
                </Col>
            ))
    }, 1000);
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
                    {allEvents}
                </Row>
            </div>
        </div>
    );
}

export default Discover;