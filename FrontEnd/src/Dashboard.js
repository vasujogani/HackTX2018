import React, {Component, Fragment} from 'react';
import './App.css';
import RecipeCard from "./RecipeCard";


class Dashboard extends Component {

  render() {
      console.log(this.props);
    return (
      <div className="tri-flex">
          {(this.props.recipeList ? this.props.recipeList.recipes : JSON.parse(localStorage.getItem('recipeData')).recipes).map( (item, index) => {
              return(
                  <Fragment key={index}>
                      {item.img_src &&
                      <div className="tri-item">
                          <RecipeCard link={item.link} recipe={item}/>
                      </div>}
                  </Fragment>
              );
          })}
      </div>
    );
  }
}

export default Dashboard;
