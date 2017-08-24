export * from './artist/actions'

export const requestArtists = () => {
  return (dispatch, getState, { api }) => {
    dispatch({ type: 'readArtists' })
    const { home: { search }, offset, limit } = getState()
    if (search === '') {
      return
    }
    return api
      .search('artist', getState().home.search, offset, limit)
      .then(({ artists }) => dispatch(setArtists(artists)))
  }
}

export const requestMoreArtists = () => {
  return (dispatch, getState, { api }) => {
    const { artists: { offset, limit } } = getState()
    return api
      .search('artist', getState().home.search, offset, limit)
      .then(({ artists }) => dispatch(addArtists(artists)))
  }
}

export const setArtists = artists => ({
  type: 'setArtists',
  artists,
})

export const addArtists = artists => ({
  type: 'addArtists',
  artists,
})

export const clearArtists = () => ({
  type: 'clearArtists',
})

export const invalidateArtists = () => ({
  type: 'invalidateArtists',
})
