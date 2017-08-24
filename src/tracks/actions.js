import { Audio } from 'expo'
import { Alert, LayoutAnimation } from 'react-native'

const SOUND_OBJECT = new Audio.Sound()
let NEED_RESTART = false

export const playTrack = track => {
  return dispatch => {
    SOUND_OBJECT.unloadAsync()
    SOUND_OBJECT.setOnPlaybackStatusUpdate(status => {
      if (!NEED_RESTART && status.positionMillis >= status.durationMillis) {
        SOUND_OBJECT.stopAsync()
        dispatch(setIsPlaying(false))
        NEED_RESTART = true
      }
    })
    SOUND_OBJECT.loadAsync({ uri: track.preview_url }, null, false)
      .then(() => {
        SOUND_OBJECT.playAsync()
        resumeTrack()
        dispatch(setSelectedTrack(track.id))
      })
      .catch(() => Alert.alert('Erreur', 'Ce son ne peut pas être joué 😩'))
  }
}

export const pauseTrack = () => {
  return dispatch => {
    dispatch(setIsPlaying(false))
    SOUND_OBJECT.pauseAsync()
  }
}

export const resumeTrack = () => {
  return dispatch => {
    if (NEED_RESTART) {
      NEED_RESTART = false
      SOUND_OBJECT.setPositionAsync(0).then(() => {
        SOUND_OBJECT.playAsync()
        dispatch(setIsPlaying(true))
      })
    } else {
      SOUND_OBJECT.playAsync()
      dispatch(setIsPlaying(true))
    }
  }
}

export const setSelectedTrack = selectedTrack =>
  LayoutAnimation.easeInEaseOut() || {
    type: 'setSelectedTrack',
    selectedTrack,
  }

export const setIsPlaying = isPlaying => ({
  type: 'setIsPlaying',
  isPlaying,
})
