import React from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
  RefreshControl,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import { Input } from 'react-native-elements'
import { AppLoading, LinearGradient, Constants } from 'expo'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'

import debounce from 'lodash/debounce'
import identity from 'lodash/identity'
import forEach from 'lodash/forEach'

import { withConstants, withStoreProps } from '../../../modules/decorators'

export default compose(
  withConstants,
  withStoreProps(['artists', 'home']),
)(function Artist(props) {
  return null
})
