export const requestArtistTopTracks = artistId => {
  return (dispatch, getState, { api }) => {
    return api.artist
      .topTracks(artistId)
      .then(({ tracks }) => dispatch(setTopTracks(artistId, tracks)));
  };
};

export const setTopTracks = (artistId, topTracks) => ({
  type: 'setTopTracks',
  artistId,
  topTracks,
});
