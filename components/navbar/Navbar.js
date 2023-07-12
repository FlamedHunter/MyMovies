import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";

export default Navbar = ()=>{

    const displayscreen = useSelector(state=>state.screen.displayscreen)

    const [active, setActive] = useState('Home')
    const navigation = useNavigation();
    const handleclick = (page)=>{
        setActive(page);
    }

    if(displayscreen === 'VideoPlayer'){
        return null;
    }
    
    return(
        <>
            <View style = {styles.navbar}>
                
                <LinearGradient
                    colors={['rgba(107,64,255,0.8)','rgba(143,111,255,0.8)','rgba(227,77,169,0.8)']} 
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style = {styles.bgcolormiddle}
                />

                <TouchableOpacity style={[styles.textbox, active === 'Home' && styles.activeItem]} 
                onPress={()=>{
                    handleclick('Home');
                    navigation.navigate("Home")
                }}
                >
                    <FontAwesome name="home" size = {24} style={[styles.icons, active === 'Home' && styles.activeItem]} />
                    <Text style={[styles.text, active === 'Home' && styles.activeItem]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.textbox} 
                onPress={()=>{
                    handleclick('Search');
                    // navigation.navigate("Movie",{title:'First Attempt'})
                    navigation.navigate("Search")
                }}
                >
                    <FontAwesome name="search" size = {24} style={[styles.icons, active === 'Search' && styles.activeItem]} />
                    <Text style={[styles.text, active === 'Search' && styles.activeItem]}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.textbox} onPress={()=>{handleclick('Favourites'); navigation.navigate("Favourites")}}>
                    <FontAwesome name="bookmark" size={24} style={[styles.icons, active === 'Favourites' && styles.activeItem]} />
                    <Text style={[styles.text, active === 'Favourites' && styles.activeItem]}>Favourites</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    navbar:{
        position:"absolute",
        flexDirection:'row',
        bottom:0,
        left: 0,
        right:0,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'rgba(255, 255, 255, 0.8)',
        height: 60,
        zIndex:10,
    },
    textbox:{
        flexWrap:'nowrap',
        alignItems:'center',
        justifyContent:'center',
        zIndex:11,
    },
    text:{
        fontSize:12,
        color:'grey'
    },
    icons:{
        color:'grey'
    },
    activeItem:{
        color:'white'
    },
    bgcolormiddle:{
        position:'absolute',
        bottom:0,
        top:0,
        left:0,
        right:0,
        zIndex:1,
    },
})