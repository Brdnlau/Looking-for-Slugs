import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ExpandedCard.css'
import Card from 'react-bootstrap/Card';

function ExpandedCard(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div class = "expand_div" onClick={handleShow}>
        <p class = "remove_padding">
            Expand (+)
        </p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card>
                <Card.Body>
                    <Card.Title><span class = "bold">{props.title}</span></Card.Title>
                    <Card.Text>
                        <span class = "bold">Owner:</span> Owner
                    </Card.Text>
                    <Card.Text class = "fix_margin">
                        <span class = "bold">Time:</span> <span class = "time">{props.time}</span>
                    </Card.Text>
                    <Card.Text>
                        <span class = "bold">Location:</span> {props.location}
                    </Card.Text>
                    <Card.Text>
                        <span class = "bold">Description:</span> {props.content}
                    </Card.Text>
                </Card.Body>
            </Card>    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ExpandedCard;