import { useState } from "react";
import EventForm from "../Forms/EventForm";
import { firestoreCreateEvent } from "../../Firebase/firestoreHandler";

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