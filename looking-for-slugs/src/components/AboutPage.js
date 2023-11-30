import React from "react";
import './AboutPage.css';
import NavbarHome from './Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import firstimg from '../components/images/teamwork.jpg';
import sndimg from '../components/images/brainstorm.jpg';
import thirdimg from '../components/images/team.jpg';

function AboutPage() {

    return (
        <div>
            <NavbarHome/>
            <Row className="Rows">
                <Col sm={4}>
                    <div className="Our Mission">
                        <h1>Our Mission</h1>
                        <p className="Text">At Looking for Slugs, we believe in the power of connection and shared experiences. Our mission is to create a vibrant community where individuals can seamlessly create and join events, fostering meaningful connections that transcend boundaries and create lasting friendships
                        Our purpose is to empower users to effortlessly organize and participate in sporting events, from social gatherings to professional meetups, enhancing the tapestry of experiences that enrich lives.
                        </p>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className="AboutProject">
                        <h1>Core Values</h1>
                        <h3>Inclusivity:</h3>
                        <p>We embrace diversity and create a platform where everyone feels welcome and valued. Our events cater to various interests, ensuring a space for every individual to connect.</p>
                        <h3>Ease of Use:</h3>
                        <p>We are committed to providing a user-friendly experience. Our platform is designed to be intuitive, making event creation and participation simple and enjoyable.</p>
                        <h3>Community Building:</h3>
                        <p>We strive to build a strong sense of community among our users. Through shared interests and experiences, we aim to create lasting connections that extend beyond the events themselves.</p>
                        <h3>Innovation:</h3>
                        <p> We are dedicated to staying at the forefront of event technology. By continually evolving and incorporating innovative features, we aim to enhance the overall event creation and participation experience.</p>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className="AboutUs">
                        <h1>About the Creators</h1>
                        <p className="Text2">The Looking for Slugs team consists of four passionate individuals looking to leave a mark on the world: Abhay Singh, Brandon Lau, Daniel Sarni, and Granger Pasko. Each team member brings a unique set of skills and experiences to the table, united by a common vision of creating a dynamic and inclusive space for event creation and connection. Our team is more than a collection of individuals; we are a collaborative force driven by shared values and a commitment to excellence.</p>
                    </div>
                </Col>
            </Row>
            <Row className="Rows">
                <Col sm={4}>
                    <img src={firstimg}></img>
                </Col>
                <Col sm={4}>
                    <img src={sndimg}></img>
                </Col>
                <Col sm={4}>
                    <img src={thirdimg}></img>
                </Col>
            </Row>
        </div>

    )
}
export default AboutPage;

