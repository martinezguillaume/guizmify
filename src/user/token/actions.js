export const requestToken = (username, password) => {
	return (dispatch, getState, { api }) => {
		dispatch({ type: 'requestToken' })
		return api.user
			.token()
			.then(({ access_token }) => dispatch(setUserToken(access_token)))
	}
}

export const setUserToken = token => ({
	type: 'setUserToken',
	token,
})
