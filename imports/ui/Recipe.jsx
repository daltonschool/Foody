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
    recipe: PropTypes.object.isRequired,
};
