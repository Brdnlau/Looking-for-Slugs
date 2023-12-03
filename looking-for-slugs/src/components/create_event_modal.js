import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { firestoreCreateEvent } from "../firestoreHandler";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function CreateEventModal(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const handleSubmit = (event) => {
    const form = document.querySelector("#event_form");
    //Check if date is in the past

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      //Check if date is in the past
      let inputtedDate = new Date(document.querySelector("#date").value + "T" + document.querySelector("#time").value + ":00");
      let todayDate = new Date();
      if (inputtedDate < todayDate || inputtedDate === todayDate) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector("#date").value = "";
        document.querySelector("#time").value = "";
        setValidated(true);
        return;
      }
      setShow(false);
      firestoreCreateEvent(
        document.querySelector("#title").value,
        document.querySelector("#time").value,
        document.querySelector("#date").value,
        document.querySelector("#location").value,
        document.querySelector("#description").value,
        user.uid,
        user.displayName 
      );
      console.log("Submitted event to Firestore");
    }

    setValidated(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={props.class} onClick={handleShow}>
        Create Event
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            id="event_form"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="name" placeholder="name" autoFocus />
              <Form.Control.Feedback type="invalid">
                Please choose a name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control required type="date" autoFocus />
              <Form.Control.Feedback type="invalid">
                Please select a valid date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control
                required
                type="time"
                placeholder="HH:MM AM/PM"
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Please select a valid time.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control required type="location" autoFocus />
              <Form.Control.Feedback type="invalid">
                Please name a location.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group required className="mb-3" controlId="description">
              <Form.Label>Activity</Form.Label>
              <Form.Control as="textarea" rows={2} required />
              <Form.Control.Feedback type="invalid">
                Please describe the activity.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateEventModal;
