import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Dimensions,Text,TouchableOpacity,Image } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {setToken,readName,setData,readData,setValue,readValue} from '../utilities/storage';
const GOOGLE_PLACES_API_KEY = ''; // never save your real api key in a snack!
var screenWidth = Dimensions.get('window').width;


const LocationMap = ({navigation,...props}) => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 });
  const [locationL, setlocationL] = useState('')
  const [locationLat, setLocationLat] = useState('')
  const [locationLng, setLocationLng] = useState('')
  
  const route = useRoute();
  const onPress = (data, details) => {
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
    setlocationL(data.description)
    setLocationLat(details.geometry.location.lat)
    setLocationLng(details.geometry.location.lng)
    //console.log(details,"data.description");
  };
 const onPressPinLocation=() => {
    //const {onPlaceChosen} = route.params
    console.log(locationL,locationLat,locationLng,"locationdata");
      // let dataLoc = locationL
      // setValue("loc", dataLoc).then(() => {
      //   readValue('loc').then(res => {
      //     console.log(res, "readValue");
      //   })
      // })
      // //let D = locationL
      // navigation.navigate('createprofile', {dataLoc})
     
    // if(locationL){
    //  navigation.pop()
    // }
    // const a = 56
    // const b = 98
    // const c = a+b

    // navigation.onPlaceChosen(
    //   // route.params.locationL,
    //   // details.formatted_address,
    //   // details.geometry
    //   locationL
    // );
   // navigation.goBack();
  }

  return (
    
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: regionCoords.lat,
          longitude: regionCoords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={{ latitude: marker.lat, longitude: marker.lng }} />
      </MapView>
      {/* {console.log(regionCoords,marker,"okokok")} */}
                   {/* <View style={{}}>
                    <TouchableOpacity onPress={() => {
                  navigation.goBack();
                }}>
                <Image 
                   style={{}}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                   */}
                <View style={{backgroundColor: 'black', height: '3%', width: '100%'}}>
                    <View style={[styles.forBackImage,{marginLeft:15}]}>
                   <TouchableOpacity 
                   onPress={()=>{
                    navigation.goBack() 
                   }}>
                  <Image 
                   style={styles.backImage}
                    source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                    </View>
                  </View>             
      <GooglePlacesAutocomplete
        styles={styles.searchbar}
        placeholder="Search"
        query={{
          key: 'AIzaSyCT-9m0cbqLGJtgKAIatvN8Z7AeWl7PB70',
          language: 'en', // language of the results
        }}
        GooglePlacesDetailsQuery={{
          fields: 'geometry',
        }}
        fetchDetails={true}
        onPress={onPress}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
       
      />
   
      <TouchableOpacity 
      style={{width: '90%',height:'6%',backgroundColor: 'red',marginBottom:50,borderRadius: 8}}
      onPress={()=>{
        let dataLoc = locationL
        console.log(dataLoc,"in map screen")
        navigation.navigate("Add Business Detail" ,{dataLoc,locationLat,locationLng,preFromData:props.route.params.preFormData})
        onPressPinLocation()
        //console.log(locationL,"hello data");
       
      }}
      >
        <Text style={{color: 'white',alignSelf:'center',fontWeight:'bold',fontSize:18,marginVertical:10}}>
          {'SAVE'}
        </Text>
      </TouchableOpacity>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  searchbar: {
    description: {
      fontWeight: 'bold',
      color: 'rgba(192,192,192,0.9)'
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      top: 30,
      width: screenWidth - 15,
      height: '15%',
      borderWidth: 0,
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
      borderWidth: 0,
    },
    listView: {
      backgroundColor: 'rgba(192,192,192,0.9)',
      top: 23,
    },
   header:{
   width:"100%",
   height:50,
   backgroundColor:"black",
  // borderBottomColor:"ghostwhite",
  // borderBottomWidth:0.5,
   },
backImage:{
  width:20,
  height:20,
  marginTop:10,
  marginLeft:20,
},
forBackImage:{
width:80,
height:50,
// backgroundColor:"white",
},
  //  header:{
  //     width:"100%",
  //     height:20,
  //     borderBottomColor:"ghostwhite",
  //     borderBottomWidth:0.5,
  // },
  // forBackImage:{
  //     width:80,
  //     height:70,
  // },
  // backImage:{
  //    // width:20,
  //    // height:20,
  //   //  marginTop:30,
  //     //marginLeft:20,
  // },
  },
});

export default LocationMap;
