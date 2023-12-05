import React from "react";
import "./Box.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ExpandedCard from "./ExpandedCard";
import { EditEventButton } from "./EditEventButton";

function Box(props) {
  function handleClick() {
    props.buttonClick(props.id);
  }

  function militaryToStandard(time) {
    time = time.split(":"); // convert to array
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var timeValue;
    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
    timeValue += hours >= 12 ? " PM" : " AM";
    return timeValue;
  }

  return (
    <div class="margins">
      <Card>
        <div class="top_section">
          <Card.Img
            variant="top"
            class="top_image"
            src={props.image}
          />
          {props.showPrimaryButton ? 
          <Button variant="light" onClick={handleClick}>
            {props.buttonText}
          </Button> : <></>
          }
          {props.edit ? 
          <EditEventButton class="edit_button" eventId={props.id}/> : <></>}
          <Badge pill bg="light" text="dark">
            {props.memberCount} / {props.capacity}
          </Badge>
        </div>
        <Card.Body>
          <Card.Title>
            <span class="bold">{props.title}</span>
          </Card.Title>
          <Card.Text>
            <span class="bold">Organizer:</span> {props.organizer}
          </Card.Text>
          <Card.Text class="fix_margin">
            <span class="bold">Time:</span>{" "}
            <span class="time">{militaryToStandard(props.time)}</span>
          </Card.Text>
          <Card.Text>
            <span class="bold">Date:</span>{" "}
            <span class="date">{props.date}</span>
          </Card.Text>
          <Card.Text>
            <span class="bold">Location:</span> {props.location}
          </Card.Text>
          <Card.Text>
            <span class="bold">Description:</span> {props.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <ExpandedCard
            buttonText={props.buttonText}
            title={props.title}
            time={militaryToStandard(props.time)}
            date={props.date}
            location={props.location}
            content={props.content}
            members={props.members}
            organizer={props.organizer}
            image={props.image}
            map={props.map}
          />
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Box;
