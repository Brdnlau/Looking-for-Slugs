import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import CreateEventModal from "./create_event_modal";
import ProfileDropdown from "./ProfileDropdown";

function NavbarForHome(props) {
  return (
    <div className="spacing">
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="#home">
          Looking For Slugs{" "}
          <img
            className="logo_nav"
            src={require("../components/images/lfs.png")}
            width="60"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link eventKey={2} as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link eventKey={3} as={Link} to="/discover">
              Discover
            </Nav.Link>
            {props.user ? 
            <Nav.Link>
              <CreateEventModal class="event_creation_button" />
            </Nav.Link> : <></>
            }
            <Nav.Link eventKey={5} as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link>
              {props.user ? (
                <ProfileDropdown class="dropdown" user={props.user} />
              ) : (
                <LoginButton class="login-button" text="Login" />
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarForHome;
