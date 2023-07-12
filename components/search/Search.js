import React, { useState, useEffect } from "react"
import { Text, StyleSheet, ScrollView, View, ImageBackground, Pressable} from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from "react-native";
import {Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Search = ()=>{
    const navigation = useNavigation();
    const [search,setSearch] = useState('Marvel')
    const [movies, setMovies] = useState([]);

    const searchMovies = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=c3e56830b46f646e155452cc49256e1c&query=${search}`
          );
          const data = await response.json();
          const sortedMovies = data.results.sort((a, b) => b.vote_average - a.vote_average);
          setMovies(sortedMovies);
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(()=>{
        const searchMovies = async () => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=c3e56830b46f646e155452cc49256e1c&query=${search}`
              );
              const data = await response.json();
              const sortedMovies = data.results.sort((a, b) => b.vote_average - a.vote_average);
              setMovies(sortedMovies);
            } catch (error) {
              console.error(error);
            }
          };
        searchMovies()
    }, [])

    if(movies.length == 0){
        return(
            <>
                <View style = {searchstyles.blackground}>
                <LinearGradient colors={['rgba(35,255,219,0.23)','rgba(248,33,163,0.2)']} 
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style = {searchstyles.bgcolormiddle}
                />
                </View>
                <Pressable style={searchstyles.searchIcon} onPress={()=>searchMovies(search)}>
                    <FontAwesome name='search' size={22} color={'white'}/>
                </Pressable>
                <TextInput value={search} onChangeText={text => setSearch(text)} onSubmitEditing ={()=>searchMovies(search)} style = {searchstyles.searchbox}/>
                <ScrollView style={searchstyles.search}>
                    <Text style = {{color:'white'}}>No Movies Found</Text>
                </ScrollView>
                
            </>
        )
    }
    
    
    const displaymovies = movies.filter(movie => movie.poster_path !== null)
    .map(movie=>{
        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        return(
            <Pressable style = {searchstyles.moviebox} onPress={()=>navigation.navigate("Movie",{movieId:movie.id})}>
                <ImageBackground source={{ uri:posterUrl }}  style={{height:230, width:150,resizeMode: 'cover'}} />
            </Pressable>
        )
    })
    

    return(
        <>
            <View style = {searchstyles.blackground}>
                <LinearGradient colors={['rgba(35,255,219,0.23)','rgba(248,33,163,0.2)']} 
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style = {searchstyles.bgcolormiddle}
                />
            </View>

            <Pressable style={searchstyles.searchIcon} onPress={()=>searchMovies(search)}>
                    <FontAwesome name='search' size={22} color={'white'}/>
            </Pressable>
            <TextInput value={search} onChangeText={text => setSearch(text)} onSubmitEditing ={()=>searchMovies(search)} style = {searchstyles.searchbox}/>
            <ScrollView style={searchstyles.search}>

               

                <View style = {searchstyles.allcontainer}>
                    {displaymovies}
                </View>
                
            </ScrollView>
        </>
    )
}


const searchstyles = StyleSheet.create({
    blackground:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
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
    search:{
        position:'relative',
        flex:1,
        backgroundColor:'transparent',
        color:'white',
        zIndex:0,
        zIndex:3,
        marginTop: 30,
        paddingBottom:50,
    },
    searchbox:{
        position:'relative',
        height:50,
        backgroundColor:'rgba(128,128,128,1)',
        marginLeft:20,
        marginRight:20,
        borderRadius:20,
        paddingLeft:20,
        fontSize:18,
        marginTop:60,
        color:'white'
    },
    moviebox:{
        height:230,
        width: 150,
        alignItems:'center',
        justifyContent:'center',
        zIndex:3,
        backgroundColor:'white',
        margin:20,
        borderRadius:10,
        zIndex:3,
    },
    allcontainer:{
        flex:1,
        flexDirection:"row",
        flexWrap:'wrap',
        zIndex:2,
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:50,
        zIndex:3,
    },
    searchIcon:{
        position:'absolute',
        zIndex:4,
        top: 68,
        right:30,
        background:'trasnparent',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        height:30,
        width:30
    }
})