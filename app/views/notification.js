import React from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, StatusBar, ImageBackground} from 'react-native';
import externalstyle from '../styles/commonStyles';

const Notification = ({navigation}) => {
    return (
      <View style={externalstyle.container}>
        <ImageBackground 
            source={require('../../asets/icons/onbaord_bg.png')}>
        <ScrollView>
        <StatusBar hidden={true} />
          {/* <Image style={externalstyle.backgroundImage}
          source={require('../../asets/icons/travel-splash23.png')}/> */}
         {/* header start........ */}
         <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>navigation.navigate("BottomTab")}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                     <View style={externalstyle.headerText}>
                     <Text style={externalstyle.Headertitle}>Notification</Text>
                      </View>
                  </View>
                  {/* header end...... */}
        <Text style={Style.lorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>
        <Text style={Style.time}>5min ago</Text>
        <View style={Style.horizontal}></View>

        <Text style={Style.lorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>
        <Text style={Style.time}>5min ago</Text>
        <View style={Style.horizontal}></View>

        <Text style={Style.lorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>
        <Text style={Style.time}>5min ago</Text>
        <View style={Style.horizontal}></View>

        <Text style={Style.lorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>
        <Text style={Style.time}>5min ago</Text>
        <View style={Style.horizontall}></View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
  
  const Style = StyleSheet.create({
    lorem:{
      color:"white",
      fontSize:14,
      marginTop:40,
      marginHorizontal:20,
    },
    time:{
      color:"white",
      marginHorizontal:20,
      marginTop:10,
      fontFamily:'Roboto',
      opacity:0.6,
      fontSize:12,
    },
    horizontal:{
      borderBottomColor: 'white',
      borderBottomWidth: 0.5,
      marginTop:20,
      marginHorizontal:20,
    },
    // for last line....
    horizontall:{
      borderBottomColor: 'white',
      borderBottomWidth: 0.5,
      marginTop:20,
      marginHorizontal:20,
      marginVertical:200,
    },
    
  })
  export default Notification;