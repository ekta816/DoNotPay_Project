import React, { Component } from "react";
import "./Board.css";
import List from "./List";

export default class Board extends Component {
  constructor(props) {
    super(props);
    //if there's a localStorage to be had grab it otherwise set state
    if (localStorage.getItem("lists")) {
      const rawLS = localStorage.getItem("lists");
      const parsedLS = JSON.parse(rawLS);
      this.state = { lists: parsedLS };
    } else {
      this.state = {
        lists: [
          {
            title: "Pending Task",
            id: 0,
            cards: [
              {
                taskText: "Task 1",
                listNumber: 0,
                timeId: 0
              },
              {
                taskText: "Task 2",
                listNumber: 0,
                timeId: 1
              }
            ]
          },
          {
            title: "In Progress",
            id: 1,
            cards: [
              {
                taskText: "Task 3",
                listNumber: 1,
                timeId: 2
              },
              {
                taskText: "Task 4",
                listNumber: 1,
                timeId: 3
              }
            ]
          },
          {
            title: "Completed",
            id: 2,
            cards: [
              {
                taskText: "Task 5",
                listNumber: 2,
                timeId: 4
              },
              {
                taskText: "Task 6",
                listNumber: 2,
                timeId: 5
              }
            ]
          }
        ]
      };
      localStorage.setItem("lists", JSON.stringify(this.state.lists));
    }
  }

  onDragStart = (e, fromList) => {
    console.log(`what a drag!`);
    const dragInfo = {
      taskId: e.currentTarget.id,
      fromList: fromList
    };

    localStorage.setItem("dragInfo", JSON.stringify(dragInfo));
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDrop = (e, listNum) => {
    const droppedTask = localStorage.getItem("dragInfo");
    const rawLS = localStorage.getItem("lists");
    const parsedLS = JSON.parse(rawLS);
    const parseInfo = JSON.parse(droppedTask);


    const cards = parsedLS[parseInfo.fromList].cards;
    const taskCard = cards.find(
      (card) => card.timeId == parseInfo.taskId
    );
    const indexOfCard = cards.findIndex(
      (card) => card.timeId == parseInfo.taskId
    );
    parsedLS[parseInfo.fromList].cards.splice(indexOfCard, 1);
    parsedLS[listNum].cards.push({
      ...taskCard,
      listNumber: parseInt(listNum)
    });

    this.setState({
      lists: parsedLS
    });
    localStorage.setItem("lists", JSON.stringify(parsedLS));
  };

  addCard(taskText, listNumber) {
    const rawLS = localStorage.getItem("lists");
    const parsedLS = JSON.parse(rawLS);

    const newTask = {
      taskText,
      listNumber,
      timeId: new Date().valueOf()
    };

    parsedLS[listNumber].cards.push(newTask);

    this.setState({
      lists: parsedLS
    });
    localStorage.setItem("lists", JSON.stringify(parsedLS));
  }

  render() {
    const lists = this.state.lists.map((list, index) => (
      <li className="list-wrapper" key={index}>
        <List
          {...list}
          onAdd={(taskText, listNumber) =>
            this.addCard(taskText, listNumber)
          }
          onDragStart={(e, fromList) => this.onDragStart(e, `${list.id}`)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e, listNum) => {
            this.onDrop(e, `${list.id}`);
          }}
        />
      </li>
    ));

    return (
      <div className="board">
        <ul className="lists">{lists}</ul>
      </div>
    );
  }
}
