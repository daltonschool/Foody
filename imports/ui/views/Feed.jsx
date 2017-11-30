import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Recipes } from '../../api/recipes.js';
import Recipe from '../Recipe.jsx';

import { createContainer } from 'meteor/react-meteor-data';

class Feed extends Component {
    render() {
        return (
            <div className="feed container">
                {this.props.recipes.map(function(recipe, index){
                    return <Recipe key={ index } recipe={ recipe }/>;
                })}
            </div>
        );
    }
}

Feed.propTypes = {
};

export default createContainer(() => {
    Meteor.subscribe('recipes');

    return {
        recipes: Recipes.find({}).fetch()
    };
}, Feed);
