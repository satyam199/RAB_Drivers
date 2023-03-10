import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, StatusBar, FlatList,BackHandler, Alert, Button, ImageBackground} from 'react-native';
import externalstyle from '../styles/commonStyles';
import { setToken, readName, setData, readData, setValue, readValue } from '../utilities/storage';
import CustomLoader from './customLoader';
import { useRoute } from "@react-navigation/native";
import moment from 'moment';
import locationPermission from '../Helper/helper'


const HomeScreen = ({ navigation}) => {

  const [price, setPrice] = useState('')
  const [errorPrice, setErrorPrice] = useState('')
  const [newToken, setNewToken] = useState('')
  const [dataD, setDataD] = useState('')
  const [showLoader, setshowLoader] = useState(false)
  const [type, setType] = useState("prebooking")
  const [buttonColor, setButtonColor] = useState('white')
  const [buttonColorOne, setButtonColorOne] = useState('white')
  const [whole, setWhole] = useState()
  const [timer, setTimer] = useState(null)
  const [counter, setCounter] = useState(0)

  //const route = useRoute();

  useEffect(() => {
    getCurrentLocation()
    readName('token').then(res => {
      const res_data = JSON.parse(res);
      setNewToken(res_data)
    })
    readData('data').then(res=>{
      console.log(res,"yellow");
      const res_data = JSON.parse(res);
      setWhole(res_data)
      })

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
   
  },[])


  useEffect(() => {
    Offer()
    let timer = setInterval(NewOffer, 50000);
    setTimer(timer)
    const unsubscribe = navigation.addListener('focus', () => {
      Offer()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    //Offer()
  },[newToken])

  useEffect(() => {
    return () => {
      clearInterval(timer);
    }
}, [])

  const getCurrentLocation = async()=>{
    console.log('inArray');
    const locPermissionDenied = await locationPermission()
    console.log('location permission',locPermissionDenied);
  }

  const Offer = () => {
   // setshowLoader(true)
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + newToken?.token,},
    };
    try {
      const response = fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/getNotifyRequest', requestOptions)
        .then(response => response.text())
        .then(result => {
          const res_data = JSON.parse(result);
          console.log(res_data, "FUNG")
          //console.log(parse_data, "hhh")
          setDataD(res_data.data)
          if(res_data.status == 200){
            //setshowLoader(false)
            
          }
        })
        .catch(error => console.log('error', error));
      //    const data = response.json();          
    }
    catch (error) {
      console.error("Fetching api error: ", error);
    }
  }

  const NewOffer = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + newToken?.token,},
    };
    try {
      const response = fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/getNotifyRequest', requestOptions)
        .then(response => response.text())
        .then(result => {
          const res_data = JSON.parse(result);
          console.log(res_data, "FUNG")
          //console.log(parse_data, "hhh")
          setDataD(res_data.data)
          if(res_data.status == 200){
            
          }
        })
        .catch(error => console.log('error', error));
      //    const data = response.json();          
    }
    catch (error) {
      console.error("Fetching api error: ", error);
    }
  }


  const handlePriceChange = (e, val) => {

    setErrorPrice('');
    setPrice(e.nativeEvent.text);
    console.log(price, "l");
  }

  const Submit = (e) => {
    e.preventDefault();

    if (price != '') {
      navigation.navigate("Send")
    }
    else {
      setErrorPrice('please enter price')
    }

  }

  const sentOffer = async (item) => {
    console.log(item, price, "....................");
    setshowLoader(true)
    var details = { 'id': parseInt(item?.id), 'price': parseInt(price) }
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
      const response = await fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/sentOffer', requestOptions);
      const data = await response.json();
      //  const data= JSON.stringify(response);
      console.log(data, "log");
      if (data.status == 200) {
        setshowLoader(false)
        Offer()
      }

    }
    catch (error) {
      console.error(error);
      setshowLoader(false)
    }
  }

  const cancelRequest = async (item) => {
    console.log(item, price, "....................");
    setshowLoader(true)
    var details = { 'id': parseInt(item?.user_id) }
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
      console.log(data, "log2");
      if (data.status == 200) {
        setshowLoader(true)
        Offer()
      }
    }
    catch (error) {
      console.error(error);
      setshowLoader(false)
    }
  }

  const filteredData = dataD
      ? dataD.filter(x =>
          x.type.includes(type)         
        )
      : dataD;

  const renderItemOneView = () => {
    //const {dataD} = this.state
   // console.log(dataD.length,'<><><>');
    return (
      <>
      {filteredData?.length != 0 ?  
       <ScrollView>
        <FlatList
          data={filteredData}
          renderItem={({ item, index }) => viewOneFlatList(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
        </ScrollView> 
      : filteredData?.length == 0 ?
      <View style={{alignItems: 'center',marginVertical: '40%'}}>
         <Image
           resizeMode='contain'
           style={{width:60, height:60}}
           source={require('../../asets/icons/ic_empty.png')}
         />
         <Text style={{ color: 'white', textAlign: 'center',alignSelf: 'center',justifyContent: 'center',alignItems: 'center',textAlignVertical: 'center',
         fontSize: 18,alignContent: 'center',marginHorizontal:20,fontWeight: 'bold' }}>{"Oh No!"}</Text>
         <Text style={{ color: 'gray', textAlign: 'center',
         alignSelf: 'center',
         justifyContent: 'center',
         alignItems: 'center',
         textAlignVertical: 'center',
         fontSize: 14,
         alignContent: 'center',marginHorizontal:20, marginTop: 5}}>{"No Request Yet!"}</Text>
       </View>:<></>
      }
     </> 
    )
  }


  const viewOneFlatList = (item, index) => {
    //const {dataD} = this.state
   console.log(moment(item.start_date_time).format('HH:MM'), "hhh");

  

    return (

      <View style={[Style.first, { borderRadius: 12, marginTop: 10 }]}>
        <View style={Style.forRed}></View>

        <Text style={Style.fromAddress}>{item?.pickup_location}</Text>

        <View style={Style.forHorizontal}></View>

        <View style={Style.forGreen}></View>

        <Text style={Style.toAddress}>{item?.drop_location}</Text>

        <View style={Style.forVertical}></View>
        <View style={Style.forImage}>
          <Image style={Style.customerImage}
            //source={require('../../asets/icons/Group12122x.jpg')}
            source={{ uri: item?.user?.image }}
          />
        </View>
        <Text style={[Style.customer, { fontSize: 16 }]}>Customer Name</Text>
        <Text style={[Style.customerName, { fontSize: 16, marginTop: 5 }]}>{item?.user?.first_name} {item?.user?.last_name}</Text>
        <View style={Style.forPriceAndSend}>
          <View style={Style.forPrice}>
            <Text style={Style.firstname}>Price</Text>
            <TextInput
              keyboardType='numeric' placeholder="Enter Your Price" placeholderTextColor={"white"} placeholderStyle={{ fontSize: 8 }} style={externalstyle.input}
              onChangeText={value => setPrice(value)}
            />
            <Text style={externalstyle.textValidation}>{errorPrice}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <View style={[Style.forSend,{alignSelf:'center',marginHorizontal: 25}]}>
              <TouchableOpacity
                // onPress={()=>navigation.navigate("Send")}
                onPress={() => { cancelRequest(item) }}
                style={[Style.forsendsend, { marginTop: 0, backgroundColor: 'red', marginBottom:10}]}>
                <Text style={Style.send}>CANCEL</Text>
              </TouchableOpacity>
            </View>
            <View style={Style.forSend}>
              <TouchableOpacity
                // onPress={()=>navigation.navigate("Send")}
                onPress={() => { sentOffer(item) }}
                style={[Style.forsendsend, { marginTop: 0}]}>
                <Text style={Style.send}>SEND</Text>
              </TouchableOpacity>
            </View>

          </View>
      </View>
    )
  }
  onButtonPress = () => {
    type == "prebooking" ? 
    setButtonColor('red') : type == "outstation" ? setButtonColor('white') : null
  }

  onButtonPressOne = () => {
    type == "outstation" ? 
    setButtonColorOne('red') : type == "prebooking" ? setButtonColorOne('white') : null
  }
  console.log(whole?.dataList?.first_name,"name");
  
  return (
    <View style={externalstyle.container}>
      <ImageBackground
      style={{flex:1}}
      source={require('../../asets/icons/onbaord_bg.png')}>
      <ScrollView>
        <StatusBar hidden={true} />
        {/* <Image style={[externalstyle.backgroundImage, {  }]}
          source={require('../../asets/icons/travel-splash23.png')} /> */}
        {/* header start........ */}
        <View style={externalstyle.headerSecond}>
          <View style={[externalstyle.forProfile,{}]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}>
              <View style={externalstyle.forProfileImage}>
                <Image style={externalstyle.image}
                  source={{uri: whole?.dataList?.image}} />
              </View>
              <Text style={externalstyle.name}>{whole?.dataList?.first_name} {whole?.dataList?.last_name}</Text>
            </TouchableOpacity>

          </View>
          {/* <View style={externalstyle.forNotification}>
            <TouchableOpacity style={externalstyle.notification}
              onPress={() => navigation.navigate("Notification")}>
              <Image style={externalstyle.notificationImage}
                source={require('../../asets/icons/Group1427.png')} />
            </TouchableOpacity>
          </View> */}
        </View>
        {/* header end...... */}
        <TouchableOpacity style={[Style.forpreBooking,{backgroundColor: type === "prebooking" ? "#ee003d" : 'white',}]}  onPress={() => {setType("prebooking")}}>
          <Text style={[Style.preBooking, {color: type === "prebooking" ? 'white' : 'black'}]}>Pre Booking</Text>
        </TouchableOpacity> 
    

         <TouchableOpacity style={[Style.foroutstation,{backgroundColor: type === "outstation" ? "#ee003d" : 'white',}]}  onPress={() => {setType("outstation")}}>
          <Text style={[Style.outstation, {color: type === "outstation" ? 'white' : 'black'}]}>Outstation</Text>
        </TouchableOpacity>


        {renderItemOneView()}
        <CustomLoader showLoader={showLoader}/>
        {console.log(price, "price")}
        
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const Style = StyleSheet.create({
  forpreBooking: {
    //backgroundColor: "#ee003d",
    borderRadius: 10,
    height: 35,
    width: 130,
    marginHorizontal: 20,
    marginTop: 30,
  },
  preBooking: {
    //color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 6,
  },
  foroutstation: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 35,
    width: 130,
    marginLeft: 160,
    marginTop: -35,
    marginVertical: 10,
  },
  outstation: {
    //color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 6,
  },
  first: {
    backgroundColor: "#2d2d2d",
    marginHorizontal: 10,
    //borderRadius:15,
    //marginTop:-20,
    //borderRadius:8,
    //borderTopStartRadius:8
  },
  forRed: {
    width: 13,
    height: 13,
    backgroundColor: "red",
    borderRadius: 4,
    marginHorizontal: 20,
    marginTop: 20,
  },
  forGreen: {
    width: 13,
    height: 13,
    backgroundColor: "#00c443",
    borderRadius: 4,
    marginHorizontal: 20,
  },
  fromAddress: {
    color: "white",
    fontSize: 14,
    marginLeft: 50,
    marginTop: -20,
    marginHorizontal: 10,
  },
  toAddress: {
    color: "white",
    fontSize: 14,
    marginLeft: 50,
    marginTop: -20,
    marginHorizontal: 10,
  },
  forVertical: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
    marginTop: 20,
  },
  forImage: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 6,
  },
  customer: {
    color: "white",
    fontSize: 14,
    marginLeft: 110,
    fontWeight: "bold",
    marginTop: -80,
  },
  customerName: {
    color: "white",
    fontSize: 12,
    marginLeft: 110,
  },
  firstname: {
    marginHorizontal: 20,
    fontSize: 14,
    color: "white",
    marginTop: '10%',
    fontFamily: 'Roboto',
    opacity: 0.6,
  },
  input: {
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    fontSize: 15,
    color: "white",
    marginVertical: 3,
    marginTop: -8,
  },
  second: {
    backgroundColor: "#2d2d2d",
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    marginVertical: 100,
  },
  forsendsend: {
    width: 115,
    height: 35,
    backgroundColor: "#00c443",
    borderRadius: 8,
    marginTop: 50,
  },
  send: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginTop: 5,
  },
  forHorizontal: {
    borderLeftWidth: 1,
    borderLeftColor: "white",
    height: 30,
    marginTop: -2,
    marginLeft: 26,
  },
  forPriceAndSend: {
    flex: 1,
    flexDirection: "row",
  },
  forPrice: {
    width: '100%',
  },
  forSend: {
    width: '50%',
  },
  customerImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },

})

export default HomeScreen;




































































































//   import React, { useState } from 'react';
//   import { StyleSheet, View } from 'react-native';
//   import { Dropdown } from 'react-native-element-dropdown';
// //   import AntDesign from 'react-native-vector-icons/AntDesign';
// // import CheckBox from 'react-native-checkbox';

//   const data = [
//     { label: 'Item 1', value: '1' },
//     { label: 'Item 2', value: '2' },
//     { label: 'Item 3', value: '3' },
//     { label: 'Item 4', value: '4' },
//     { label: 'Item 5', value: '5' },
//     { label: 'Item 6', value: '6' },
//     { label: 'Item 7', value: '7' },
//     { label: 'Item 8', value: '8' },
//   ];

//   const country= [
//     { label1: 'India', value1: '1' },
//     { label1: 'USA', value1: '2' },
//     { label1: 'UK', value1: '3' },
//     { label1: 'PK', value1: '4' },
//     { label1: 'GK', value1: '5' },
//     { label1: 'CK', value1: '6' },
    
//   ]

//   const Home = () => {
//     const [value, setValue] = useState(null);
//     const [value1, setValue1] = useState(null);
    

//     return (
//         <View style={styles.container}>
//       <Dropdown
//         style={styles.dropdown}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         search
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder="Select item"
//         searchPlaceholder="Search..."
//         value={value}
//         onChange={item => {
//           setValue(item.value);
//         }}
//       />


//         <Dropdown
//         style={styles.dropdown}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={country}
//         search
//         maxHeight={300}
//         labelField="label1"
//         valueField="value1"
//         placeholder="Select Country"
//         searchPlaceholder="Search..."
//         value={value1}
//         onChange={item => {
//           setValue1(item.value);
//         }}
//       />

//      {/* <CheckBox
//      labelStyle={styles.check}
//      label='I agree to the Term & Services and Privacy Policy'
     
     
//       onChange={(checked) => console.log('I am checked', checked)}
//       /> */}
//       </View>
//     );
//   };

//   export default Home;

//   const styles = StyleSheet.create({
//     container:{
//         backgroundColor:"black"

//     },
//     dropdown: {
//       margin: 16,
//       height: 50,
//       borderBottomColor: 'white',
//       borderBottomWidth: 2,
//     },
//     icon: {
//       marginRight: 5,
//     },
//     placeholderStyle: {
//       fontSize: 16,
//       color:"white",
//     },
//     selectedTextStyle: {
//       fontSize: 16,
//       color:"white",
//     },
//     iconStyle: {
//       width: 20,
//       height: 20,
//     },
//     inputSearchStyle: {
//       height: 40,
//       fontSize: 16,
//     },
//     // check:{
//     //     color:"white",
//     //     fontSize:20,
//     // }
//   });