import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import Rating from './components/Rating.jsx';

export default class Recipe extends Component {
    render() {
        return (
            <div className="row-md-4">
                <div>{this.props.recipe.recipe}</div>
                <div><Rating/></div>
            </div>
        );
    }
}

Recipe.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    recipe: PropTypes.object.isRequired,
};
