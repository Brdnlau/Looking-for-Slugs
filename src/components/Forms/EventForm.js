import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { auth } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { editPost } from "../../Firebase/firestoreHandler";

function EventForm(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = document.querySelector("#event_form");
    //Check if date is in the past

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      //Check if date is in the past
      let inputtedDate = new Date(
        document.querySelector("#date").value +
          "T" +
          document.querySelector("#time").value +
          ":00"
      );
      console.log(inputtedDate);
      let inputtedCapacity = document.querySelector("#capacity").value;
      let todayDate = new Date();

      function isInt(value) {
        return (
          !isNaN(value) &&
          (function (x) {
            return (x | 0) === x;
          })(parseFloat(value))
        );
      }

      if (isInt(inputtedCapacity) === true) {
        if (Number(inputtedCapacity) < 0 || Number(inputtedCapacity) > 99) {
          event.preventDefault();
          event.stopPropagation();
          document.querySelector("#capacity").value = "";
          setValidated(true);
          return;
        }
      } else {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector("#capacity").value = "";
        setValidated(true);
        return;
      }

      if (inputtedDate < todayDate || inputtedDate === todayDate) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector("#date").value = "";
        document.querySelector("#time").value = "";
        setValidated(true);
        return;
      }
      props.setShow(false);
      props.onSubmit(
        {eventTitle: document.querySelector("#title").value,
        eventTime: document.querySelector("#time").value,
        eventDate: document.querySelector("#date").value,
        eventLocation: document.querySelector("#location").value,
        eventDescription: document.querySelector("#description").value,
        eventCapacity: document.querySelector("#capacity").value,
        creatorId: auth.currentUser.uid,
        creatorName: auth.currentUser.displayName,
        eventId: props.eventId}
      ); 
    }

    setValidated(true);
  };
  const handleClose = () => props.setShow(false);

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
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
              <Form.Control required as="select" className="form-select">
                <option value={""}>--Please Select a Location--</option>
                <option>Rachel Carson College</option>
                <option>Oakes College</option>
                <option>Porter College</option>
                <option>Kresge College</option>
                <option>Merrill College</option>
                <option>College 9</option>
                <option>Crown College</option>
                <option>Cowell College</option>
                <option>Stevenson College</option>
                <option>John R. Lewis College</option>
                <option>East Field</option>
                <option>West Field</option>
                <option>McHenry Library</option>
                <option>Science and Engineering Library</option>
                <option>Stevenson Library</option>
                <option>Porter Meadow</option>
              </Form.Control>
              {/* <Form.Control required type="location" autoFocus /> */}
              <Form.Control.Feedback type="invalid">
                Please select a location.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group required className="mb-3" controlId="description">
              <Form.Label>Activity</Form.Label>
              <Form.Control as="textarea" rows={2} required />
              <Form.Control.Feedback type="invalid">
                Please describe the activity.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group required className="mb-3" controlId="capacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                required
                type="capacity"
                placeholder="30"
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Please name a capacity limit in between 0 - 99.
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

export default EventForm;
