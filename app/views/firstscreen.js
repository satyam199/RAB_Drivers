import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FirstScreen =({navigation})=>{
    return(
        <View style={Style.container}>
            
            <Image 
            style={Style.backgroundImage}
            source={require('../../asets/icons/travel-splash23.png')}/>
            
            <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <Image 
                style={Style.image}
                source={require('../../asets/icons/RAB-logo1.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    container:{
    flex: 1,
    alignItems: 'center',
    },
    backgroundImage:{
        position:"absolute",
        width:400,
        height:800,
    },
    image:{
        marginTop:250,
        width:240,
        height:120,
    },
})

export default FirstScreen