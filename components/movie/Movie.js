import { LinearGradient } from 'expo-linear-gradient';
import React,{useState,useEffect} from "react";
import { ImageBackground,ScrollView  } from "react-native";
import { View} from "react-native";
import { Text, StyleSheet } from "react-native";
import {Dimensions} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Casts } from './Casts';
import { useDispatch,useSelector } from 'react-redux';
import { addMovie, removeMovie, saveLikedMovies } from '../favourites/favouritesSlice';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const StarRating = ({ rating }) => {
    
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  
    return (
      <View style={{ flexDirection: 'row', zIndex: 15}}>
        {Array(filledStars)
          .fill()
          .map((_, index) => (
            <FontAwesome key={index} name="star" size={20} color="gold" style = {{marginLeft:2,marginRight:2}}/>
          ))}

        {hasHalfStar && (
          <FontAwesome name="star-half-full" size={20} color="gold" style = {{marginLeft:2,marginRight:2}} />
        )}
  
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FontAwesome key={index} name="star-o" size={20} color="gold" style = {{marginLeft:2,marginRight:2}} />
          ))}
      </View>
    );
  };
  

export default Movie = ({ route })=>{
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const {movieId} = route.params;
    const [movie, setMovie] = useState(null);
    const [fav,setFav] = useState('white')

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
    const discription = movie.tagline
    const img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const date = movie.release_date.slice(0, 4)
    const genre = movie.genres
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

    const displaygenre = genre.map((genre)=>(
         <Text style = {{color:'white',zIndex:2,marginLeft:5,marginRight:5}}>{genre.name}</Text>
    ))

    return(
        <>
          <ScrollView style ={{flex:1,marginBottom:60,backgroundColor:'black'}}>

            <View style = {movieStyles.maincontainer}>
                <LinearGradient colors={['rgba(0,0,0,0)','#000000']} 
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.75 }}
                style = {movieStyles.bgcolormiddle}
                />

                <Pressable style={movieStyles.likebutton} onPress={()=>favbuttonpress()}>
                    <FontAwesome name='heart' size={24} color={fav}/>
                </Pressable>

                <Pressable style={movieStyles.playbutton} onPress={()=>navigation.navigate("MoviePlayer",{movieId:movie.id})}>
                    <FontAwesome name='play' size={24} color='white'/>
                </Pressable>

                <Pressable style={movieStyles.backbutton} onPress={()=>navigation.goBack()}>
                    <FontAwesome name='arrow-left' size={18}/>
                </Pressable>
                

                <ImageBackground source={{
                    uri: img,
                }}
                style = {{height:3.6*windowHeight/5,width:windowWidth,resizeMode: 'contain'}}>
                </ImageBackground>


                <View style = {movieStyles.overcontainer}>
                    <Text style = {{color:'white',fontSize:18,fontWeight:600,textAlign:'center'}}>{name}</Text>

                    <View style = {movieStyles.genreview}>
                        <Text style= {{color:'white',marginRight:5}}>{date}</Text>
                        <Text style= {{color:'white'}}>-</Text>
                        {displaygenre}
                        <Text style= {{color:'white'}}>-</Text>
                        <Text style= {{color:'white',marginLeft:5}}>{time} min</Text>
                    </View>

                    <View style={{marginTop:15,flexDirection:'row'}}>
                        <StarRating rating={rating} />
                    </View>

                    <Text style = {{color:'white', width:3.5*windowWidth/5,marginTop:15,textAlign:'center',fontSize:18,marginBottom:15}}>{discription}</Text>

                    <View style={movieStyles.divider} />
                </View>
                
                <Casts castId={movieId}/>
            </View>
          </ScrollView>
        </>
    )
}


const movieStyles = StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:'black'
    },
    bgcolormiddle:{
        position:'absolute',
        bottom:0,
        top:0,
        left:0,
        right:0,
        zIndex:1,
    },
    overcontainer:{
        marginTop:-180,
        alignItems:'center',
        zIndex:2,
    },
    genreview:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:15,
        flexWrap:'wrap',
        textAlign:'center',
        justifyContent:'center'
    },
    divider:{
        height: 1,
        backgroundColor: 'grey',
        width:4*windowWidth/5,
    },
    castname:{
        height:50,
        width:100,
        color:'white',
        backgroundColor:'grey',
        zIndex:2,
        marginLeft:-18,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius:20,
        paddingLeft:20,
        flexWrap:'wrap'
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
    playbutton:{
        position:'absolute',
        zIndex:4,
        right: 20,
        top:60,
        background:'transparent',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        height:30,
        width:30
    }
})