import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginButton from './LoginButton';
import {Link} from 'react-router-dom';

function NavbarForHome() {
  return (
    <div className = "spacing">
      <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="#home">Looking For Slugs {' '}
          <img
                className = "logo_nav"
                src={require("../components/images/lfs.png")}
                width="60"
                height="50"
              />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Nav.Link eventKey={2} as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link eventKey={3} as={Link} to="/discover">
                Discover
              </Nav.Link>
              <Nav.Link eventKey={4} href="#memes">
                Create
              </Nav.Link>
              <Nav.Link eventKey={5} href="#memes">
                About
              </Nav.Link>
              <LoginButton class="login-button" text="Login" />
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarForHome;