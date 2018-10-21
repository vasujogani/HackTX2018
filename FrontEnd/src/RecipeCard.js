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
            link: this.props.link,
            price: this.props.recipe.missing_cost
        }
    }

    compare(a, b) {
        if (1/*a is less than b by some ordering criterion*/) {
            return -1;
        }
        if (1/*a is greater than b by the ordering criterion*/) {
            return 1;
        }
        // a must be equal to b
        return 0;
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
                    <tr>
                        <td width="300px" className="text-center" style={{fontWeight: "bold"}}>Cost of Missing Items: </td>
                        <td className="text-center" style={{fontWeight: "bolder"}}>${this.state.price}</td>
                    </tr>
                    {this.state.ingredients.map( (item, index) => {
                        return(
                            <tr key={index}>
                                <td width="300px" className="text-center">{item.name}</td>
                                {item.available ?
                                    <td className="text-center">&#10003;</td> :
                                    <td className="text-center">&#10007;</td>}
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
