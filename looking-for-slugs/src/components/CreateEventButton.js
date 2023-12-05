import { useState } from "react";
import EventForm from "./EventForm";
import { firestoreCreateEvent } from "../firestoreHandler";

export function CreateEventButton(props) {
    const [show, setShow] = useState(false)
    function handleClick() {
        setShow(true);
    }
    return (
        <div>
            <button variant="light" className={props.class} onClick={handleClick}>Create Event</button>
            <EventForm setShow={setShow} show={show} onSubmit={firestoreCreateEvent}/>
        </div>
    );
}