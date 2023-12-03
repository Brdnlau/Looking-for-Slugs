import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ExpandedCard.css'
import Card from 'react-bootstrap/Card';
import fillerImage from '../components/images/filler_image.jpg'
import fillerImage2 from '../components/images/GoogleMapTA.webp'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      <Modal size="lg"show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
              <div class = "top_section">
                  <Card.Img variant="top" class = "top_image" src={fillerImage} />
              </div>
              <Card.Body>
                  <Card.Text>
                      <span class = "bold">Organizer:</span> {props.organizer}
                  </Card.Text>
                  <Card.Text class = "fix_margin">
                      <span class = "bold">Time:</span> <span class = "time">{props.time}</span>
                  </Card.Text>
                  <Card.Text class = "fix_margin">
                      <span class = "bold">Date:</span> <span class = "date">{props.date}</span>
                  </Card.Text>
                  <Card.Text>
                      <span class = "bold">Location:</span> {props.location}
                  </Card.Text>
                  <Card.Text>
                      <span class = "bold">Description:</span> {props.content}
                  </Card.Text>
                  <Card.Text>
                      <span class = "bold">Members:</span>
                      <Row>
                        {props.members.map((member) => 
                        <Col xs={4} md={4}>{member}</Col>)}
                      </Row>
                  </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Card.Title><span class = "bold">Map:</span></Card.Title>
                
                <div class = "map">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.7794582955084!2d-122.06729852300826!3d36.99119715690797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e4199114b7b31%3A0x2ff8246c9c50ae92!2sRachel%20Carson%20College!5e0!3m2!1sen!2sus!4v1701585391930!5m2!1sen!2sus" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
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