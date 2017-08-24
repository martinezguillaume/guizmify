export const requestArtists = () => {
  return (dispatch, getState, { api }) => {
    dispatch({ type: 'readArtists' });
    return api
      .search('artist', getState().home.search)
      .then(({ artists }) => dispatch(setArtists(artists.items)));
  };
};

export const setArtists = artists => ({
  type: 'setArtists',
  artists,
});
