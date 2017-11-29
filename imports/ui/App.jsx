import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Routes from './Routes.jsx';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="wrapper">
              <Routes currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

App.propTypes = {
    currentUser: PropTypes.object,
};

export default createContainer(() => {

    return {
        currentUser: Meteor.user(),
    };
}, App);
