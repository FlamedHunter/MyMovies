import React, {useEffect} from "react";
import { StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useDispatch } from "react-redux";
import { setscreen } from "../navbar/screenSlice";

export const VideoPlayer = ({route})=>{
    const dispatch = useDispatch()
    const {movieId,player} = route.params

    useEffect(()=>{
        dispatch(setscreen('VideoPlayer'))
        async function changeScreenOrientation() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
          }
        changeScreenOrientation()
        return () => {
            async function unlockScreenOrientation() {
              await ScreenOrientation.unlockAsync();
            }
            unlockScreenOrientation();
            dispatch(setscreen(''))
          };
    })

    return (
        <>
            <WebView
                source={{ uri: `https://embed.smashystream.com/playere.php?tmdb=${movieId}&player=${player}`}}
                resizeMode="cover"
                style={{ flex: 1,}}
                fullscreen={true}
                />
        </>
    )
}

const videoplayer = StyleSheet.create({
    backgroundVideo:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})