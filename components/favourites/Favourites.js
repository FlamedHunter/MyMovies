import { Text, StyleSheet, ScrollView, View, ImageBackground, Pressable} from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height


export default Favourites = ()=>{

    const navigation = useNavigation();

    const favmovies = useSelector(state => state.favourites.favmovies);

    const displayfavourites = favmovies.map(movie=>{
        return(
            <Pressable style = {favouritestyles.moviebox} onPress={()=>navigation.navigate("Movie",{movieId:movie.id})}>
                <ImageBackground source={{ uri:movie.img }}  style={{height:230, width:150,resizeMode: 'cover'}} />
            </Pressable>
        )
    })
    
    return(
        <>
            <View style = {favouritestyles.blackground}>
                <LinearGradient colors={['rgba(35,255,219,0.23)','rgba(248,33,163,0.2)']} 
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style = {favouritestyles.bgcolormiddle}
                />
            </View>
            
            <ScrollView style={favouritestyles.container}>
                <Text style = {favouritestyles.title}>All Favourite Movies</Text>
                <View style={favouritestyles.allcontainer}>
                    {displayfavourites}
                </View>
            </ScrollView>
        </>
    )
}



const favouritestyles = StyleSheet.create({
    blackground:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'black'
    },
    container:{
        position:'relative',
        flex:1,
        backgroundColor:'transparent',
        color:'white',
        zIndex:0,
        minHeight:windowHeight,
        zIndex:3,
    },
    bgcolormiddle:{
        position:'absolute',
        bottom:0,
        top:0,
        left:0,
        right:0,
        zIndex:1,
    },
    title:{
        marginLeft:20,
        fontSize:20,
        color:'white',
        marginBottom:10,
        zIndex:2,
        marginTop:20,
        zIndex:3,
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
    }
})