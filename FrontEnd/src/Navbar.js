import React, { Component } from 'react';
import './App.css';
import {Link} from "react-router-dom";



class Navbar extends Component {

    render() {
        return (
            <header className="App-header">
                <div className="navbar">
                    <div className="nav-left">
                        <h1 style={{cursor: "pointer"}} onClick={() => {window.location="/"}}>Bread and Butter</h1>
                    </div>
                     <div className="nav-right">
                        <h1 style={{cursor: "pointer"}} onClick={() => {window.location="/ingredients"}}>Add Ingredients</h1>
                     </div>
                </div>
            </header>
        );
    }
}

export default Navbar;
