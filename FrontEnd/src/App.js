import React, {Component, Fragment} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";


class App extends Component {

  render() {
    return (
        <Fragment>
            <Navbar />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={(props) => ( <LandingPage/> )}/>
                    <Route exact path="/dashboard" render={(props) => ( <Dashboard/> )}/>
                    <Route render={(props) => ( <NotFound/> )}/>
                </Switch>
            </BrowserRouter>
        </Fragment>
    );
  }
}

export default App;
