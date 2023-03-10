import React,{useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar, ImageBackground} from 'react-native';
import externalstyle from '../styles/commonStyles';
import { useRoute } from "@react-navigation/native";
import moment from 'moment';
import {mobile, date, drivingAreaRadius, location, licenseNumber} from './createprofile';
import {setToken,readName,setData,readData,setValue,readValue} from '../utilities/storage';
import CustomLoader from './customLoader';

  
const Profile = ({navigation}) => {
    
    const[newToken, setNewToken] = useState('')
    const [showLoader, setshowLoader] = useState(false)
    const[parseData, setParseData] = useState('')


    useEffect(()=>{
        readName('token').then(res=>{
            const res_data= JSON.parse(res);
            // console.log("qwertyuiop ",res_data.token);
           setNewToken(res_data)
        //    newToken = res;
           })
     },[])
     
     console.log(parseData,"this is parse data................")
     useEffect(()=>{ 
        setshowLoader(true)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + newToken.token, },
          };     
            try {
               const response = fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/get_profile', requestOptions)
               .then(response => response.text())
                .then(result => {
                    const res_data= JSON.parse(result);
                   const parse_data = res_data.data;
                   // console.log(parse_data.dob,"heloo")
                    console.log(parse_data, "hhh")
                    setParseData(parse_data)
                    if(res_data.status == 200){
                        setshowLoader(false)
                      }
                })
                .catch(error => console.log('error', error));
            //    const data = response.json();          
            }
            catch (error) {
                console.error("Fetching profile api error: ",error);                        
            }      
     },[newToken])

    const route= useRoute()
    // console.log(parseData?.image, "this is an image...........................")
   
    
    return (       
      <View style={externalstyle.container}>
        <ImageBackground source={require('../../asets/icons/onbaord_bg.png')}>
        <ScrollView>
        <StatusBar hidden={true} />
        {/* <Image style={externalstyle.backgroundImage}
          source={require('../../asets/icons/travel-splash23.png')}/> */}
           {/* header start........ */}
           <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                     <View style={externalstyle.headerText}>
                     <Text style={externalstyle.Headertitle}>Profile</Text>
                      </View>
            </View>
            {/* header end...... */}
    <View style={{marginVertical: 20}}>
        <View style={Style.image}>
            <TouchableOpacity onPress={()=>navigation.navigate('Show Image')}>
            <Image style={Style.userimage}
            source={{uri: parseData?.image}}/>
            </TouchableOpacity>
        </View>
        <Text style={Style.name}>{parseData?.first_name} {parseData?.last_name}</Text>
        <Text style={Style.mail}>{parseData?.email}</Text>
        <Text style={Style.address}>{parseData?.city}{","} {parseData?.country}</Text>
        
        </View>
        <View style={Style.horizontal}></View>

        <Text style={Style.information}>Information</Text>
        <Text style={Style.fordob}>DOB</Text>
        <Text style={Style.dob}>{moment(parseData?.dob).format('LL')}</Text>

        <Text style={Style.fordob}>Contect No</Text>
        <Text style={Style.dob}>{parseData?.mobile_no}</Text>

        <Text style={Style.fordob}>Driving Location</Text>
        <Text style={Style.dob}>{parseData?.taxi_driver_business_detail?.location}</Text>

        <Text style={Style.fordob}>Driving Radius</Text>
        <Text style={Style.dob}>{parseData?.taxi_driver_business_detail?.driving_area_radius}</Text>

        <Text style={Style.fordob}>Driving Licence ID</Text>
        <Text style={Style.dob}>{parseData?.taxi_driver_business_detail?.license_no}</Text>

        <Text style={Style.fordob}>Licence Expiry Date</Text>
        <Text style={Style.dob}>{moment(parseData?.taxi_driver_business_detail?.license_expiry_date).format('LL')}</Text>

        <Text style={Style.fordob}>Car Brand</Text>
        <Text style={Style.dob}>{parseData?.taxi_driver_business_detail?.brand?.name}</Text>

        <Text style={Style.fordob}>Car Model</Text>
        <Text style={Style.dob}>{parseData?.taxi_driver_business_detail?.model?.name}</Text>


        <View style={Style.horizontal}></View>

        <Text style={Style.uploadedDocument}>Uploaded Documents</Text>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Licence Full Image')}>
        <Image style={Style.documentsImage}
            source={{ uri: parseData?.taxi_driver_business_detail?.license_fornt_image}}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Licence Full Image')}>
        <Image style={Style.documentsImageSecond}
            source={{ uri: parseData?.taxi_driver_business_detail?.license_back_image}}/>
        </TouchableOpacity>
        </View>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("For Create Profile")}
        style={externalstyle.button}>
            <Text style={externalstyle.buttonText}>EDIT PROFILE</Text>
        </TouchableOpacity>
        </ScrollView>
        <CustomLoader showLoader={showLoader}/>
        </ImageBackground>
      </View>
    );
  }
  
  const Style = StyleSheet.create({
    // container:{
    //   backgroundColor:"black",
    // },
    image:{
        width:90,
        height:90,
        backgroundColor:"lightgray",
        marginTop:10,
        marginHorizontal:20,
        borderRadius: 8,
    },
    name:{
        color:"white",
        fontSize:18,
        //fontWeight:"bold",
        marginLeft:125,
        marginTop:-90,  
    },
    address:{
        color:"white",
        marginLeft:125,
        fontFamily:'Roboto',
        opacity:0.6,
        fontSize:13,
        marginTop: 3.5
    },
    mail:{
        color:"white",
        marginLeft:125,
        fontFamily:'Roboto',
        opacity:0.6,
        fontSize:13,
        marginTop: 3.5
    },
    horizontal:{
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        marginTop:20,
        marginHorizontal:20,
    },
    information:{
        marginTop:30,
        marginHorizontal:20,
        color:"white",
        fontSize:16,
    },
    fordob:{
        marginTop:20,
        marginHorizontal:20,
        color:"white",
        fontSize:14,
        fontFamily:'Roboto',
        opacity:0.6,
    },
    dob:{
        color:"white",
        fontSize:14,
        marginLeft:240,
        marginTop:-20,
        // fontWeight:"bold",
    },
    uploadedDocument:{
        marginTop:20,
        marginHorizontal:20,
        color:"white",
        fontSize:16,
        marginVertical:10,
    },
    userimage:{
        width:90,
        height:90,
        borderRadius: 8,
    },
    documentsImage:{
        width:150,
        height:100,
        marginHorizontal:20,
    },
    documentsImageSecond:{
        width:150,
        height:100,
        // marginHorizontal:20,
    },
  })
  
  export default Profile;