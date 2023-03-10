import React, {useEffect,useState} from 'react';
import { Text, View,TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, StatusBar,FlatList } from 'react-native';
import CheckBox from 'react-native-checkbox';
import externalstyle from '../styles/commonStyles';
import { setToken, readName, setData, readData, setValue, readValue } from '../utilities/storage';
import CustomLoader from './customLoader';
import { useRoute } from "@react-navigation/native";


const Cancel = ({navigation}) => {
  const [newToken, setNewToken] = useState('')
  const [showLoader, setshowLoader] = useState(false)
  const [dataD, setDataD] = useState()
  const [id,setId] = useState()
  const [id2,setId2] = useState()
  const [other, setOther] = useState()
  const route = useRoute();


  useEffect(() => {
    readName('token').then(res => {
      const res_data = JSON.parse(res);
      setNewToken(res_data)
    }
    )
  }, [])

  useEffect(() => {
    cancelReasons()
  }, [newToken])


  const cancelReasons = () => {
    setshowLoader(true)
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + newToken?.token, },
    };
    try {
      const response = fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/cancelReasons', requestOptions)
        .then(response => response.text())
        .then(result => {
          const res_data = JSON.parse(result);
          console.log(res_data, "reasons")
          //console.log(parse_data, "hhh")
          setDataD(res_data.data)
          if(res_data.status == 200){
            setshowLoader(false)
          }
        })
        .catch(error => console.log('error', error));
      //    const data = response.json();          
    }
    catch (error) {
      console.error("Fetching api error: ", error);
    }
  }

  const cancelRequest = async (item) => {
    console.log(item, other, "....................");
    setshowLoader(true)
    var details = { 'id': 315, "cancel_reason_id" : id, 'other_reason': other, 'cancel_reason_id': id2 }
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Authorization': 'Bearer ' + newToken?.token, },
      body: formBody
    };
    console.log(requestOptions)
    // const postExample = async () => {
    try {
      const response = await fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/cancelRequest', requestOptions);
      const data = await response.json();
      //  const data= JSON.stringify(response);
      console.log(data, "logp");
      if (data.status == 200) {
        setshowLoader(true)
        navigation.navigate("BottomTab")
      }
    }
    catch (error) {
      console.error(error);
    }
  }
   

    const renderItemOneView = () => {
      //console.log(dataD,"LM");
      return (
        <ScrollView>
          <FlatList
            data={dataD}
            renderItem={({ item, index }) => viewOne(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      )
    }

  

    const viewOne = () => {
      //console.log(item,"oooo");
      
      <View style={{backgroundColor: 'red',width: '30%', height: '40%'}}>
        <Text Style={{color: 'white',fontSize: 24, backgroundColor:'blue'}}>'pppppp'</Text>
      </View>
      
    }
    

    return (
      <View style={externalstyle.container}>
        <ScrollView>
        <StatusBar hidden={true} />
          <ImageBackground 
            source={require('../../asets/icons/onbaord_bg.png')}>
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
                     <Text style={externalstyle.Headertitle}>Cancel</Text>
                      </View>
                  </View>
                  {/* header end...... */}
        <Text style={Style.areYouSure}>Are You Sure You Want to Cancel The Booking</Text>

        <CheckBox
             checkboxStyle={Style.checkbox}
             labelStyle={Style.check}
             label= "Hello test one"
             onChange={(checked) => setId(1)}
        />

        <CheckBox
             checkboxStyle={Style.checkbox}
             labelStyle={Style.check}
             label= "Hello test two"
             onChange={(checked) =>  setId2(2)}
        />
        
      <Text style={Style.firstname}>Other</Text>
      <TextInput placeholder="Enter Reason Here"
         placeholderTextColor={"white"}  
         style={Style.input}
         onChangeText={value => setOther(value)}
         />
      
     
      <TouchableOpacity 
      onPress={()=> cancelRequest()}
      style={Style.forSubmit}>
        <Text style={Style.submit}>SUBMIT</Text>
      </TouchableOpacity>
      </ImageBackground>
      </ScrollView>

      </View>
    );
  }
  
  const Style = StyleSheet.create({
    areYouSure:{
        color:"white",
        fontSize:18,
        textAlign:"center",
        marginHorizontal:20,
        marginTop:40,
    },
    check:{
        color:"white",
        marginTop:30,
        fontFamily:'Roboto',
        opacity:0.6,
        marginRight:50,
    },
    checkbox:{
      marginTop:30,
      borderRadius:5,
      borderColor:'white',
      marginLeft:20,
    },
    firstname:{
        marginHorizontal:25,
        fontSize:14,
        color:"white",
        marginTop:40,
        fontFamily:'Roboto',
        opacity:0.6,
      }, 
    input:{
        marginHorizontal:20,
        borderBottomWidth:1,
        borderBottomColor:"white",
        fontSize:15,
        color:"white",
    },
    forSubmit:{
        backgroundColor:"#ee003d",
        marginHorizontal:20,
        marginTop:40,
        height:50,
        borderRadius:8,
        marginVertical:160,
    },
    submit:{
        color:"white",
        fontSize:16,
        textAlign:"center",
        marginTop:13,
        fontWeight:"bold",
    },
    
  })
  
  export default Cancel;