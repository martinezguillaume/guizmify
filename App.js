import React from 'react';
import compose from 'recompose/compose';

import Root from './src';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}
