import createStore from 'redux/lib/createStore'

import rootReducer from './reducers'

const configureStore = () => {
	const reducers = (state, action) => {
		switch (action.type) {
			// All dispatched actions
			default:
				break
		}
		return rootReducer(state, action)
	}

	const appStore = createStore(
		reducers,
		undefined,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__(),
	)

	return appStore
}

export default configureStore()
