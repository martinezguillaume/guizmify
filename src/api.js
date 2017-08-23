import request from '../modules/tools/request'

import { CLIENT_ID, REDIRECT_URI, AUTHORIZE_URL } from './setup'

export default {
	user: {
		authorize: () => request.get(null, null, AUTHORIZE_URL),
		login: (username, password) =>
			request.post('login', {
				login: username,
				password,
			}),
	},
	posts: {
		read: id => request.get(`posts/${!id ? '' : id}`),
	},
}
