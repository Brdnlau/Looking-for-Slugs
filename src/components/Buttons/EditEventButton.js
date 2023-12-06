import { useState } from "react";
import Button from "react-bootstrap/Button";
import EventForm from "../Forms/EventForm";
import { editPost } from "../../Firebase/firestoreHandler";

export function EditEventButton(props) {
    const [show, setShow] = useState(false)
    function handleClick() {
        setShow(true);
    }
    return (
        <div>
            <Button variant="light" className={props.class} onClick={handleClick}>Edit</Button>
            <EventForm setShow={setShow} show={show} onSubmit={editPost} eventId={props.eventId}/>
        </div>
    );
}