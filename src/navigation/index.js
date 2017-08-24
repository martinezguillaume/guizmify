import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import pure from 'recompose/pure';
import { StackNavigator } from 'react-navigation';

import Home from '../home';
import store from '../store';

const AppNavigator = StackNavigator(
  {
    Home: { screen: Home },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

export default compose(pure)(function Navigation(props) {
  return <AppNavigator />;
});
