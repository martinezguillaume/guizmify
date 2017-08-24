import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { BlurView } from 'expo'
import { SimpleLineIcons } from '@expo/vector-icons'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import pure from 'recompose/pure'
import { StackNavigator } from 'react-navigation'

import Home from '../home'
import Artist from '../artists/artist'
import store from '../store'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    height: 54,
    width: 400,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default compose(pure)(function PlayerBar(props) {
  return (
    <BlurView style={styles.container} tint="light" intensity={90}>
      <SimpleLineIcons name="control-pause" size={24} />
    </BlurView>
  )
})
