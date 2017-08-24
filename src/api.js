import qs from 'qs';
import request from '../modules/tools/request';

import { AUTHORIZATION_TOKEN } from './setup';

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
  artist: {
    topTracks: artistId =>
      request.get(`artists/${artistId}/top-tracks`, {
        params: {
          country: 'US',
        },
      }),
  },
  search: (type, q, offset, limit) =>
    request.get('search', {
      params: {
        type,
        q,
        limit,
        offset,
      },
    }),
};
