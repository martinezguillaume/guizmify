import { combineReducers } from 'redux';
import fromPairs from 'lodash/fromPairs';
import assign from 'lodash/assign';
import map from 'lodash/map';

const initialState = {
  list: {},
  isPlaying: false,
  selectedTrack: null,
};

function isPlaying(state = initialState.isPlaying, action) {
  switch (action.type) {
    case 'setSelectedTrack':
      return true;
    case 'setIsPlaying':
      return action.isPlaying;
    default:
      return state;
  }
}

function selectedTrack(state = initialState.selectedTrack, action) {
  switch (action.type) {
    case 'setSelectedTrack':
      return action.selectedTrack;
    default:
      return state;
  }
}

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'setTopTracks':
      return assign({}, state, fromPairs(map(action.topTracks, track => [track.id, track])));
    default:
      return state;
  }
}

export default combineReducers({
  list,
  isPlaying,
  selectedTrack,
});
