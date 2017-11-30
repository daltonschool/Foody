import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import Rating from './components/Rating.jsx';

export default class Recipe extends Component {
    render() {
        return (
            <div className="recipe">
                <h1>{this.props.recipe.name}</h1>
                <h2>{this.props.recipe.author}</h2>
                <h3>Ingredients:</h3>
                <ol>
                    {this.props.recipe.ingredients.map(function(ingredient, index){
                        return <li key={ index }>{ingredient}</li>;
                    })}
                </ol>
                <p>{this.props.recipe.instructions}</p>
                <Rating/>
            </div> 
        );
    }
}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired,
};
