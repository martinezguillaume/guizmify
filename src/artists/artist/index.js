import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, ListItem, Input, Divider } from 'react-native-elements';
import { Constants, LinearGradient } from 'expo';
import { SimpleLineIcons } from '@expo/vector-icons';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import lifecycle from 'recompose/lifecycle';

import identity from 'lodash/identity';
import last from 'lodash/last';

import { withConstants, withStoreProps } from '../../../modules/decorators';

const styles = StyleSheet.create({
  artistContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconTouchable: {
    padding: 16,
    paddingBottom: 0,
  },
  backIcon: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  container: { flex: 1, paddingTop: Constants.statusBarHeight },
  artistImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  artistName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 4,
    marginBottom: 8,
  },
  itemContainerStyle: {
    borderBottomWidth: 0,
  },
  itemTitle: {
    color: 'white',
  },
  itemSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    height: 0.5,
    marginLeft: 54,
  },
});

const Separator = () => <Divider style={styles.divider} />;

export default compose(
  withConstants,
  withStoreProps(({ artists, tracks }, { navigation: { state: { params: { artistId } } } }) => ({
    artist: artists.list[artistId],
    topTracks: artists.topTracks[artistId],
    tracks,
  })),
  lifecycle({
    componentDidMount() {
      const { actions, artist } = this.props;
      this.props.actions.requestArtistTopTracks(artist.id);
    },
  }),
  withHandlers({
    renderItem: ({ actions, tracks }) => ({ item }) => {
      const track = tracks.list[item];
      const { album: { name: albumName, images }, name } = track;
      const albumImage = last(images);
      return (
        <ListItem
          component={TouchableOpacity}
          containerStyle={styles.itemContainerStyle}
          avatar={<Avatar source={albumImage && { uri: albumImage.url }} title={albumName[0]} />}
          onPress={() => actions.playTrack(track)}
          titleStyle={styles.itemTitle}
          subtitleStyle={styles.itemSubtitle}
          title={name}
          subtitle={albumName}
          chevronColor="rgba(255, 255, 255, 0.7)"
        />
      );
    },
  })
)(function Artist(props) {
  const { artist, topTracks, navigation, renderItem, tracks: { selectedTrack } } = props;
  return (
    <LinearGradient
      colors={['#F44336', '#E91E63']}
      start={[0.5, 0]}
      end={[0, 0.5]}
      style={[styles.container, selectedTrack && { paddingBottom: 54 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconTouchable}>
        <SimpleLineIcons name="arrow-left" color="white" size={24} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.artistContainer}>
        {artist.images.length > 0 &&
          <Image style={styles.artistImage} source={{ uri: artist.images[0].url }} />}
        <Text style={[styles.artistName, artist.images.length === 0 && { marginTop: 0 }]}>
          {artist.name}
        </Text>
      </View>
      {!topTracks
        ? <View style={styles.loading}>
            <ActivityIndicator color="white" size="large" />
          </View>
        : <FlatList
            ItemSeparatorComponent={Separator}
            keyExtractor={identity}
            data={topTracks}
            renderItem={renderItem}
          />}
    </LinearGradient>
  );
});
