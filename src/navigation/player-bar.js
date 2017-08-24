import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { BlurView } from 'expo';
import { SimpleLineIcons } from '@expo/vector-icons';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';

import last from 'lodash/last';

import { withConstants, withStoreProps } from '../../modules/decorators';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 54,
    width: Dimensions.get('window').width,
  },
  trackContainerStyle: {
    flex: 1,
  },
  itemSubtitle: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

export default compose(
  pure,
  withConstants,
  withStoreProps(({ tracks: { selectedTrack, list, isPlaying } }) => ({
    track: list[selectedTrack],
    isPlaying,
  })),
  withHandlers({
    onPressMusicControl: ({ actions, isPlaying }) => () =>
      isPlaying ? actions.pauseTrack() : actions.resumeTrack(),
  })
)(function PlayerBar(props) {
  const { onPressMusicControl, isPlaying, track } = props;
  const trackImage = track && last(track.album.images);
  return !track
    ? null
    : <BlurView style={styles.container} tint="light" intensity={90}>
        <ListItem
          containerStyle={styles.trackContainerStyle}
          avatar={<Avatar source={trackImage && { uri: trackImage.url }} title={track.name[0]} />}
          titleStyle={styles.itemTitle}
          subtitleStyle={styles.itemSubtitle}
          title={track.name}
          subtitle={track.album.name}
          rightIcon={
            <TouchableOpacity onPress={onPressMusicControl}>
              <SimpleLineIcons
                name={`control-${isPlaying ? 'pause' : 'play'}`}
                size={24}
                style={{ paddingTop: 4 }}
                color="rgba(0, 0, 0, 0.54)"
              />
            </TouchableOpacity>
          }
        />
      </BlurView>;
});
