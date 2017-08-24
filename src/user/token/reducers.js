import { combineReducers } from 'redux';

const initialState = {
  value: null,
  isLoading: false,
  isValid: false,
};

function value(state = initialState.value, action) {
  switch (action.type) {
    case 'setUserToken':
      return action.token;
    default:
      return state;
  }
}

function isLoading(state = initialState.isLoading, action) {
  switch (action.type) {
    case 'requestToken':
      return true;
    case 'setUserToken':
      return false;
    default:
      return state;
  }
}

function isValid(state = initialState.isValid, action) {
  switch (action.type) {
    case 'setUserToken':
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  value,
  isValid,
  isLoading,
});
