import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Board from "./Components/Board";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(<Board />, document.getElementById("root"));
