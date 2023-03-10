import React, {useState, useEffect} from 'react';
import { Text, View, Image, Dimensions, ImageBackground, TouchableOpacity, StatusBar} from 'react-native';
import { useRoute } from "@react-navigation/native";
import {setToken,readName,setData,readData,setValue,readValue} from '../utilities/storage';
import { width } from 'react-native-dimension';
import externalstyle from '../styles/commonStyles';
import CustomLoader from './customLoader';


let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const ShowImage = ({navigation}) => {

  const [showLoader, setshowLoader] = useState(false)
  const[newToken, setNewToken] = useState('')
    const[parseData, setParseData] = useState('')


    useEffect(()=>{
      readName('token').then(res=>{
          const res_data= JSON.parse(res);
          // console.log("qwertyuiop ",res_data.token);
         setNewToken(res_data)
      //    newToken = res;
         })
   },[])

   console.log(parseData,"this is parse data data is data................")


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

  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'black',
      }}>
        <StatusBar hidden={true} />
        {/* header start........ */}
        <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                  </View>
            {/* header end...... */}
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height:deviceHeight, 
                width:deviceWidth,
            }}>
        <Image
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height:deviceHeight, 
            width:deviceWidth,
            marginHorizontal:20,
          }}
          
          source={{uri: parseData?.image}}
        >
        </Image>
        </View>
        <CustomLoader showLoader={showLoader}/>
    </View>
  )
}
export default ShowImage;