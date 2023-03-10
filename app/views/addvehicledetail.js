import React, {useState} from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
// import { useState } from "react";




const country= [
    { label1: 'India', value1: '1' },
    { label1: 'USA', value1: '2' },
    { label1: 'UK', value1: '3' },
    { label1: 'PK', value1: '4' },
    { label1: 'GK', value1: '5' },
    { label1: 'CK', value1: '6' },
  ]

  const model= [
    { label2: 'model1', value2: '1' },
    { label2: 'model2', value2: '2' },
    { label2: 'model3', value2: '3' },
    { label2: 'model4', value2: '4' },
    { label2: 'model5', value2: '5' },
    { label2: 'model6', value2: '6' },
  ]

const AddVehicalDetail =({navigation})=>{

    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    
        return(
            <View style={Style.container}> 
            <ScrollView>
            <Image style={Style.backgroundImage}
             source={require('../../asets/icons/travel-splash23.png')}/>

            <Text style={Style.firstname}>Company</Text>
            {/* <TextInput placeholder="Select Categoey" placeholderTextColor={"white"}  style={Style.input}/> */}
            <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
        data={country}
        search
        maxHeight={300}
        labelField="label1"
        valueField="value1"
        placeholder="Select Category "
        searchPlaceholder="Search..."
        value={value1}
        onChange={item => {
          setValue1(item.value);
        }}
      />

            <Text style={Style.firstname}>Model</Text>
            {/* <TextInput placeholder="Select Model" placeholderTextColor={"white"}  style={Style.input}/> */}

            <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
        data={model}
        search
        maxHeight={300}
        labelField="label2"
        valueField="value2"
        placeholder="Select Model "
        searchPlaceholder="Search..."
        value={value2}
        onChange={item => {
          setValue2(item.value);
        }}
      />

            {/* <Text style={Style.firstname}>Registration Number</Text>
            <TextInput placeholder="Enter Number" placeholderTextColor={"white"}  style={Style.input}/> */}

            <Text style={Style.firstname}>License Front Image</Text>
            


            <TouchableOpacity style={Style.fornext}
            onPress={()=>navigation.navigate("Add Bank")}>
            <Text style={Style.next}>NEXT</Text>
            </TouchableOpacity>
                
            </ScrollView>
            </View>
        )
    
}

const Style = StyleSheet.create({
    container:{
        backgroundColor:"black"
    },
    firstname:{
        marginHorizontal:25,
        fontSize:16,
        color:"white",
        marginTop:40,
      }, 
    input:{
        marginHorizontal:20,
        borderBottomWidth:2,
        borderBottomColor:"white",
        fontSize:20,
    },
    fornext:{
        backgroundColor:"red",
        marginHorizontal:30,
        marginTop:50,
        height:55,
        borderRadius:8,
        marginVertical:200,
    },
    next:{
        color:"white",
        fontSize:18,
        textAlign:"center",
        marginTop:15,
        fontWeight:"bold",
    },
    dropdown: {
        margin: 16,
        marginHorizontal:20,
        height: 50,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginTop:-4,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 20,
        color:"white",
      },
      selectedTextStyle: {
        fontSize: 20,
        color:"white",
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      backgroundImage:{
        position:"absolute",
        width:400,
        height:800,
      },
})

export default AddVehicalDetail