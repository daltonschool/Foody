import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Recipes } from '../api/recipes.js';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Recipe from './Recipe.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="container">
              <header>
                <h1>Foody</h1>

                <AccountsUIWrapper />
              </header>

              <div>
                  <Recipe recipe={{recipe:'this is my recipe'}}/>
                food goes here
              </div>
            </div>
        );
    }
}

App.propTypes = {
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe("recipes");

    return {
        currentUser: Meteor.user(),
    };
}, App);
