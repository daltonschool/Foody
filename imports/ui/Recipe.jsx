import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class Recipe extends Component {
    render() {
        return <div>{this.props.recipe}</div>;
    }
}

Recipe.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    recipe: PropTypes.object.isRequired,
};
