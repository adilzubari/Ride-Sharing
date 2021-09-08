import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Components
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Drivers from "./Pages/Drivers";
import Rides from "./Pages/Rides";
import Promos from "./Pages/Promos";
import Settings from "./Pages/Settings";
import DriversRequests from "./Pages/Drivers Requests";
// Styles
import "../../assets/styles/css/Body/style.css";

export default function Body() {
  return (
    <Switch>
      <Route path="/users">
        <Users />
      </Route>

      <Route path="/drivers">
        <Drivers />
      </Route>

      <Route path="/drivers_requests">
        <DriversRequests />
      </Route>

      <Route path="/rides">
        <Rides />
      </Route>

      <Route path="/promos">
        <Promos />
      </Route>

      <Route path="/settings">
        <Settings />
      </Route>

      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  );
}
