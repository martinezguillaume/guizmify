export function requestToken(username, password) {
	return (dispatch, getState, { api }) => {
		dispatch({ type: 'requestToken' })
		return api.user
			.authorize()
			.then(result => {
				console.log(result)
				// dispatch(setToken(result.token))
				// dispatch(setLogin(result.user.login))
				// return result.token
			})
			.catch(error => console.log('error', error))
	}
}
