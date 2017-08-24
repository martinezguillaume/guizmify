import qs from 'qs';
import request from '../modules/tools/request';

import { CLIENT_ID, REDIRECT_URI, AUTHORIZATION_TOKEN } from './setup';

export default {
  user: {
    token: (username, password) =>
      request.post(
        'token',
        null,
        'https://accounts.spotify.com/api',
        {
          Authorization: `Basic ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        qs.stringify({
          grant_type: 'client_credentials',
        })
      ),
  },
  search: (type, q) =>
    request.get('search', {
      params: {
        type,
        q,
      },
    }),
};
