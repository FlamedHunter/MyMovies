import React,{useState,useEffect} from "react";
import { View } from "react-native";
import { Image } from "react-native";
import { Text, StyleSheet } from "react-native";


export const Casts = ({castId})=>{

    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
          try {
            const castResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${castId}/credits?api_key=c3e56830b46f646e155452cc49256e1c`
              );
            const castData = await castResponse.json();
            setCast(castData.cast.slice(0,4));
    
          } catch (error) {
            console.error(error);
          }
        };
            fetchMovie();
        }, [castId]);
    
        if (!cast || cast.length === 0) {
            return (
              <View>
                <Text>Loading...</Text>
              </View>
            );
          }
    if(cast.length == 0){
        return
    }

    const displayCast = cast.map(cst=>{
        return(
            <View style = {{marginTop:5,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri: `https://image.tmdb.org/t/p/w500${cst.profile_path}`}} style={{height:60,width:60,borderRadius:50,resizeMode:'contain',margin:5,zIndex:3,borderWidth: 2,borderColor: 'black'}}/>
                <View style = {castStyles.castname}>
                    <Text style={{color:'white'}} >{cst.name}</Text>
                </View>
            </View>
        )
    })

    return(
        <>
        <View style={{zIndex:2,paddingLeft:30,marginTop:10}}>
            <Text style={{color:'white',fontSize:24}}>Casts</Text>

            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                {displayCast}
            </View>
        </View>
        </>
    )
}


const castStyles = StyleSheet.create({
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
})