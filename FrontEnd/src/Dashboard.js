import React, { Component } from 'react';
import './App.css';
import RecipeCard from "./RecipeCard";


class Dashboard extends Component {

  render() {
    return (
      <div className="tri-flex">
          {(this.props.recipeList ? this.props.recipeList.recipes : JSON.parse(localStorage.getItem('recipeData')).recipes).map( (item, index) => {
              return(
                  <div key={index} className="tri-item">
                      <RecipeCard recipe={item}/>
                  </div>
              );
          })}
      </div>
    );
  }
}

export default Dashboard;
