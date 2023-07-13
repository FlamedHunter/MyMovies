import React from "react";
import { StyleSheet, Text, ScrollView, Pressable, ImageBackground,Switch,View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions} from 'react-native';
import { fetchTopMovies,fetchLatestMovies,fetchPopularMovies,fetchUpcomingMovies } from '../api/HomeMovies'
import { useState,useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default Home = ()=>{
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const type = useSelector(state=>state.type.selecttype)
    const [topMovies, setTopMovies] = useState([]);
    const [nowplaying, setNowPlaying] = useState([]);
    const [popular,setPopular] = useState([]);
    const [upcomingmovies,setUpcomingMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await fetchTopMovies();
            const movies2 = await fetchLatestMovies();
            const movies3 = await fetchPopularMovies();
            const movies4 = await fetchUpcomingMovies();
            setUpcomingMovies(movies4)
            setPopular(movies3)
            setNowPlaying(movies2);
            setTopMovies(movies);
        };
        fetchMovies();

    }, []);


    const displaymovies = (movieslist)=>{
        const dm = movieslist.map(movie=>{
            const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return(
                <Pressable style={homestyles.moviebox} onPress={()=>{navigation.navigate("Movie",{movieId:movie.id})}}>
                    <ImageBackground source={{uri: posterUrl}}  style={{height:201, width:140, resizeMode:'cover'}} />
                </Pressable>
            )
        })
        return(dm)
    }
    return(
        <>
            <ScrollView style = {homestyles.home}>
                <LinearGradient colors={['rgba(35,255,219,0.2)','rgba(248,33,163,0.2)']} 
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style = {homestyles.bgcolormiddle}
                />

                <Text style = {homestyles.homeheading}>What would you like to watch?</Text>

                <View style={homestyles.togglebox}>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        // onValueChange={toggleSwitch}
                        // value={isEnabled}
                    />
                </View>

                <Text style = {homestyles.categoriestext}>Top Movies</Text>
                <ScrollView horizontal style = {{marginLeft:5, zIndex:2, marginBottom:30}}  showsHorizontalScrollIndicator={false}>
                    {displaymovies(topMovies)}
                </ScrollView>
                
                <Text style = {homestyles.categoriestext}>Now Playing</Text>
                <ScrollView horizontal style = {{marginLeft:5, zIndex:2, marginBottom:30}}  showsHorizontalScrollIndicator={false}>
                    {displaymovies(nowplaying)}
                </ScrollView>

                <Text style = {homestyles.categoriestext}>Popular</Text>
                <ScrollView horizontal style = {{marginLeft:5, zIndex:2, marginBottom:30}}  showsHorizontalScrollIndicator={false}>
                    {displaymovies(popular)}
                </ScrollView>

                <Text style = {homestyles.categoriestext}>Upcoming Movies</Text>
                <ScrollView horizontal style = {{marginLeft:5, zIndex:2, marginBottom:30}}  showsHorizontalScrollIndicator={false}>
                    {displaymovies(upcomingmovies)}
                </ScrollView>
            </ScrollView>
        </>
    )
}

const homestyles = StyleSheet.create({
    home:{
        position:'relative',
        flex:1,
        backgroundColor:'black',
        zIndex:0,
        color:'white',
        zIndex:0,
        marginBottom:50,
    },
    bgcolorstart:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:1,
    },
    bgcolormiddle:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:1,
    },
    homeheading:{
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:50,
        paddingRight:50,
        marginTop:50,
        marginBottom:40,
        fontSize:32,
        color:'white',
        textAlign:'center',
        zIndex:2
    },
    homesearchbar:{
        height:40,
        marginLeft:20,
        marginRight:20,
        backgroundColor:"grey",
        borderRadius:20,
    },
    categoriestext:{
        marginLeft:20,
        fontSize:20,
        color:'white',
        marginBottom:10,
        zIndex:2,
        
    },
    moviebox:{
        height: 200,
        width:140,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        marginLeft:10,
        marginRight:10,
        zIndex:3,
    },
    togglebox:{
        position:'absolute',
        alignItems:'center',
        justifyContent:'center'
    }
})