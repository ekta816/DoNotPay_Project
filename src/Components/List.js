import React from "react";
import Card from "./Card";
import AddTaskForm from "./AddNewTask";
import "./List.css";

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <li key={index}>
          <Card {...card} onDragStart={this.props.onDragStart} />
        </li>
      );
    });

    return (
      <div>
        <h2 className={`name-header name-${this.props.id}`}>
          {this.props.title}
        </h2>
        <ul
          className="list"
          onDragOver={this.props.onDragOver}
          onDrop={this.props.onDrop}
        >
          {cards}
          <li className="add-list-wrapper">
            <AddTaskForm formNum={this.props.id} onAdd={this.props.onAdd} />
          </li>
        </ul>
      </div>
    );
  }
}
