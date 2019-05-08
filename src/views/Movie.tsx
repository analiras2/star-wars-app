import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import Background from '../components/Background';
import SWText from '../components/SWText';
import SWView from '../components/SWView';
import GlobalStorage from '../data/GlobalStorage';
import { KEYS } from '../data/keys';
import Movie from '../models/Movie';
import colors from '../res/colors';
import { moviePoster } from '../utils/pictures';

const NUM_COLUMNS = 2;

const styles = StyleSheet.create({
  container: {
    height: 264,
    width: (Dimensions.get('window').width - 40) / NUM_COLUMNS,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 6,
  },
  title: {
    width: 140,
    height: 52,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.secondary,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  poster: {
    height: 212,
    width: 140,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});

export default function character() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    new GlobalStorage(KEYS.MOVIES_KEY).getItems().then(data => {
      if (data) setMovies(JSON.parse(data));
    });
    // tslint:disable-next-line: align
  }, []);

  const renderListItem = (item: Movie) => {
    const poster = {
      uri: moviePoster[item.title],
    };

    return (
      <View style={styles.container}>
        <Image
          style={styles.poster}
          source={poster.uri ? poster : require('../res/img/movie.jpg')}
        />
        <View style={styles.title}>
          <SWText
            key={item.id}
            title={item.title}
            top={4}
            bold
            color={colors.primary}
            textAlign="center"
          />
        </View>
      </View>
    );
  };

  return (
    <Background>
      <SWView bottom={98}>
        <SWText title="Movies" big bold />
        <FlatList
          data={movies}
          numColumns={NUM_COLUMNS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderListItem(item)}
        />
      </SWView>
    </Background>
  );
}
