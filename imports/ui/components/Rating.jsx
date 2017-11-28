import React, { Component } from 'react';
var RatingField = require('react-rating');

class Rating extends Component {
    onRate(event) {
        console.log(event);
    }

    render() {
        return (
            <RatingField onChange={this.onRate.bind(this)}/>
        );
    }
}

export default Rating;