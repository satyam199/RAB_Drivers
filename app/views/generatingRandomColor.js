import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, } from "react-native";

const RandomColor =()=>{
    const [colors, setColors] = useState([])
    // console.log(colors)
    return(
        <View>
            <TouchableOpacity style={Style.button}
            onPress={()=>{
                setColors([...colors, Random()]);
            }}>
                <Text style={Style.changeColor}>Change Color</Text>
            </TouchableOpacity>
 
         <FlatList 
         keyExtractor={item => item}
         data={colors}
         renderItem={({item})=>{
            return(
                <View style={{width:50, height:50, marginTop:20, marginLeft:160, backgroundColor:item}} />
            );
         }}
         />  
        </View> 
    )
}
const Random =()=>{
    const red = Math.floor(Math.random()*100);
    const green = Math.floor(Math.random()*100);
    const blue = Math.floor(Math.random()*100);

    return `rgb(${red}, ${green}, ${blue})`;

}

const Style = StyleSheet.create({
    button:{
        backgroundColor:"blue",
        alignItems:"center",
        width:"50%",
        height:50,
        marginTop:20,
        marginLeft:100,
    },
    changeColor:{
        color:"white",
        textAlign:"center",
        fontSize:20,
        marginTop:12,
        fontWeight:"bold",
    }


})

export default RandomColor