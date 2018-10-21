import React, {Component, Fragment} from 'react';
import './App.css';

class RecipeCard extends Component {

  render() {
    return (
        <Fragment>
            <img src="https://www.tasteofhome.com/wp-content/uploads/2017/10/Meat-Loaf-Muffins_EXPS_SDFM17_11393_B10_07_5b-1-1024x1024.jpg" />
            <h1>Food 1</h1>
            <table className="table-fill">
                <thead>
                <tr>
                    <th className="text-center">Ingredient</th>
                    <th className="text-center">Do I Have It?</th>
                </tr>
                </thead>
                <tbody className="table-hover">
                <tr>
                    <td className="text-center">January</td>
                    <td className="text-center">&#10003;</td>
                </tr>
                <tr>
                    <td className="text-center">February</td>
                    <td className="text-center">&#10007;</td>
                </tr>
                <tr>
                    <td className="text-center">March</td>
                    <td className="text-center">&#10007;</td>
                </tr>
                <tr>
                    <td className="text-center">April</td>
                    <td className="text-center">&#10003;</td>
                </tr>
                <tr>
                    <td className="text-center">May</td>
                    <td className="text-center">&#10003;</td>
                </tr>
                </tbody>
            </table>
        </Fragment>
    );
  }
}

export default RecipeCard;
