/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext,useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useMovies} from '../hooks/useMovies';
import MoviePoster from '../components/MoviePoster';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/HorizontalSlider';
import GradientBackground from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const {width: windowWidth} = Dimensions.get('screen');




const HomeScreen = () => {
  const {nowPlaying, topRated, popular, upComing,isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors}= useContext(GradientContext)

  const getPosterColors = async (index  : number) => {
    const movie = nowPlaying[index]
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary, secondary] = await getImageColors(uri);
    setMainColors({primary, secondary})
  }

  useEffect(() => { 
    if(nowPlaying.length > 0){
      getPosterColors(0)
    }
  }, [nowPlaying])

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  return (
    <GradientBackground children = {
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Carousel Principal */}
          <View
            style={{
              height: 440,
            }}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          {/* Peliculas populares */}
          <HorizontalSlider movies={popular} title='Populares' />
          <HorizontalSlider movies={topRated} title='Mejor Calificadas' />
          <HorizontalSlider movies={upComing} title='Por llegar' />
        </View>
      </ScrollView>
    }  
    />
  );
};

export default HomeScreen;
