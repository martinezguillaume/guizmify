import { combineReducers } from 'redux';

const initialState = {
  search: '',
};

function search(state = initialState.search, action) {
  switch (action.type) {
    case 'setSearch':
      return action.search;
    default:
      return state;
  }
}

export default combineReducers({
  search,
});
