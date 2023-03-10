import React, {useReducer, useState, useEffect} from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, StatusBar, ImageBackground} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
// import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import externalstyle from '../styles/commonStyles';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Signup, {firstName, lastName, email, password, confirmPassword, mobile} from "./signup";
import { object } from "yup";
// import { Dropdown } from 'react-native-material-dropdown';


const Gender =[
  { label1: 'Male', value1: 'Male' },
  { label1: 'Female', value1: 'Female' },
]

const Next = ({navigation})=> {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [lable4, setLable4] = useState(null);

  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());


  // for validation.......
  const[gender, setGender] = useState('')
  const[errorGender, setErrorGender] = useState('')

  const[dob, setDob] = useState('')
  const[errorDob, setErrorDob] = useState('')

  const[country, setCountry] = useState('')
  const[errorCountry, setErrorCountry] = useState('')

  const[state, setState] = useState('')
  const[errorState, setErrorState] = useState('')

  const[city, setCity] = useState('')
  const[errorCity, setErrorCity] = useState('')

  const[address, setAddress] = useState('')
  const[errorAddress, setErrorAddress] = useState('')

  const[pincode, setPincode] = useState('')
  const[errorPincode, setErrorPincode] = useState('')

  const[landmark, setLandmark] = useState('')
  const[errorLandmark, setErrorLandmark] = useState('')

  const [countryData, setcountryData] = useState([])
  const [stateData, setstateData] = useState([])
  const [cityData, setcityData] = useState([])
  

  function showDatePicker() {
    setDatePicker(true);
  };

  useEffect(() => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'd01BSGhkRE55VTkySEtPVHNXcXRLWmVQV1VGYlkxVTlWVmlCb29BcA=='
      }
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var count = response.data.length
        console.log(count,"count");
        let countryArray = []
        for (var i = 0; i < count; i++){
          countryArray.push({
            value2: response.data[i].iso2,
            label2: response.data[i].name
          })
        }
        setcountryData(countryArray)
      })
      .catch(function (error) {
        console.log(error);
      });        
   },[]);

  
  
  function onDateSelected(event, value) {
    // console.log(value,"lllllllllllllllllllllll")
    setDate(value);
    setDatePicker(false);
    setErrorDob('');
    setDob(value);
  };

  // const onDateSelected=(e)=>{
  //   setErrorDob('');
  //   setDob(e.target.value);
  // }

  // const handleGenderChange = (e)=>{
  //   setErrorGender('');
  //   setGender(e.target.value);
  // }

  const handleAddressChange = (e)=>{
    setErrorAddress('');
    setAddress(e.target.value);
  }

  const handlePincodeChange = (e)=>{
    setErrorPincode('');
    setPincode(e.target.value);
  }

  const handleLandmarkChange = (e)=>{
    setErrorLandmark('');
    setLandmark(e.target.value);
  }

 
  const Submit=(e)=>{
    e.preventDefault();
    const {firstName, lastName, email, password, confirmPassword, mobile, countryCode,profileImage} = route.params
    //const {value1, date, value2, value3, value4, address, pincode, landmark }= route.params
    console.log(lable4,"newnnewwwww");
    console.log(firstName, lastName, email, password, confirmPassword, mobile, countryCode,profileImage,value1, date, value2, value3, value4,lable4, address,country,state, pincode, landmark, "dataGetRoute");
    if(gender!=''){
      // check gender
    }
    else{
      setErrorGender('please select gender')
    }
    if(dob!=''){
      // check date of birth
    }
    else{
      setErrorDob('please select date')
    }
    if(country!=''){
      // check country
    }
    else{
      setErrorCountry('please select country')
    }
    if(state!=''){
      // check state
    }
    else{
      setErrorState('please select state')
    }
    if(city!=''){
      // check city
    }
    else{
      setErrorCity('please select city')
    }
    if(address!=''){
      // check address
    }
    else{
      setErrorAddress('please enter address')
    }
    if(pincode!=''){
      // check pincode
    }
    else{
      setErrorPincode('please enter pincode')
    }
    if(landmark!=''){
      // check landmark
    }
    else{
      setErrorLandmark('please enter landmark')
    }
    // console.log(date,dob,"ppppppppppppppppppppp")
    if(gender!=='' && country!=='' && state!=='' && city!=='' && address!=='' && pincode!=='' && landmark!==''){
      navigation.navigate("Add Business Detail" ,{preFormData:{firstName, lastName, email, password, confirmPassword, mobile, countryCode, value1, date, value2, value3, value4, address, pincode, landmark, lable4,profileImage,country,state}})
    }
  }

  const route = useRoute();

                console.log(route.params.firstName)
                console.log(route.params.lastName)
                console.log(route.params.email)
                console.log(route.params.password)
                console.log(route.params.confirmPassword)
                console.log(route.params.mobile)
                console.log(route.params.countryCode.callingCode)
                console.log(route.params.countryCode.cca2)
  
  // console.log(route.params.firstName)
  // console.log(route.params.lastName)
  // console.log(route.params.email)
  // console.log(route.params.password)
  // console.log(route.params.confirmPassword)
  console.log(countryData,"ll")

  const handleState = (countryCode) => {
    var axios = require('axios');
    console.log(countryCode,'in');
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/`,
      headers: {
        'X-CSCAPI-KEY': 'd01BSGhkRE55VTkySEtPVHNXcXRLWmVQV1VGYlkxVTlWVmlCb29BcA=='
      }
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data),"state");
        var count = response.data.length
        let stateArray = []
        for (var i = 0; i < count; i++){
          stateArray.push({
            value3: response.data[i].iso2,
            label3: response.data[i].name
          })
        }
        setstateData(stateArray)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleCity = (countryCode,stateCode) => {
    console.log(countryCode,stateCode,"ooom");
    var axios = require('axios');

    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        'X-CSCAPI-KEY': 'd01BSGhkRE55VTkySEtPVHNXcXRLWmVQV1VGYlkxVTlWVmlCb29BcA=='
      }
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data),"city");
        var count = response.data.length
        let cityArray = []
        for (var i = 0; i < count; i++){
          cityArray.push({
            value4: response.data[i].id,
            label4: response.data[i].name
          })
        }
        setcityData(cityArray)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //console.log(label4,"v...v");

  return(
    <View style={Style.container}>
      <ImageBackground 
        source={require('../../asets/icons/onbaord_bg.png')}>
        <ScrollView>
        <StatusBar hidden={true} />
        {/* <Image style={externalstyle.backgroundImage}
          source={require('../../asets/icons/travel-splash23.png')}/> */}
            {/* header start........ */}
                 <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={() => {
                  navigation.goBack();
                }}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                  </View>
            {/* header end...... */}

    <Text style={externalstyle.label}>Gender</Text>
      <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
        itemTextStyle={{color:'grey'}}
        data={Gender}
        search
        maxHeight={300}
        labelField='label1'
        valueField='value1'
        placeholder="Select Gender "
        searchPlaceholder="Search here..."
        value={value1}
        onChangeText={(text)=>setValue1(text)}
        onChange={(item) => {
          setValue1(item.value1);
          setErrorGender('');
          setGender(value1); 
          // {handleGenderChange}
        }}
      />
      <Text style={externalstyle.textValidation}>{errorGender}</Text>

      <Text style={externalstyle.label}>Date of Birth</Text>
         
          <View style={[externalstyle.input,{flexDirection: 'row'}]}>
            <TextInput keyboardType='numeric' placeholder="dd/mm/yy" placeholderTextColor={"white"}  style={[externalstyle.input,{borderBottomWidth:0,marginTop: 5, marginHorizontal:0,}]} 
            value={moment(date).format('DD/MM/YYYY')}
            />
            <TouchableOpacity style={{alignSelf: 'center', marginLeft: 'auto'}}
              onPress={showDatePicker}>
              <Image style={[Style.dateImage,{
                // marginLeft: 'auto',  
                justifyContent:'flex-end',
                alignItems:'flex-end',
                alignSelf:'flex-end',
                // marginHorizontal:20,
                 }]}
                source={require('../../asets/icons/calendar-week.png')}
              />
            </TouchableOpacity>
          </View>
          <Text style={externalstyle.textValidation}>{errorDob}</Text>


      {datePicker && (
          <DateTimePicker
            value={date}
            // value={moment(date).format('DD/MM/YYYY')}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChangeText={(text)=>setDate(text)}
            onChange={onDateSelected}
            onConfirm={(date) => {
              // console.log(date,"ttttttttttttttttttttttt")
              setOpen(true) 
              setDate(moment(date).format('DD/MM/YYYY'))
            }}
          />
        )}

        {/* <TouchableOpacity style={{}}
        onPress={showDatePicker}>
        <Image style={Style.dateImage} 
        source={require('../../asets/icons/calendar-week.png')}
        />
        </TouchableOpacity> */}

      <Text style={externalstyle.label}>Country</Text>
      <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        itemTextStyle={{color:'grey'}}
        iconStyle={Style.iconStyle}
        data={countryData}
        search
        maxHeight={300}
        labelField="label2"
        valueField="value2"
        placeholder="Select Country "
        searchPlaceholder="Search here..."
        value={value2}
        onChangeText={(text)=>setValue2(text)}
        onChange={(item) => {
          console.log(item);
          setValue2(item.value2);
          handleState(item.value2)
          setErrorCountry('');
          setCountry(item.label2);
        }}
      />
      <Text style={externalstyle.textValidation}>{errorCountry}</Text>

      <Text style={externalstyle.label}>State</Text>
      <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
        itemTextStyle={{color:'grey'}}
        data={stateData}
        search
        maxHeight={300}
        labelField="label3"
        valueField="value3"
        placeholder="Select State "
        searchPlaceholder="Search here..."
        value={value3}
        //onChangeText={(text)=>setValue3(text)}
        onChange={item => {
          setValue3(item.value3);
          handleCity(value2,item.value3)
          setErrorState('');
          setState(item.label3);
        }}
      />
      <Text style={externalstyle.textValidation}>{errorState}</Text>

      <Text style={externalstyle.label}>City</Text>
      <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
        itemTextStyle={{color:'grey'}}
        data={cityData}
        search
        maxHeight={300}
        labelField="label4"
        valueField="value4"
        placeholder="Select City "
        searchPlaceholder="Search here..."
        value={value4}
        onChangeText={(text)=>setValue4(text)}
        onChange={(item) => {
          console.log(item,"city onchange");
          setValue4(item.value4);
          setLable4(item.label4);
          setErrorCity('');
          setCity(item.label);
        }}
      />
      <Text style={externalstyle.textValidation}>{errorCity}</Text>

      <Text style={externalstyle.label}>Address</Text>
      <TextInput placeholder="Enter Address" 
      placeholderTextColor={"white"} 
      style={externalstyle.input}
      onChangeText={(text)=>setAddress(text)}
      onChange={handleAddressChange} 
      value={address}/>
      <Text style={externalstyle.textValidation}>{errorAddress}</Text>

      <Text style={externalstyle.label}>Pincode</Text>
      <TextInput keyboardType = 'numeric' 
      placeholder="Enter Pincode" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      onChangeText={(text)=>setPincode(text)}
      onChange={handlePincodeChange} 
      value={pincode}/>
      <Text style={externalstyle.textValidation}>{errorPincode}</Text>

      <Text style={externalstyle.label}>Landmark</Text>
      <TextInput placeholder="Enter Landmark" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      onChangeText={(text)=>setLandmark(text)}
      onChange={handleLandmarkChange} 
      value={landmark}/>
      <Text style={externalstyle.textValidation}>{errorLandmark}</Text>

      <TouchableOpacity 
      // onPress={()=>navigation.navigate("Add Business Detail")}
      onPress={(e)=>{Submit(e)}}
      style={externalstyle.button}>
        <Text style={externalstyle.buttonText}>NEXT</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={{justifyContent:'center',alignItems:'center'}}
       onPress={()=>navigation.navigate("Login")}>
        <Text style={externalstyle.login}>Already have an Account? <Text style={{color:"#ff4082", fontWeight:'bold'}}>LOGIN</Text></Text>
        {/* <Text style={externalstyle.forlogin}> LOGIN </Text> */}
        </TouchableOpacity>

                {/* <Text style={{color:'white', marginHorizontal:20, fontSize:20}}>{route.params.firstName}</Text>
                <Text style={{color:'white', marginHorizontal:20, fontSize:20}}>{route.params.lastName}</Text>
                <Text style={{color:'white', marginHorizontal:20, fontSize:20}}>{route.params.email}</Text>
                <Text style={{color:'white', marginHorizontal:20, fontSize:20}}>{route.params.password}</Text>
                <Text style={{color:'white', marginHorizontal:20, fontSize:20}}>{route.params.confirmPassword}</Text>
                <Text style={{color:'white', marginHorizontal:20, fontSize:20}}>{route.params.mobile}</Text>
                <Text style={{color:'white', marginHorizontal:20, fontSize:20}}>{route.params.countryCode.callingCode}</Text>
                <Text style={{color:'white', marginHorizontal:20, fontSize:20}}>{route.params.countryCode.cca2}</Text> */}

                 
                


     </ScrollView>
     </ImageBackground>
    </View>
    
  )
}

const Style = StyleSheet.create({
    container:{
        backgroundColor:"black"
    },
    gender:{
       borderBottomColor:"white",
       borderBottomWidth:5,
       color:"white",
    },
    check:{
      color:"white",
      marginTop:40,
  },
  checkbox:{
    marginTop:40,
    marginHorizontal:10,
    backgroundColor:"darkgreen",
    borderRadius:5,
  },
  dropdown: {
    // margin: 16,
    marginHorizontal:20,
    height:40,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop:-4,

  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    color:"white",
    marginHorizontal:5,
    // marginTop:-15,
  },
  selectedTextStyle: {
    fontSize: 15,
    color:"white",
  },
  iconStyle: {
    width: 20,
    height: 20, 
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:'black'
  },
  dateImage:{
    width:20,
    height:20,
    // marginLeft:320,
    //marginTop:-60,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'flex-end',
    //marginHorizontal:20,
  },
  placeholder:{
    marginHorizontal:10,
  }

})


export default Next