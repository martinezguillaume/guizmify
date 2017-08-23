import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import compose from 'recompose/compose'
import store from './store'

export default compose()(function Root(props) {
	return (
		<Provider store={store}>
			<View />
		</Provider>
	)
})
