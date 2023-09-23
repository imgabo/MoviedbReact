import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import  {RootStackParams} from '../navigator/Navigation';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from '../components/MovieDetails';


interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const screenHeight = Dimensions.get('screen').height;

const DetailScreen = ({route , navigation}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const {isloading, cast, movieFull} = useMovieDetails(movie.id);


  return (
    <ScrollView>
      <View style={style.imageCointainer}>
        <View style={style.imageBorder}>
          <Image source={{uri}} style={style.image} />
        </View>
      </View>
      <View style={style.marginContainer}>
        <Text style={style.subtitle}>{movie.original_title}</Text>
        <Text style={style.title}>{movie.title}</Text>
      </View>
      <View>
        {isloading ? (
          <ActivityIndicator color="grey" size={35} style={{marginTop: 30}} />
        ) : <MovieDetails movieFull={movieFull!} cast={ cast }/>}
      </View>
      <Icon 
      onPress={() => navigation.pop()}
      name='arrow-back-outline'
      color='white'
      
      size={60}
      style={{...style.backButton , top: 20}}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  imageCointainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.34,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  image: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton : {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5
  }
});

export default DetailScreen;
