import assign from 'lodash/assign';
import qs from 'qs';

const api = 'https://api.spotify.com/v1';
let token = null;

export const setToken = newToken => {
  token = newToken;
};

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const fetchResponse = content => (route, body, customApiURL, customHeader, customBody) =>
  fetch(
    `${customApiURL || api}/${route}${!body || !body.params
      ? ''
      : `?${qs.stringify(body.params)}`}`,
    assign({}, content, {
      headers: assign({}, getHeaders(), customHeader),
      body: content.method === 'GET' ? null : customBody || JSON.stringify(body),
    })
  ).then(response => response.json());

export default {
  post: fetchResponse({ method: 'POST' }),
  get: fetchResponse({ method: 'GET' }),
};
