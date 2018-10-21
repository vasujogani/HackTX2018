import React, {Component, Fragment} from 'react';
import './App.css';

class RecipeCard extends Component {

    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            title: this.props.recipe.title,
            img_src: this.props.recipe.img_src,
            ingredients: this.props.recipe.ingredients,
            link: this.props.link
        }
    }

  render() {
      return (
        <Fragment>
            <a href={this.state.link}>
                <img src={this.state.img_src} />
            </a>
            <h1>{this.state.title}</h1>
            <table style={{marginTop: "60px"}} className="table-fill">
                <tbody className="table-hover">
                    {this.state.ingredients.map( (item, index) => {
                        return(
                            <tr key={index}>
                                <td width="300px" className="text-center">{item}</td>
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
