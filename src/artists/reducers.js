import { combineReducers } from 'redux'
import fromPairs from 'lodash/fromPairs'
import map from 'lodash/map'
import assign from 'lodash/assign'

const initialState = {
  list: {},
  next: null,
  search: [],
  topTracks: [],
  isLoading: false,
  isValid: false,
  limit: 20,
  offset: 0,
}

function list(state = initialState.list, action) {
  switch (action.type) {
    case 'clearArtists':
      return {}
    case 'addArtists':
    case 'setArtists':
      return assign(
        {},
        state,
        fromPairs(map(action.artists.items, item => [item.id, item])),
      )
    default:
      return state
  }
}

function search(state = initialState.search, action) {
  switch (action.type) {
    case 'clearArtists':
      return []
    case 'setArtists':
      return map(action.artists.items, 'id')
    case 'addArtists':
      return [...state, ...map(action.artists.items, 'id')]
    default:
      return state
  }
}

function topTracks(state = initialState.search, action) {
  switch (action.type) {
    case 'setTopTracks':
      return assign({}, state, {
        [action.artistId]: map(action.topTracks, track => track.id),
      })
    default:
      return state
  }
}
function next(state = initialState.next, action) {
  switch (action.type) {
    case 'clearArtists':
      return null
    case 'addArtists':
    case 'setArtists':
      return action.artists.next
    default:
      return state
  }
}

function offset(state = initialState.offset, action) {
  switch (action.type) {
    case 'clearArtists':
      return 0
    case 'setArtists':
      return initialState.limit
    case 'addArtists':
      return state + initialState.limit
    default:
      return state
  }
}

function limit(state = initialState.limit, action) {
  switch (action.type) {
    default:
      return state
  }
}

function isLoading(state = initialState.isLoading, action) {
  switch (action.type) {
    case 'readArtists':
      return true
    case 'clearArtists':
    case 'setArtists':
      return false
    default:
      return state
  }
}

function isValid(state = initialState.isValid, action) {
  switch (action.type) {
    case 'setSearch':
      return action.search === ''
    case 'clearArtists':
    case 'setArtists':
      return true
    case 'invalidateArtists':
      return false
    default:
      return state
  }
}

export default combineReducers({
  list,
  next,
  limit,
  offset,
  topTracks,
  search,
  isValid,
  isLoading,
})
