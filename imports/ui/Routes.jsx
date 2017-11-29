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
                    <Route exact path='/' component={Feed} {...this.props}/>
                    <Route path='/user/:userid' component={Feed} {...this.props}/>
                    <Route path='/recipe/:recipeid' component={Feed} {...this.props}/>
                  </Switch>
                </BrowserRouter>
            </div>
        );
    }
}