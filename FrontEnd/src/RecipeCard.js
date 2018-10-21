import React, {Component, Fragment} from 'react';
import './App.css';

class RecipeCard extends Component {

    constructor(props){
        super(props);
        if(this.props.recipe){
            this.state = {
                title: this.props.recipe.title,
                img_src: this.props.recipe.img_src,
                ingredients: this.props.recipe.ingredients
            }
        }
    }

  render() {
      return (
        <Fragment>
            <img src={this.state.img_src} />
            <h1>{this.state.title}</h1>
            <table className="table-fill">
                <thead>
                    <tr>
                        <th className="text-center">Ingredient</th>
                        <th className="text-center">Do I Have It?</th>
                    </tr>
                    </thead>
                    <tbody className="table-hover">
                    {this.state.ingredients.map( (item, index) => {
                        return(
                            <tr key={index}>
                                <td width="180px" className="text-center">{item}</td>
                                <td className="text-center">&#10003;</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    );
  }
}

export default RecipeCard;
