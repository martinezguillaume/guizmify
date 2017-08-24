import { combineReducers } from 'redux';
import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';

const initialState = {
  list: {},
  search: [],
  isLoading: false,
  isValid: false,
};

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'clearArtists':
      return {};
    case 'setArtists':
      return fromPairs(map(action.artists, item => [item.id, item]));
    default:
      return state;
  }
}

function search(state = initialState.search, action) {
  switch (action.type) {
    case 'clearArtists':
      return [];
    case 'setArtists':
      return map(action.artists, 'id');
    default:
      return state;
  }
}

function isLoading(state = initialState.isLoading, action) {
  switch (action.type) {
    case 'readArtists':
      return true;
    case 'clearArtists':
    case 'setArtists':
      return false;
    default:
      return state;
  }
}

function isValid(state = initialState.isValid, action) {
  switch (action.type) {
    case 'clearArtists':
    case 'setArtists':
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  list,
  search,
  isValid,
  isLoading,
});
