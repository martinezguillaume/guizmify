import React from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  Text,
  Image,
  RefreshControl,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import { Input } from 'react-native-elements'
import { AppLoading, LinearGradient, Constants } from 'expo'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'

import debounce from 'lodash/debounce'
import identity from 'lodash/identity'
import forEach from 'lodash/forEach'

import { withConstants, withStoreProps } from '../../modules/decorators'

const ARTIST_IMAGE_WIDTH = 150

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
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
    paddingLeft: 4,
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
  },
  artisteImage: {
    width: ARTIST_IMAGE_WIDTH,
    height: ARTIST_IMAGE_WIDTH,
  },
  artisteImageBackground: {
    width: 150,
    height: 150,
    margin: 16,
    borderRadius: 4,
  },
  artistContainer: {
    flex: 1,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  artistName: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  noArtistImage: {
    backgroundColor: '#E0E0E0',
  },
  listEmptyComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  listEmptyEmoji: {
    fontSize: 90,
    backgroundColor: 'transparent',
  },
  listEmptyText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

const getArtistImage = artist => {
  const { images } = artist
  let res = null
  forEach(
    images,
    image => (image.width < ARTIST_IMAGE_WIDTH ? null : (res = image.url)),
  )
  return res
}

export default compose(
  withConstants,
  withStoreProps(['artists', 'home']),
  withPropsOnChange(['actions'], ({ actions }) => ({
    requestArtists: debounce(actions.requestArtists, 400),
  })),
  withState('isFirstLaunch', 'setFirstLaunch', true),
  withHandlers({
    setFirstLaunch: ({ setFirstLaunch }) => isFirstLaunch => {
      LayoutAnimation.easeInEaseOut()
      setFirstLaunch(isFirstLaunch)
    },
    ListEmptyComponent: ({ artists, home }) => () =>
      !artists.isLoading &&
      artists.isValid &&
      <View style={styles.listEmptyComponent}>
        <Text style={styles.listEmptyEmoji}>
          {home.search === '' ? '😚' : '😭'}
        </Text>
        <Text style={styles.listEmptyText}>
          {home.search === ''
            ? 'Cherche un artiste !'
            : 'Aucun artiste trouvé !'}
        </Text>
      </View>,
  }),
  withHandlers({
    onChangeText: ({ actions, requestArtists, setFirstLaunch }) => query => {
      if (query === '') {
        requestArtists.cancel()
        actions.clearArtists()
        actions.setSearch(query)
        return
      }
      setFirstLaunch(false)
      actions.setSearch(query)
      requestArtists()
    },
    renderItem: ({ artists, navigation }) => ({ item }) => {
      const artist = artists.list[item]
      const image = getArtistImage(artist)
      const ArtistName = (
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.87)']}
          style={styles.artistContainer}
        >
          <Text style={styles.artistName}>
            {artist.name}
          </Text>
        </LinearGradient>
      )
      const ArtistImage = !image
        ? <View style={[styles.artisteImageBackground, styles.noArtistImage]}>
            <View flex={3} />
            {ArtistName}
          </View>
        : <Image style={styles.artisteImageBackground} source={{ uri: image }}>
            <View flex={3} />
            {ArtistName}
          </Image>
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Artist', { artistId: item })}
          flex={1}
          width={150}
          height={150}
        >
          {ArtistImage}
        </TouchableOpacity>
      )
    },
    ListFooterComponent: ({ artists }) => () =>
      artists.next &&
      <ActivityIndicator style={{ marginBottom: 8 }} color="white" />,
  }),
)(function Home(props) {
  const {
    actions,
    artists,
    renderItem,
    onChangeText,
    home: { search },
    isFirstLaunch,
    ListEmptyComponent,
    ListFooterComponent,
  } = props
  return (
    <LinearGradient
      colors={['#3F51B5', '#673AB7']}
      start={[0.5, 0]}
      end={[0, 0.5]}
      style={styles.container}
    >
      <View style={[styles.searchContainer, isFirstLaunch && { flex: 1 }]}>
        {isFirstLaunch &&
          <Image
            source={require('../../assets/icons/app-icon.png')}
            style={styles.logo}
          />}
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          onChangeText={onChangeText}
          value={search}
          icon={
            <SimpleLineIcons
              name="magnifier"
              color="white"
              style={{ backgroundColor: 'transparent' }}
              size={20}
            />
          }
          placeholder="Search your artist"
          placeholderTextColor="rgba(255, 255, 255, 0.54)"
          selectionColor="white"
        />
      </View>
      <View style={styles.listContainer}>
        {!isFirstLaunch &&
          <FlatList
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={styles.list}
            data={artists.search}
            renderItem={renderItem}
            keyExtractor={identity}
            numColumns={2}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTap="handled"
            onEndReached={actions.requestMoreArtists}
            ListFooterComponent={ListFooterComponent}
            refreshControl={
              <RefreshControl
                refreshing={artists.isLoading}
                onRefresh={actions.requestArtists}
                title="Tire pour rafraichir"
                tintColor="white"
                titleColor="white"
              />
            }
          />}
      </View>
    </LinearGradient>
  )
})
