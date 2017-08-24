import React from 'react';
import { View } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withContext from 'recompose/withContext';

import { withConstants, withStoreProps } from '../modules/decorators';
import Navigation from './navigation'
import store, { actions } from './store';

export default compose(
  withContext(
    {
      actions: PropTypes.objectOf(PropTypes.func).isRequired,
      store: PropTypes.object.isRequired,
    },
    () => ({
      actions,
      store,
    })
  ),
  withConstants,
  withStoreProps(['user']),
  lifecycle({
    componentDidMount() {
      const { actions } = this.props;
      actions.requestToken();
    },
  })
)(function Root(props) {
  const { user: { token } } = props;
  return !token.isValid || token.isLoading ? <AppLoading /> : <Navigation />;
});
