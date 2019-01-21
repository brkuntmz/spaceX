import React, { Component } from "react";
import "./App.css";
import Launches from "./components/Launches";
import logo from "./SpaceX.png";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LaunchDetails from "./components/LaunchDetails";
import MissionAppendix from "./components/MissionAppendix";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container	">
          <img
            src={logo}
            alt="SpaceX Missions"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <hr />
          <Switch>
            <Route path="/" component={Launches} exact />
            <Route path="/launch/:id" component={LaunchDetails} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
