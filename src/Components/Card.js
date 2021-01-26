import React from "react";
import "./Card.css";

export default function Card(props) {
  return (
    <div
      className="task-card"
      draggable="true"
      id={[props.timeId]}
      onDragStart={props.onDragStart}
    >
      {props.taskText}
    </div>
  );
}
