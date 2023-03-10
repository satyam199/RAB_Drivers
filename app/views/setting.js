import React, { useState,useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Alert, ImageBackground } from 'react-native';
// import Svg, {Path, Rect, G, Circle} from 'react-native-svg';
import externalstyle from '../styles/commonStyles';
import {setToken, readName, setData, readData, setValue, readValue, removeItemValue } from '../utilities/storage';


const SettingScren = ({ navigation }) => {

  const [whole, setWhole] = useState()

  useEffect(() => {
      readData('data').then(res=>{
        console.log(res,"yellowgreen");
        const res_data = JSON.parse(res);
        setWhole(res_data)
        })
    
     // this.timer = setInterval(async()=> await Offer(), 1000)
   },[]);


  createTwoButtonAlert = () => {
    // const {lang,navigation} = this.props;
    Alert.alert(
      "Logout",
      "Are you sure you want to logout.",
      [

        { text: "NO", onPress: () => { } },
        { text: 'YES', onPress: () => { navigation.navigate('Login'), removeItemValue('token') } }

      ]
    );
  }
 console.log(whole,"newDtasetting");
  return (
    <View style={externalstyle.container}>
      <ImageBackground
      style={{flex:1}}
      source={require('../../asets/icons/onbaord_bg.png')}>
      <ScrollView>
        <StatusBar hidden={true} />
       
        {/* header start........ */}
        <View style={externalstyle.headerSecond}>
          <View style={externalstyle.forProfile}>
          <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}>
              <View style={externalstyle.forProfileImage}>
                <Image style={externalstyle.image}
                  source={{uri: whole?.dataList?.image}} />
              </View>
              <Text style={externalstyle.name}>{whole?.dataList?.first_name} {whole?.dataList?.last_name}</Text>
            </TouchableOpacity>

          </View>
          <View style={externalstyle.forNotification}>
            <TouchableOpacity style={externalstyle.notification}
              onPress={() => navigation.navigate("Notification")}>
              <Image style={externalstyle.notificationImage}
                source={require('../../asets/icons/Group1427.png')} />
            </TouchableOpacity>
          </View>
        </View>
        {/* header end...... */}

        <Text style={Style.setting}>Settings</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("My Payment Method")}
          style={Style.payment}>
          {/* <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
         <Rect id="Rectangle_1259" data-name="Rectangle 1259" width="30" height="30" rx="5" fill="#282d3d"/>
         </Svg>

            <Svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" style={Style.bankImage} >
           <Path id="bank" d="M7,0l7,3.214V4.286h-.933a.533.533,0,0,1-.149.377.467.467,0,0,1-.354.159H1.437a.469.469,0,0,1-.354-.159.533.533,0,0,1-.15-.377H0V3.214ZM1.867,5.357H3.733v6.429h.933V5.357H6.533v6.429h.933V5.357H9.333v6.429h.933V5.357h1.867v6.429h.43a.469.469,0,0,1,.353.159.532.532,0,0,1,.149.377v.536H.933v-.536a.533.533,0,0,1,.149-.377.467.467,0,0,1,.354-.159h.43V5.357ZM13.5,13.393a.469.469,0,0,1,.354.159.532.532,0,0,1,.149.377V15H0V13.929a.533.533,0,0,1,.149-.377A.467.467,0,0,1,.5,13.393H13.5Z" fill="#fff"/>
          </Svg> */}

          <Image style={Style.paymentImage}
            source={require('../../asets/icons/Group1423.png')} />
          <Text style={Style.mypayment}>My Payment Method</Text>
          <Image style={Style.polygonImage}
            source={require('../../asets/icons/Polygon14.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={Style.payment}
          onPress={() => navigation.navigate("Change Password")}>
          <Image style={Style.paymentImage}
            source={require('../../asets/icons/Group1426.png')} />
          <Text style={Style.changepassword}>Change Password</Text>
          <Image style={Style.polygonImage}
            source={require('../../asets/icons/Polygon14.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={Style.payment}
          onPress={() => navigation.navigate("About Us")}>




          <Image style={Style.paymentImage}
            source={require('../../asets/icons/Group1424.png')} />
          <Text style={Style.changepassword}>About Us</Text>
          <Image style={Style.polygonImage}
            source={require('../../asets/icons/Polygon14.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={Style.payment}
          onPress={() => navigation.navigate("Contact Us")}>


          <Image style={Style.paymentImage}
            source={require('../../asets/icons/Group1425.png')} />
          <Text style={Style.changepassword}>Contact Us</Text>
          <Image style={Style.polygonImage}
            source={require('../../asets/icons/Polygon14.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={Style.forlogout}
          onPress={() => createTwoButtonAlert()}>
          <Text style={Style.logout}>LOGOUT</Text>
        </TouchableOpacity>

      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const Style = StyleSheet.create({
  setting: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  mypayment: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    marginLeft: 50,
    marginTop: -30,
  },
  payment: {
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingBottom: 25,
  },
  changepassword: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    marginLeft: 55,
    marginTop: -30,
  },
  forlogout: {
    backgroundColor: "#ee003d",
    marginHorizontal: 20,
    marginTop: 120,
    height: 50,
    borderRadius: 8,
    marginVertical: 100,
  },
  logout: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 13,
    fontWeight: "bold",
  },
  paymentImage: {
    width: 35,
    height: 35,
  },
  polygonImage: {
    width: 10,
    height: 14,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: -40,

  },
  bankImage: {
    marginTop: -22,
    marginLeft: 8,
  },
  aboutImage: {
    marginTop: -22,
    marginLeft: 13,
  },
  lockImage: {
    marginTop: -22,
    marginLeft: 10,
  }
})

export default SettingScren;