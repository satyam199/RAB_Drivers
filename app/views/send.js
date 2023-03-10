import React from 'react';
import { Text, View,TouchableOpacity, StyleSheet, ScrollView, Image, StatusBar } from 'react-native';
import externalstyle from '../styles/commonStyles';


const SendRequest = ({navigation}) => {
  return (
    <View style={externalstyle.container}>
      <ScrollView>
      <StatusBar hidden={true} />
      {/* <Image style={externalstyle.backgroundImage}
          source={require('../../asets/icons/travel-splash23.png')}/> */}
          <ImageBackground 
            source={require('../../asets/icons/onbaord_bg.png')}>

          {/* header start........ */}
         <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>navigation.navigate("BottomTab")}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                  </View>
                  {/* header end...... */}
      <TouchableOpacity style={Style.forpreBooking}>
        <Text style={Style.preBooking}>Pre Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Style.foroutstation}>
        <Text style={Style.outstation}>Outstation</Text>
      </TouchableOpacity>
       
       <View style={Style.first}>
        <View style={Style.forRed}></View>

        <Text style={Style.fromAddress}>Mohali Phase 2, Punjab, 12372</Text>

        <View style={Style.forHorizontal}></View>

        <View style={Style.forGreen}></View>

        <Text style={Style.toAddress}>Shimla old Bus Stand, Himanchal, 45722</Text>

        <View style={Style.forVertical}></View>

        <View style={Style.forImage}>
        <Image style={Style.customerImage}
            source={require('../../asets/icons/Group12122x.jpg')}/>
        </View>
        <Text style={Style.customer}>Peter Parker</Text>
        <Text style={Style.customerName}>+91 9876543210</Text>

        <TouchableOpacity 
        onPress={()=>navigation.navigate("Map")}
        style={Style.forview}>
            <Text style={Style.view}>VIEW</Text>
        </TouchableOpacity>

       </View>

     {/*  For second profile..... */}

     <View style={Style.second}>
        <View style={Style.forRed}></View>

        <Text style={Style.fromAddress}>Mohali Phase 2, Punjab, 12372</Text>

        <View style={Style.forHorizontal}></View>

        <View style={Style.forGreen}></View>

        <Text style={Style.toAddress}>Shimla old Bus Stand, Himanchal, 45722</Text>

        <View style={Style.forVertical}></View>

        <View style={Style.forImage}>
        <Image style={Style.customerImage}
            source={require('../../asets/icons/Group12122x.jpg')}/>
        </View>
        <Text style={Style.customer}>Peter Parker</Text>
        <Text style={Style.customerName}>+91 9876543210</Text>

        <TouchableOpacity 
        onPress={()=>navigation.navigate("Map")}
        style={Style.forview}>
            <Text style={Style.view}>VIEW</Text>
        </TouchableOpacity>

       </View>
       </ImageBackground>
     </ScrollView>
    </View>
  );
}

const Style = StyleSheet.create({
  // container:{
  //   backgroundColor:"black",
  // },
  forpreBooking:{
    backgroundColor:"#ee003d",
    borderRadius:10,
    height:35,
    width:130,
    marginHorizontal:20,
    marginTop:30,
  },
  preBooking:{
    color:"white",
    textAlign:"center",
    fontSize:15,
    fontWeight:"bold",
    marginTop:6,
  },
  foroutstation:{
    backgroundColor:"white",
    borderRadius:10,
    height:35,
    width:130,
    marginLeft:160,
    marginTop:-35,
    marginVertical:50,
  },
  outstation:{
    color:"black",
    textAlign:"center",
    fontSize:15,
    fontWeight:"bold",
    marginTop:6,
  },
  first:{
    backgroundColor:"#2d2d2d",
    marginHorizontal:20,
    borderRadius:15,
    marginTop:-40,
  },
  forRed:{
    width:15,
    height:15,
    backgroundColor:"red",
    borderRadius:6,
    marginHorizontal:20,
    marginTop:20,
  },
  forGreen:{
    width:15,
    height:15,
    backgroundColor:"#00c443",
    // marginTop:30,
    borderRadius:6,
    marginHorizontal:20,
  },
  fromAddress:{
    color:"white",
    fontSize:14,
    marginLeft:50,
    marginTop:-20,
    marginHorizontal:10,
  },
  toAddress:{
    color:"white",
    fontSize:14,
    marginLeft:50,
    marginTop:-20,
    marginHorizontal:10,
  },
  forVertical:{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginHorizontal:20,
    marginTop:20,
  },
  forImage:{
    width:80,
    height:80,
    backgroundColor:"white",
    marginHorizontal:20,
    marginTop:20,
    borderRadius:6,
  },
  customer:{
    color:"white",
    fontSize:14,
    marginLeft:110,
    fontWeight:"bold",
    marginTop:-70,
  },
  customerName:{
    color:"white",
    fontSize:12,
    marginLeft:110,
  },
  second:{
    backgroundColor:"#2d2d2d",
    marginHorizontal:20,
    borderRadius:15,
    marginTop:20,
    marginVertical:100,
  },
  forsendsend:{
    width:80,
    height:40,
    backgroundColor:"#00c443",
    borderRadius:8,
    marginLeft:250,
    marginTop:-80,
    marginBottom:40,
  },
  send:{
    color:"white",
    fontWeight:"bold",
    textAlign:"center",
    fontSize:20,
    marginTop:5,
  },
  forview:{
    width:100,
    height:40,
    backgroundColor:"#00c443",
    borderRadius:8,
    marginTop:40,
    // marginHorizontal:130,
    // marginLeft:100,
    marginBottom:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  view:{
    color:"white",
    fontWeight:"bold",
    fontSize:14,
    textAlign:"center",
    // marginTop:10,
  },
  forHorizontal:{
    // borderRightWidth:1,
    // borderRightColor:"white", 
    borderLeftWidth:1,
    borderLeftColor:"white",
    height:30,
    // marginRight:293,
    marginTop:-2,
    marginLeft:26,
  },
  backgroundImage:{
    position:"absolute",
    width:400,
    height:1000,
  },
customerImage:{
  width:80,
  height:80,
  borderRadius:6,
}
})
export default SendRequest;
