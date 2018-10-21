import React, {Component, Fragment} from 'react';
import './App.css';
import RecipeCard from "./RecipeCard";


class Dashboard extends Component {

  render() {
    return (
      <div className="tri-flex">
          {(this.props.recipeList ? this.props.recipeList.recipes : JSON.parse(localStorage.getItem('recipeData')).recipes).map( (item, index) => {
              return(
                  <Fragment key={index}>
                      {item.img_src &&
                      <div className="tri-item">
                          <RecipeCard recipe={item}/>
                      </div>}
                  </Fragment>
              );
          })}
      </div>
    );
  }
}

export default Dashboard;
