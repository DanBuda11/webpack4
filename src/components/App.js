import React, { Component } from 'react';
import apple from '../images/apple.png';
import bird from '../images/bird.png';

export default class App extends Component {
  render() {
    return (
      <div className="background">
        <h1>Hello React!</h1>
        <img src={apple} />
        <img src={bird} />
      </div>
    );
  }
}
