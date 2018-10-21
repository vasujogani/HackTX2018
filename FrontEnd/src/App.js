import React, {Component, Fragment} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Ingredients from "./Ingredients";
import firebase from './firebase.js';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            recipeList: null
        };
        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        this.updateRecipeList = this.updateRecipeList.bind(this);
        firestore.settings(settings);
    }

    componentDidMount(){
        this.setState({db: firebase.firestore()});
    }

    updateRecipeList(data){
        localStorage.setItem("recipeData", JSON.stringify(data));
        this.setState({
            recipeList: data
        });
    }

  render() {
    return (
        <Fragment>
            <Navbar />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={(props) => ( <LandingPage updateRecipeList={this.updateRecipeList}/> )}/>
                    <Route exact path="/dashboard" render={(props) => ( <Dashboard recipeList={this.state.recipeList}/> )}/>
                    <Route exact path="/ingredients" render={(props) => ( <Ingredients />)}/>
                    <Route render={(props) => ( <NotFound/> )}/>
                </Switch>
            </BrowserRouter>
        </Fragment>
    );
  }
}

export default App;
