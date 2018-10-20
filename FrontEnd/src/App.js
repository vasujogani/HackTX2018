import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" render={(props) => ( <LandingPage/> )}/>
              <Route exact path="/dashboard" render={(props) => ( <Dashboard/> )}/>
              <Route render={(props) => ( <NotFound/> )}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
