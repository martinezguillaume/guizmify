import React from 'react'
import { StatusBar, UIManager } from 'react-native'
import compose from 'recompose/compose'

import Root from './src'

console.disableYellowBox = true
StatusBar.setBarStyle('light-content')
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export default class App extends React.Component {
  render() {
    return <Root />
  }
}
