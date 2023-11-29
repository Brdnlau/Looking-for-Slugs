import React from 'react';
import './Box.css'
import Card from 'react-bootstrap/Card';
import fillerImage from '../components/images/filler_image.jpg';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import CardFooter from 'react-bootstrap/esm/CardFooter';
import ExpandedCard from './ExpandedCard'

function Box(props) {
    function handleClick() {
        props.buttonClick(props.id);
    }

    function militaryToStandard(time){
        time = time.split(':'); // convert to array
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var timeValue;
        if (hours > 0 && hours <= 12) {
          timeValue= "" + hours;
        } else if (hours > 12) {
          timeValue= "" + (hours - 12);
        } else if (hours === 0) {
          timeValue= "12";
        }
         
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        timeValue += (hours >= 12) ? " PM" : " AM";
        return (timeValue);
    }

    return (
        <div class = "margins">
            <Card>
                <div class = "top_section">
                    <Card.Img variant="top" class = "top_image" src={fillerImage} />
                    <Button variant="light" onClick={handleClick}>{props.buttonText}</Button>{' '}
                    <Badge pill bg="light" text="dark">
                        {props.memberCount} / 30
                    </Badge>
                </div>
                <Card.Body>
                    <Card.Title><span class = "bold">{props.title}</span></Card.Title>
                    <Card.Text>
                        <span class = "bold">Organizer:</span> {props.organizer}
                    </Card.Text>
                    <Card.Text class = "fix_margin">
                        <span class = "bold">Time:</span> <span class = "time">{militaryToStandard(props.time)}</span>
                    </Card.Text>
                    <Card.Text>
                        <span class = "bold">Location:</span> {props.location}
                    </Card.Text>
                    <Card.Text>
                        <span class = "bold">Description:</span> {props.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <ExpandedCard 
                        buttonText={props.buttonText}
                        title={props.title}
                        time={militaryToStandard(props.time)}
                        location={props.location}
                        content={props.content}
                        members={props.members}/>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Box;