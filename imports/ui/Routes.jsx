import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Feed from './views/Feed.jsx';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                  <Switch>
                    <Route exact path='/' component={Feed}/>
                    <Route path='/user/:userid' component={Feed}/>
                    <Route path='/recipe/:recipeid' component={Feed}/>
                  </Switch>
                </BrowserRouter>
            </div>
        );
    }
}