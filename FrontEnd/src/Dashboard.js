import React, { Component } from 'react';
import './App.css';
import RecipeCard from "./RecipeCard";


class Dashboard extends Component {

  render() {
    return (
      <div className="tri-flex">
          <div className="tri-item">
              <RecipeCard/>
          </div>
          <div className="tri-item">
              <RecipeCard/>
          </div>
          <div className="tri-item">
              <RecipeCard/>
          </div>
      </div>
    );
  }
}

export default Dashboard;
