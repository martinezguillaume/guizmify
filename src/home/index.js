import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, RefreshControl, FlatList, LayoutAnimation, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { AppLoading, LinearGradient } from 'expo';
import { Provider } from 'react-redux';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';

import debounce from 'lodash/debounce';
import identity from 'lodash/identity';

import { withConstants, withStoreProps } from '../../modules/decorators';

export default compose(
  withConstants,
  withStoreProps(['artists', 'home']),
  withPropsOnChange(['actions'], ({ actions }) => ({
    requestArtists: debounce(actions.requestArtists, 400),
  })),
  withState('isFirstLaunch', 'setFirstLaunch', true),
  withHandlers({
    setFirstLaunch: ({ setFirstLaunch }) => isFirstLaunch => {
      LayoutAnimation.easeInEaseOut();
      setFirstLaunch(isFirstLaunch);
    },
  }),
  withHandlers({
    onChangeText: ({ actions, requestArtists, setFirstLaunch }) => query => {
      setFirstLaunch(false);
      actions.setSearch(query);
      requestArtists();
    },
    renderItem: ({ artists }) => ({ item }) => {
      const artist = artists.list[item];
      console.log('artist.images[1]', artist.images[1]);

      return (
        artist.images[1] &&
        <Image
          style={{ width: 150, height: 150, flex: 1, margin: 16 }}
          source={{ uri: artist.images[1].url }}
        />
      );
      return (
        <Text>
          {artist.name}
        </Text>
      );
    },
  })
)(function Home(props) {
  const { actions, artists, renderItem, onChangeText, home: { search }, isFirstLaunch } = props;
  return (
    <LinearGradient
      colors={['#3F51B5', '#2196F3']}
      start={[0.5, 0]}
      end={[0, 0.5]}
      style={styles.container}>
      <View style={[styles.searchContainer, isFirstLaunch && { flex: 1 }]}>
        {isFirstLaunch &&
          <Image source={require('../../assets/icons/app-icon.png')} style={styles.logo} />}
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          onChangeText={onChangeText}
          value={search}
          placeholder="Search your artist"
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.list}
          data={artists.search}
          renderItem={renderItem}
          keyExtractor={identity}
          refreshControl={
            <RefreshControl
                refreshing={artists.isLoading}
                onRefresh={actions.requestArtists}
                title="Pull to refresh"
                tintColor="white"
                titleColor="white"
             />}
        />
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    // fontFamily: 'light',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
