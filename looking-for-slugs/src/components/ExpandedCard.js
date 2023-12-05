import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ExpandedCard.css";
import Card from "react-bootstrap/Card";
import fillerImage from "../components/images/filler_image.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ExpandedCard(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div class="expand_div" onClick={handleShow}>
        <p class="remove_padding">Expand (+)</p>
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <div class="top_section">
              <Card.Img variant="top" class="top_image" src={props.image} />
            </div>
            <Card.Body>
              <Card.Text>
                <span class="bold">Organizer:</span> {props.organizer}
              </Card.Text>
              <Card.Text class="fix_margin">
                <span class="bold">Time:</span>{" "}
                <span class="time">{props.time}</span>
              </Card.Text>
              <Card.Text class="fix_margin">
                <span class="bold">Date:</span>{" "}
                <span class="date">{props.date}</span>
              </Card.Text>
              <Card.Text>
                <span class="bold">Location:</span> {props.location}
              </Card.Text>
              <Card.Text>
                <span class="bold">Description:</span> {props.content}
              </Card.Text>
              <Card.Text>
                <span class="bold">Members:</span>
                <Row>
                  {props.members.map((member) => (
                    <Col xs={4} md={4}>
                      {member}
                    </Col>
                  ))}
                </Row>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Title>
                <span class="bold">Map:</span>
              </Card.Title>

              <div class="map">{props.map}</div>
            </Card.Footer>
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
