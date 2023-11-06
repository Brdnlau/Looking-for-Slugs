import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function CreateEventModal() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = document.querySelector("#event_form");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else {
        setShow(false);
        // Console Reporting - Push to database
        console.log("Works");
    }

    setValidated(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button class = "button_color" onClick={handleShow}>
        Create Event
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} id="event_form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="name"
                        placeholder="name"
                        autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                        Please choose a name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        required
                        type="time"
                        placeholder="HH:MM AM/PM"
                        autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                        Please select a time.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        required
                        type="location"
                        autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                        Please name a location.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                required
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Activity</Form.Label>
                    <Form.Control as="textarea" rows={2} required/>
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

/*
<Form noValidate validated={validated} onSubmit={handleSubmit}>
            <InputGroup hasValidation>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type="name"
                    placeholder="name"
                    autoFocus
                />
                <Form.Control.Feedback type="invalid">
                    Please choose a name.
                </Form.Control.Feedback>
                </Form.Group>
            </InputGroup>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Time</Form.Label>
              <Form.Control
                required
                type="time"
                placeholder="HH:MM AM/PM"
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Please select a time.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="location"
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Please name a location.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              required
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Activity</Form.Label>
              <Form.Control.Feedback type="invalid">
                Please describe the activity.
              </Form.Control.Feedback>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
          </Form>
*/