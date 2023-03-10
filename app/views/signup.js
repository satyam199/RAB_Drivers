import React,{useEffect, useState} from "react";
import {Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, Alert, ImageBackground} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
// import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import externalstyle from '../styles/commonStyles';
import Svg, {Path, Rect, G, Circle} from 'react-native-svg';
import { addMethod, date } from "yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { androidCameraPermission } from "../../permission.js";

const Signup = ({navigation})=>{

  const[firstName, setFirstName] = useState('');
  const[errorFirstName, setErrorFirstName] = useState('');

  const[lastName, setLastName] = useState('');
  const[errorLastName, setErrorLastName] = useState('');

  const[email, setEmail] = useState('');
  const[errorEmail, setErrorEmail] = useState('');

  const[password, setPassword] = useState('');
  const[errorPassword, setErrorPassword] = useState('');

  const[confirmPassword, setConfirmPassword] = useState('');
  const[errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const[mobile, setMobile] = useState('');
  const[errorMobile, setErrorMobile] = useState('');

  // const[countryCallingCode, setCountryCallingCode] = useState(countryData)

  const[countryCode, setCountryCode] = useState('')

  const [isSecureEntry, setIsSecureEntry]=useState(true)
  const [isSecureEntrySecond, setIsSecureEntrySecond]=useState(true)

  const [userImage, setUserImage] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const[errorprofileImage, setErrorprofileImage] = useState('');

  console.log(countryCode.callingCode,"countryCode")
  console.log(countryCode.cca2,"countryCode")
  console.log(countryCode,"countryCode");

  const[image, openCamera] = useState('');
  const[images, openPicker] = useState('');

  const onSelectImage = async() => {
     const permissionStatus = await androidCameraPermission()
     if(permissionStatus || Platform.OS == 'android'){
      Alert.alert(
        'Profile Picture',
        'Choose an option ',
        [
          {text: 'Camera', onPress: onCamera},
          {text: 'Gallery', onPress: onGallery},
          {text: 'Cancel' , onPress: ()=> {}}
        ]
      )
     }
  }

  const onCamera =()=>{
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let user_image = {
        data:image.data,
        name:
          Platform.OS === 'ios'
            ? image.filename
            : image.path.substring(
              image.path.lastIndexOf('/') + 1,
              image.path.length,
            ),
        type: image.mime,
        uri: image.path,
      };
      setProfileImage(user_image)
      setUserImage(image.path)
      console.log(userImage,"image");
    });
  };

const onGallery =()=>{
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  }).then(image => {
    let user_image = {
      data:image.data,
      name:
        Platform.OS === 'ios'
          ? image.filename
          : image.path.substring(
            image.path.lastIndexOf('/') + 1,
            image.path.length,
          ),
      type: image.mime,
      uri: image.path,
    };
    setProfileImage(user_image)
    setUserImage(image.path)
      console.log(userImage,"image");
  });
}

const onPress = ()=>{
  onSelectImage();
  // onopenGallery();
}

const removeEmptySpaces = firstName => {
  return /\s/g.test(firstName);
};

const handleFirstNameChange=(e)=>{
  setErrorFirstName('');
  setFirstName(e.target.value);
  const isValid = removeEmptySpaces(e.target.value);
  // firstName.require('first name is required')
}

const handleLastNameChange=(e)=>{
  setErrorLastName('');
  setLastName(e.target.value);
}

const handleEmailChange=(e)=>{
  setErrorEmail('');
  setEmail(e.target.value);
}

const handlePasswordChange=(e)=>{
  setErrorPassword('');
  setPassword(e.target.value);
}

const handleConfirmPasswordChange=(e)=>{
  setErrorConfirmPassword('');
  setConfirmPassword(e.target.value);
}

const handleMobileChange=(e)=>{
  setErrorMobile('');
  // setMobile(e.target.value);
  // console.log(e);
}

// var country_code = null;
// $.getJSON('http://ipinfo.io/' + userip, function(data){
//     country_code = data.country;
//     alert(country_code);
// });

// const onIconPress = ()=>{
//   // let iconName = (this.state.secureTextEntry) ? "eye-off" : "eye";

//   secureTextEntry({
//     secureTextEntry: ! secure.state.secureTextEntry
//   });
// }

// const Submit=(e)=>{
//   console.log(profileImage,"profileImage");
//   e.preventDefault();
//   // const route = useRoute();
//   if(profileImage!= ''){

//   }else{
//     setErrorprofileImage('please Set your Profile Picture')
//   }
  
//   if(firstName!=''){
//     //  check first name
//   }
//   else{
//     setErrorFirstName('please enter first name')
//   }
//   if(lastName!=''){
//     // check last name
//   }
//   else {
//     setErrorLastName('please enter last name')
//   }
//   if(email!=''){
//     // check email
//   }
//   else{
//     setErrorEmail('please enter email')
//   }
//   if(password!=''){
//     // check password
//   } 
//   else{
//     setErrorPassword('please enter password')
//   }
//   if(confirmPassword!=''){
//     // check confirm password
//   }
//   else{
//     setErrorConfirmPassword('please confirm your password')
//   }
//   if(mobile!=''){
//     // check mobile
//   }
//   else{
//     setErrorMobile('please enter mobile number')
//   }
//   if(firstName!=='' && lastName!=='' && email!=='' && password!=='' && confirmPassword!=='' && mobile!==''){
//     navigation.navigate("Next",{firstName, lastName, email, password, confirmPassword, mobile, countryCode,profileImage})
    
//     // const {firstName, lastName, email, password, confirmPassword, mobile} = route.params
    
//   }
// }
const emailValidityCheck = email => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/.test(email)) {
    return true;
  }
  return false;
};
const Submit=(e)=>{
  console.log(profileImage,"profileImage");
  e.preventDefault();
  // const route = useRoute();
  if(!userImage){
    setErrorprofileImage('please Set your Profile Picture')
  } 
  else if(!firstName){
    setErrorFirstName('please enter first name')
  }
  else if(!lastName){
    setErrorLastName('please enter last name')
  }
  else if(!email){
    setErrorEmail('please enter email')
  }
  else if(!emailValidityCheck(email)){
    setErrorEmail('please enter valid email')
  }
  else if(!password){
    setErrorPassword('please enter password')
  }
  else if(password.length < 8){
    setErrorPassword('Password must be 8 digits')
  } 
  else if(!confirmPassword){
    setErrorConfirmPassword('please confirm your password')
  } 
  else if(password !== confirmPassword){
    setErrorConfirmPassword('confirm Password should be same as password ')
  }     
  else if(!mobile){
    setErrorMobile('please enter mobile number')
  }
  else if(mobile.length < 10){
    setErrorMobile('Your mobile number is less than 10')
  }
  else{
    navigation.navigate("Next",{firstName, lastName, email, password, confirmPassword, mobile, countryCode,profileImage})
    
    // const {firstName, lastName, email, password, confirmPassword, mobile} = route.params
    
  }
}

// // // ######################## for API #############################
// const requestOptions = {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({first_name: firstName, last_name: lastName, email: email, password: password, country_iso:cca2,country_code:callingCode, mobile_no: mobile, gender: gender, dob: date, country: country, state: state, city: city, address:address, pin_code:pincode, landmark:landmark, brand_id:brand, model_id:model, registration_no:registration, location:location, driving_area_radius:drivingAreaRadius, license_no: licenseNumber, license_expiry_date, })
// };

// // const postExample = async () => {
//   try {
//       fetch('https://reqres.in/api/posts', requestOptions)
//           .then(response => {
//               response.json()
//                   .then(data => {
//                       Alert.alert("Post created at : ", 
//                       data.createdAt);
//                   });
//           })
//   }
//   catch (error) {
//       console.error(error);
//   }






//  const RfH = value => {
//   const dim = Dimensions.get('window');
//   return dim.height * (value / STANDARD_SCREEN_DIMENSIONS.height);
// };

// fetch("https://www.postman.com/collections/0ce1b8ce11799a8f825a")

// .then(response => response.json())
// .then((responseJson) => {
//     console.log('getting data from fetch', responseJson)
//     this.setState({
//         loading: false,
//         dataSource: responseJson
//     })
// })
// .catch(error => 
//   console.log(error))


// fetch('https://www.postman.com/collections/0ce1b8ce11799a8f825a', {
//   method: 'GET',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     firstParam: 'yourValue',
//     secondParam: 'yourOtherValue'
//   })
// });


  return(
    <View style={externalstyle.container}>
      <ImageBackground style={externalstyle.backgroundImage}
        source={require('../../asets/icons/onbaord_bg.png')}>
        <ScrollView>
        <StatusBar hidden={true} />
        {/* <Image style={externalstyle.backgroundImage}
          source={require('../../asets/icons/travel-splash23.png')}/> */}

          {/* header start........ */}
         <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                  </View>
          {/* header end...... */}

    <Text style={Style.register}>Register to RAB</Text>
    <Text style={Style.lorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>


    <View style={{justifyContent:'center', alignItems:'center'}}>
    <TouchableOpacity style={Style.photo}
    // source={userImage ? { uri: userImage } : { uri: userImage } }
    onPress={onSelectImage}>
      {/* <Image 
            style={Style.userImage}
            source={require('../../asets/icons/user.svg')}/> */}
            {/* <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.333 58" style={Style.userImage}>
            <Path id="user" d="M48.333,47.993a10.941,10.941,0,0,1-2.36,7.062A7.072,7.072,0,0,1,40.291,58H8.043A7.069,7.069,0,0,1,2.36,55.055,10.953,10.953,0,0,1,0,47.993a54.325,54.325,0,0,1,.321-6.061,32.55,32.55,0,0,1,1.189-5.74,19.1,19.1,0,0,1,2.209-4.946,10.579,10.579,0,0,1,3.549-3.361,9.8,9.8,0,0,1,5.08-1.3,16.319,16.319,0,0,0,11.819,4.833,16.319,16.319,0,0,0,11.819-4.833,9.8,9.8,0,0,1,5.078,1.3,10.579,10.579,0,0,1,3.549,3.361,19.1,19.1,0,0,1,2.209,4.946,32.55,32.55,0,0,1,1.189,5.74A54.323,54.323,0,0,1,48.332,48ZM38.667,14.5a13.966,13.966,0,0,1-4.249,10.252A13.978,13.978,0,0,1,24.167,29a13.962,13.962,0,0,1-10.252-4.248A13.973,13.973,0,0,1,9.667,14.5,13.973,13.973,0,0,1,13.915,4.249,13.962,13.962,0,0,1,24.167,0,13.978,13.978,0,0,1,34.418,4.249,13.966,13.966,0,0,1,38.667,14.5Z" fill="#fff"/>
            </Svg> */}
            <Image
                  style={Style.userImage}
                  // resizeMode="contain"
                  //onChangeText={this.handleImage}
                  source={userImage ? { uri: userImage } : require('../../asets/icons/profile_placeholder.png') }
                /> 

      {/* <Text style={Style.uploadImage}>Upload Image (png,jpg,svg)</Text> */}
      
      </TouchableOpacity>
      </View>

      <Text style={Style.uploadImage}>Upload Profile Picture</Text>
      <Text style={[externalstyle.textValidation,{textAlign:"center"}]}>{errorprofileImage}</Text>

      {/* <Text style={Style.uploadprofile}>Upload Profile Picture</Text> */}

    <Text style={externalstyle.label}>First Name</Text>
      <TextInput placeholder="Enter First Name" 
      placeholderTextColor={"white"} 
      style={externalstyle.input}
      autoCapitalize='none'
      onChangeText={(text)=>setFirstName(text)}
      onChange={handleFirstNameChange} 
      value={firstName}/>
       <Text style={externalstyle.textValidation}>{errorFirstName}</Text>

      <Text style={externalstyle.label}>Last Name</Text>
      <TextInput placeholder="Enter Last Name" 
      placeholderTextColor={"white"} 
      style={externalstyle.input}
      autoCapitalize='none'
      onChangeText={(text)=>setLastName(text)}
      onChange={handleLastNameChange} 
      value={lastName}/>
      <Text style={externalstyle.textValidation}>{errorLastName}</Text>
      
      <Text style={externalstyle.label}>E-mail</Text>
      <TextInput placeholder="Enter Email" 
      placeholderTextColor={"white"} 
      style={externalstyle.input}
      autoCapitalize='none'
      keyboardType='email-address'
      onChangeText={(text)=>setEmail(text)}
      onChange={handleEmailChange} value={email}/>
      <Text style={externalstyle.textValidation}>{errorEmail}</Text>
      
      <Text style={externalstyle.label}>Password</Text>
      <TextInput 
      secureTextEntry={isSecureEntry} 
      placeholder="Enter Password" 
      placeholderTextColor={"white"} 
      style={externalstyle.input}
      autoCapitalize='none'
      onChangeText={(text)=>setPassword(text)}
      onChange={handlePasswordChange} value={password}/>
      <Text style={externalstyle.textValidation}>{errorPassword}</Text>

      <TouchableOpacity 
       onPress={()=>{
        setIsSecureEntry((prev)=> !prev)
       }}
       >
     <Image
    //  name={this.state.iconName} 
     style={Style.showPasswordImage}
     source={require('../../asets/icons/eye-fill.png')}/>
     </TouchableOpacity>
      
      <Text style={externalstyle.label}>Confirm Password</Text>
      <TextInput 
      secureTextEntry={isSecureEntrySecond} 
      placeholder="Re-enter Password" 
      placeholderTextColor={"white"} 
      style={externalstyle.input}
      autoCapitalize='none'
      onChangeText={(text)=>setConfirmPassword(text)}
      onChange={handleConfirmPasswordChange} 
      value={confirmPassword}/>
       <Text style={externalstyle.textValidation}>{errorConfirmPassword}</Text>

       <TouchableOpacity 
       onPress={()=>{
        setIsSecureEntrySecond((prev)=> !prev)
       }}
      >
     <Image
    //  name={this.state.iconName} 
     style={Style.showPasswordImage}
     source={require('../../asets/icons/eye-fill.png')}/>
     </TouchableOpacity>

      <Text style={externalstyle.label}>Mobile</Text>
      {/* <PhoneInput keyboardType = 'numeric' 
      containerStyle={{width: "90%",height: 50,marginTop:5,backgroundColor:'gray',marginHorizontal: 20}}
      layout='first'
      codeTextStyle={{color:'white'}}
      withDarkTheme='true'
      placeholder='Enter Mobile'
      placeholderTextColor={"white"}
      textContainerStyle={{backgroundColor: 'gray', }}
      countryPickerButtonStyle={{color:'white'}}
      // textStyle={{fontSize:16, color:'black', backgroundColor:'black' }} 
      // textInputStyle={{}}
      textInputStyle={{padding:0, color: 'white'}} 
      flagButtonStyle={{color:'white'}}
      style={Style.phoneInput}
      onChangeText={(e)=>setMobile(e)}
      // onChange={handleMobileChange} 
      onChangeCountry={(text)=>setCountryCode(text)}
      onChangeFormattedText={handleMobileChange}
      // defaultValue={countryCode}
      value={mobile}
      withShadow
      /> */}
       {/* <PhoneInput keyboardType = 'numeric' 
      containerStyle={{width:'auto', height:40, marginHorizontal:20, marginTop:5, borderBottomColor:'white', borderBottomWidth:1,  backgroundColor:'gray',padding: 0}}
      layout='first'
      codeTextStyle={{color:'white'}}
      withDarkTheme='true'
      placeholder='Enter Mobile'
      textContainerStyle={{placeholder:'Enter mobile', placeholderTextColor:'White', backgroundColor:'transparent',padding:0}}
      textInputStyle={{padding:0, color:"white", fontSize:16, }} 
      countryPickerButtonStyle={{color:'white'}}
      flagButtonStyle={{color:'white'}}
      style={Style.phoneInput}
      onChangeText={(e)=>setMobile(e)}
      // onChange={handleMobileChange} 
      onChangeCountry={(text)=>setCountryCode(text)}
      onChangeFormattedText={handleMobileChange}
      // defaultValue={countryCode}
      value={mobile}
      withShadow
      /> */}
      <PhoneInput
            containerStyle={{width: "90%",height: 60,marginTop:5,backgroundColor:'gray',marginHorizontal:20}}
            //ref={phoneInput}
            textInputProps={{ maxLength: 10 }}
            textContainerStyle={{backgroundColor: 'gray', }}
            //defaultValue={value}
            defaultCode="IN"
            layout="first"
            textInputStyle={{padding:0, color: 'white'}} 
            onChangeText={(e)=>setMobile(e)}
            // onChange={handleMobileChange} 
            onChangeCountry={(text)=>setCountryCode(text)}
            onChangeFormattedText={handleMobileChange}
            // defaultValue={countryCode}
            value={mobile}
            withShadow
            withDarkTheme
            // autoFocus
          />  
      <Text style={externalstyle.textValidation}>{errorMobile}</Text>
      
      

      <TouchableOpacity style={externalstyle.button} 
      // onPress={()=>navigation.navigate("Next")}
      onPress={(e)=>{Submit(e)}}>
        <Text style={externalstyle.buttonText}>NEXT</Text>
      </TouchableOpacity>


      <TouchableOpacity
      style={{justifyContent:'center',alignItems:'center'}}
       onPress={()=>navigation.navigate("Login")}>
        <Text style={externalstyle.login}>Already have an Account? <Text style={{color:'#ff4082', fontWeight:'bold'}}>LOGIN</Text></Text>
        {/* <Text style={externalstyle.forlogin}> LOGIN </Text> */}
        </TouchableOpacity>
      </ScrollView>
      </ImageBackground>
    </View>
    
  )
}

const Style = StyleSheet.create({
  register:{
    color:"white", 
    fontSize:20,
    textAlign:"center",   
    fontWeight:"bold",
    marginTop:10,
  },
  lorem:{
    color:"white",
    marginTop:15,
    fontSize:15,
    textAlign:"center",
    marginHorizontal:25,
    marginTop:10,
  },
  photo:{
    width:150,
    height:150,
    backgroundColor:'#2D2D2D',
    marginTop:20,
    // marginLeft:110,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    marginVertical:30,
    // alignSelf:'center',
  },
  uploadprofile:{
    color:"white",
    fontSize:16,
    textAlign:"center",
    marginTop:15,
    marginBottom:10,
  },
  uploadImage:{
    textAlign:"center",
    fontSize:16,
    fontWeight:"bold",
    // marginVertical:60,
    alignItems:'center',
    color:'#FFFFFF',
    opacity:0.6,
    marginTop:-10,
    marginBottom:10,
  },
  userImage:{
    width:150,
    height:150,
    // marginTop:-20,
  },
  showPasswordImage:{
    width:20,
    height:14,
    // marginLeft:320,
    alignSelf:'flex-end',
    marginHorizontal:20,
    marginTop:-50,
  },
  // phoneInput:{
  //   marginHorizontal:20,
  //   borderBottomWidth:1,
  //   borderBottomColor:"white",
  //   fontSize:16,
  //   color:"white",
  //   marginTop:10,
  // }
})

export default Signup