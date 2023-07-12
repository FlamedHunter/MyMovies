import React from "react";
import { ImageBackground, View,Text,ScrollView,Dimensions,StyleSheet, Pressable } from "react-native";
import { useState,useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { addMovie, removeMovie, saveLikedMovies } from '../favourites/favouritesSlice';
import { Picker } from "@react-native-picker/picker";

const players = ['F','B','I','S','FM','L','FX','CC','C','E','V','D']

const windowWidth = Dimensions.get('window').width;

const StarRating = ({ rating }) => {
    
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  
    return (
      <View style={{ flexDirection: 'row', zIndex: 15}}>
        {Array(filledStars)
          .fill()
          .map((_, index) => (
            <FontAwesome key={index} name="star" size={16} color="gold" style = {{marginLeft:2,marginRight:2}}/>
          ))}

        {hasHalfStar && (
          <FontAwesome name="star-half-full" size={16} color="gold" style = {{marginLeft:2,marginRight:2}} />
        )}
  
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FontAwesome key={index} name="star-o" size={16} color="gold" style = {{marginLeft:2,marginRight:2}} />
          ))}
      </View>
    );
  };

export const MoviePlayer = ({ route })=>{
    const [selectedPlayer, setSelectedPlayer] = useState('F');
    const handlePlayerChange = (player) => {
        setSelectedPlayer(player);
    };
    const dispatch = useDispatch()
    const {movieId} = route.params;
    const [movie, setMovie] = useState(null);
    const [fav,setFav] = useState('white')
    const navigation = useNavigation();

    const favmovies = useSelector(state => state.favourites.favmovies);

    useEffect(() => {
        const isIdPresent = favmovies.find(movie => movie.id === movieId) !== undefined;
        if(isIdPresent){
            setFav('red')
        }

      const fetchMovie = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=c3e56830b46f646e155452cc49256e1c`
          );
          const data = await response.json();
          setMovie(data);
  
        } catch (error) {
          console.error(error);
        }
      };
          fetchMovie();
      }, [movieId]);
  
      if (!movie) {
          return (
          <View>
              <Text>Loading...</Text>
          </View>
          );
      }

        const name = movie.title
        const discription = movie.overview
        const img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        const date = movie.release_date.slice(0, 4)
        const time = movie.runtime
        const rating = movie.vote_average/2

        const favbuttonpress = ()=>{
            if(fav == 'white'){
              setFav('red')
              dispatch(addMovie(name,img,movieId))
              dispatch(saveLikedMovies())
            }
            else{
              setFav('white')
              dispatch(removeMovie(movieId))
              dispatch(saveLikedMovies())
            }
        }

    return(
        <>
            <View style = {movieplayerstyles.blackground}>
                <LinearGradient colors={['rgba(35,255,219,0.23)','rgba(248,33,163,0.2)']} 
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style = {movieplayerstyles.bgcolor}
                />
            </View>
            <ScrollView style = {movieplayerstyles.MoviePlayer}>

                <Pressable style={movieplayerstyles.likebutton} onPress={()=>favbuttonpress()}>
                    <FontAwesome name='heart' size={24} color={fav}/>
                </Pressable>

                <Pressable style={movieplayerstyles.backbutton} onPress={()=>navigation.goBack()}>
                    <FontAwesome name='arrow-left' size={18}/>
                </Pressable>

                <ImageBackground source={{uri: img }} style = {{width:windowWidth,height: 350,resizeMode:'contain'}}/>
                <Text style = {{color:"white", fontSize:24, marginLeft:10, marginTop: 10}}>{name}</Text>

                <View style = {{flexWrap:"wrap", flexDirection:'row',marginLeft:10,marginTop: 5, alignItems:'center'}}>
                    <Text style = {{color:"#BCBBB9", fontSize:16, }}>{date}</Text>
                    <View style ={{marginLeft:5}}><StarRating rating={rating} /></View>
                    <Text style = {{color:"#BCBBB9", fontSize:16,marginLeft:5}}>{time} min</Text>
                </View>

                <Text style = {{color:"white", fontSize:18, marginLeft:10, marginTop: 20,marginRight:10}}>{discription}</Text>

                <Pressable style = {movieplayerstyles.playnowbutton} onPress={()=>navigation.navigate("VideoPlayer",{movieId:movie.id,player:selectedPlayer})}>
                    <Text style = {{fontSize:17,marginRight:15}}>Watch Now</Text>
                    <FontAwesome name='play' size={17} color='black'/>
                </Pressable>


                {/* <View style ={movieplayerstyles.pickerbox}>

                    <View style = {movieplayerstyles.pickerheading}>
                        <Text style ={{fontSize:18}}>Select a Player</Text>
                    </View>
                    

                    

                </View> */}
                <View style={{marginLeft:30,marginRight:30,marginTop:10}}>
                    <Text style={{color:'white'}}>Note: On first tap on play button an ad will be loaded to chrome (Close it)</Text>
                </View>
                

            </ScrollView>
        </>
    )
}


const movieplayerstyles = StyleSheet.create({
    blackground:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'black'
    },
    bgcolor:{
        position:'absolute',
        bottom:0,
        top:0,
        left:0,
        right:0,
        zIndex:1,
    },
    MoviePlayer:{
        marginBottom:70,
    },
    playnowbutton:{
        width:windowWidth-40,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20,
        height:35,
        borderRadius:10,
        marginTop:30,
        flexDirection:'row'
    },
    backbutton:{
        position:'absolute',
        zIndex:4,
        left: 20,
        top:20,
        backgroundColor:'white',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        height:30,
        width:30
    },
    likebutton:{
        position:'absolute',
        zIndex:4,
        right: 20,
        top:20,
        background:'transparent',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        height:30,
        width:30
    },
    pickerbox:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flexWrap:'wrap'
    },
    pickerheading:{
        color:'black',
        fontSize:18,
        paddingRight:20,
        backgroundColor:'white',
        height:54.5,
        alignItems:'center',
        justifyContent:'center',
        width:200,
        textAlign:'center',
    },
    picker:{
        backgroundColor:'white',
        alignItems:'center',
        width:130,
        borderRadius:10,
        fontSize:20,
        marginBottom:50,
    }
})