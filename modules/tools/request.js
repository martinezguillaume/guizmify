import assign from 'lodash/assign'

const api = 'https://api.spotify.com'
let token = null

export const setToken = newToken => {
	token = newToken
}

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: token,
}

const fetchResponse = content => (route, body, customApiURL) =>
	fetch(
		`${customApiURL || api}/${route}`,
		assign({}, content, {
			headers,
			body: content.method !== 'GET' && JSON.stringify(body),
		}),
	).then(response => response.json())

export default {
	post: fetchResponse({ method: 'POST' }),
	get: fetchResponse({ method: 'GET' }),
}
