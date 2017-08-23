import thunk from 'redux-thunk'
import applyMiddleware from 'redux/lib/applyMiddleware'
import createStore from 'redux/lib/createStore'
import bindActionCreators from 'redux/lib/bindActionCreators'
import compose from 'recompose/compose'

import compact from 'lodash/compact'

import rootReducer from './reducers'
import * as actionCreators from './actions'
import api from './api'

export let actions

const middleware = applyMiddleware(
	thunk.withExtraArgument({
		api,
	}),
)

const enhancer = compose(
	...compact([
		middleware,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__(),
	]),
)

const configureStore = () => {
	const reducers = (state, action) => {
		switch (action.type) {
			// All dispatched actions
			default:
				break
		}
		return rootReducer(state, action)
	}

	const store = createStore(reducers, undefined, enhancer)

	actions = bindActionCreators(actionCreators, store.dispatch)

	return store
}

export default configureStore()
