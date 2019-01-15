import React, { Component } from 'react';
import buddha from '../images/buddha.png';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h3>Webpack 4 + React 16 + Babel 7 Framework</h3>
        <img src={buddha} />
      </div>
    );
  }
}
