// import React,{useEffect, useState} from "react";
// import {Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, Alert, ImageBackground} from "react-native";
// import ImagePicker from 'react-native-image-crop-picker';
// import externalstyle from '../styles/commonStyles';
// import Svg, {Path, Rect, G, Circle} from 'react-native-svg';
// import PhoneInput from "react-native-phone-number-input";
// import { androidCameraPermission } from "../../permission.js";
// import { Dropdown } from 'react-native-element-dropdown';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';
// import axios from "axios";

// const Gender =[
//   { label1: 'Male', value1: 'Male' },
//   { label1: 'Female', value1: 'Female' },
// ]

// const Country =[
//   { label2: 'India', value2: 'India' },
//   { label2: 'USA', value2: 'USA' },
//   { label2: 'UK', value2: 'UK' },
//   { label2: 'PK', value2: 'PK' },
//   { label2: 'GK', value2: 'GK' },
//   { label2: 'CK', value2: 'CK' },
// ]

// const State =[
//   { label3: 'Uttrakhand', value3: 'Uttrakhand' },
//   { label3: 'Punjab', value3: 'Punjab' },
//   { label3: 'UK', value3: 'UK' },
//   { label3: 'PK', value3: 'PK' },
//   { label3: 'GK', value3: 'GK' },
//   { label3: 'CK', value3: 'CK' },
// ]

// const City =[
//   { label4: 'Mohali', value4: 'Mohali' },
//   { label4: 'Haldwani', value4: 'Haldwani' },
//   { label4: 'Sitarganj', value4: 'Sitarganj' },
//   { label4: 'PK', value4: 'PK' },
//   { label4: 'GK', value4: 'GK' },
//   { label4: 'CK', value4: 'CK' },
// ]


// const ForCreateProfile = ({navigation})=>{

//   const [Brand,setBrandArr] = useState([])
//     const [Model,setModelArr] = useState([])
//     const [value5, setValue5] = useState("");
//     const [value6, setValue6] = useState("");

//   const [value1, setValue1] = useState(null);
//   const [value2, setValue2] = useState(null);
//   const [value3, setValue3] = useState(null);
//   const [value4, setValue4] = useState(null);

//   const [datePicker, setDatePicker] = useState(false);
//   const [date, setDate] = useState(new Date());

//   const[firstName, setFirstName] = useState('');
//   const[errorFirstName, setErrorFirstName] = useState('');

//   const[lastName, setLastName] = useState('');
//   const[errorLastName, setErrorLastName] = useState('');

//   const[mobile, setMobile] = useState('');
//   const[errorMobile, setErrorMobile] = useState('');

//   const[gender, setGender] = useState('')
//   const[errorGender, setErrorGender] = useState('')

//   const[country, setCountry] = useState('')
//   const[errorCountry, setErrorCountry] = useState('')

//   const[state, setState] = useState('')
//   const[errorState, setErrorState] = useState('')

//   const[city, setCity] = useState('')
//   const[errorCity, setErrorCity] = useState('')

//   const[dob, setDob] = useState('')
//   const[errorDob, setErrorDob] = useState('')

//   const[address, setAddress] = useState('')
//   const[errorAddress, setErrorAddress] = useState('')

//   const[pincode, setPincode] = useState('')
//   const[errorPincode, setErrorPincode] = useState('')

//   const[landmark, setLandmark] = useState('')
//   const[errorLandmark, setErrorLandmark] = useState('')

//   const[brand, setBrand] = useState('')
//   const[errorBrand, setErrorBrand] = useState('')

//   const[modell, setModel] = useState('')
//   const[errorModel, setErrorModel] = useState('')

//   const [userImage, setUserImage] = useState('')

//   const[countryCode, setCountryCode] = useState('')

//   console.log(countryCode.callingCode)
//   console.log(countryCode.cca2)

//   const[image, openCamera] = useState('');
//   const[images, openPicker] = useState('');

//   const onSelectImage = async() => {
//      const permissionStatus = await androidCameraPermission()
//      if(permissionStatus || Platform.OS == 'android'){
//       Alert.alert(
//         'Profile Picture',
//         'Choose an option ',
//         [
//           {text: 'Camera', onPress: onCamera},
//           {text: 'Gallery', onPress: onGallery},
//           {text: 'Cancel' , onPress: ()=> {}}
//         ]
//       )
//      }
//   }

//   const onCamera =()=>{
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then(image => {
      
//       setUserImage(image.path)
//       console.log(userImage,"image");
//     });
//   };

// const onGallery =()=>{
//   ImagePicker.openPicker({
//     width: 300,
//     height: 400,
//     cropping: true
//   }).then(image => {
//     setUserImage(image.path)
//       console.log(userImage,"image");
//   });
// }

// const onPress = ()=>{
//   onSelectImage();
//   // onopenGallery();
// }

// useEffect(()=>{
//   callApiBrands()
//  },[])

// const handleFirstNameChange=(e)=>{
//   setErrorFirstName('');
//   setFirstName(e.target.value);
//   // const isValid = removeEmptySpaces(e.target.value);
// }

// const handleLastNameChange=(e)=>{
//   setErrorLastName('');
//   setLastName(e.target.value);
// }

// const handleAddressChange = (e)=>{
//   setErrorAddress('');
//   setAddress(e.target.value);
// }

// const handlePincodeChange = (e)=>{
//   setErrorPincode('');
//   setPincode(e.target.value);
// }

// const handleLandmarkChange = (e)=>{
//   setErrorLandmark('');
//   setLandmark(e.target.value);
// }

// const handleMobileChange=(e)=>{
//   setErrorMobile('');
// }

// function showDatePicker() {
//   setDatePicker(true);
// };

// function onDateSelected(event, value) {
//   setDate(value);
//   setDatePicker(false);
//   setErrorDob('');
//   setDob(value);
// };

// // for Brand and Models api................................................................... 

// const callApiBrands = async () => {
//   let res = await axios.get('brands/5')
// let {data} = res
// if(data.status==200){
// setBrandArr(data.data)
// }}
// const callApiModels = async (id) => {
// console.log(value5,"sjkgajdg")
// let res = await axios.get(`models/${id}`)
// let {data} = res
// if(data.status==200){
// setModelArr(data.data)
// } 
// }; 


// const Submit=(e)=>{
//   e.preventDefault();
//   // const route = useRoute();

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
//   if(mobile!=''){
//     // check mobile
//   }
//   else{
//     setErrorMobile('please enter mobile number')
//   }
//   if(gender!=''){
//     // check gender
//   }
//   else{
//     setErrorGender('please select gender')
//   }
//   if(country!=''){
//     // check country
//   }
//   else{
//     setErrorCountry('please select country')
//   }
//   if(state!=''){
//     // check state
//   }
//   else{
//     setErrorState('please select state')
//   }
//   if(city!=''){
//     // check city
//   }
//   else{
//     setErrorCity('please select city')
//   }
//   if(dob!=''){
//     // check date of birth
//   }
//   else{
//     setErrorDob('please select date')
//   }
//   if(address!=''){
//     // check address
//   }
//   else{
//     setErrorAddress('please enter address')
//   }
//   if(pincode!=''){
//     // check pincode
//   }
//   else{
//     setErrorPincode('please enter pincode')
//   }
//   if(landmark!=''){
//     // check landmark
//   }
//   else{
//     setErrorLandmark('please enter landmark')
//   }
//   if(brand!=''){
//     // check brand
//   }
//   else{
//     setErrorBrand('please select brand')
//   }
//   if(modell!=''){
//     // check model
//   }
//   else{
//     setErrorModel('please select model')
//   }
//   if(firstName!=='' && lastName!=='' && mobile!=='' && gender!=='' && country!=='' && state!=='' && city!=='' && address!=='' && pincode!=='' && landmark!=='' && brand!=='' && modell!==''){
//     navigation.navigate("Profile")
//   }
// }
//   return(
//     <View style={externalstyle.container}>
//       <ImageBackground 
//           source={require('../../asets/icons/travel-splash23.png')}>
//         <ScrollView>
//         <StatusBar hidden={true} />
//         {/* <Image style={externalstyle.backgroundImage}
//           source={require('../../asets/icons/travel-splash23.png')}/> */}

//           {/* header start........ */}
//          <View style={externalstyle.header}>
//                    <View style={externalstyle.forBackImage}>
//                     <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
//                 <Image 
//                    style={externalstyle.backImage}
//                    source={require('../../asets/icons/Group1417.png')}/>
//                 </TouchableOpacity>
//                      </View>
//                   </View>
//           {/* header end...... */}


//     <View style={{justifyContent:'center', alignItems:'center'}}>
//     <TouchableOpacity style={Style.photo}
//     // source={userImage ? { uri: userImage } : { uri: userImage } }
//     onPress={onSelectImage}>
//             <Image
//                   style={Style.userImage}
//                   // resizeMode="contain"
//                   //onChangeText={this.handleImage}
//                   source={userImage ? { uri: userImage } : { uri: userImage } }
//                 /> 
      
//       </TouchableOpacity>
//       </View>
//       <Text style={Style.uploadImage}>Upload Profile Picture</Text>

//       <Text style={externalstyle.label}>First Name</Text>
//       <TextInput placeholder="Enter First Name" 
//       placeholderTextColor={"white"} 
//       style={externalstyle.input}
//       autoCapitalize='none'
//       onChangeText={(text)=>setFirstName(text)}
//       onChange={handleFirstNameChange} 
//       value={firstName}/>
//        <Text style={externalstyle.textValidation}>{errorFirstName}</Text>

//       <Text style={externalstyle.label}>Last Name</Text>
//       <TextInput placeholder="Enter Last Name" 
//       placeholderTextColor={"white"} 
//       style={externalstyle.input}
//       autoCapitalize='none'
//       onChangeText={(text)=>setLastName(text)}
//       onChange={handleLastNameChange} 
//       value={lastName}/>
//       <Text style={externalstyle.textValidation}>{errorLastName}</Text>
      
//       <Text style={externalstyle.label}>Mobile</Text>
//       <PhoneInput keyboardType = 'numeric' 
//       containerStyle={{width:'auto', height:50, marginHorizontal:20, marginTop:5, borderBottomColor:'white', borderBottomWidth:2, opacity:0.5,  backgroundColor:'transparent'}}
//       layout='first'
//       codeTextStyle={{color:'white'}}
//       withDarkTheme='true'
//       placeholder='Enter Mobile'
//       placeholderTextColor={"white"}
//       textContainerStyle={{placeholder:'Enter mobile', 
//       placeholderTextColor:'white', color:'white', backgroundColor:'transparent'}}
//       textInputStyle={{padding:0, color:"white",fontSize:16}} 
//       countryPickerButtonStyle={{color:'white'}}
//       flagButtonStyle={{color:'white'}}
//       style={Style.phoneInput}
//       onChangeText={(e)=>setMobile(e)} 
//       onChangeCountry={(text)=>setCountryCode(text)}
//       onChangeFormattedText={handleMobileChange}
//       value={mobile}
//       withShadow
//       />
//       <Text style={externalstyle.textValidation}>{errorMobile}</Text>
      
//       <Text style={externalstyle.label}>Gender</Text>
//       <Dropdown
//         style={Style.dropdown}
//         placeholderStyle={Style.placeholderStyle}
//         selectedTextStyle={Style.selectedTextStyle}
//         inputSearchStyle={Style.inputSearchStyle}
//         iconStyle={Style.iconStyle}
//         data={Gender}
//         search
//         maxHeight={300}
//         labelField='label1'
//         valueField='value1'
//         placeholder="Select Gender "
//         searchPlaceholder="Search here..."
//         value={value1}
//         onChangeText={(text)=>setValue1(text)}
//         onChange={(item) => {
//           setValue1(item.value1);
//           setErrorGender('');
//           setGender(value1); 
//           // {handleGenderChange}
//         }}
//       />
//       <Text style={externalstyle.textValidation}>{errorGender}</Text>

//       <Text style={externalstyle.label}>Country</Text>
//       <Dropdown
//         style={Style.dropdown}
//         placeholderStyle={Style.placeholderStyle}
//         selectedTextStyle={Style.selectedTextStyle}
//         inputSearchStyle={Style.inputSearchStyle}
//         iconStyle={Style.iconStyle}
//         data={Country}
//         search
//         maxHeight={300}
//         labelField="label2"
//         valueField="value2"
//         placeholder="Select Country "
//         searchPlaceholder="Search here..."
//         value={value2}
//         onChangeText={(text)=>setValue2(text)}
//         onChange={(item) => {
//           setValue2(item.value2);
//           setErrorCountry('');
//           setCountry(value2);
//         }}
//       />
//       <Text style={externalstyle.textValidation}>{errorCountry}</Text>

//       <Text style={externalstyle.label}>State</Text>
//       <Dropdown
//         style={Style.dropdown}
//         placeholderStyle={Style.placeholderStyle}
//         selectedTextStyle={Style.selectedTextStyle}
//         inputSearchStyle={Style.inputSearchStyle}
//         iconStyle={Style.iconStyle}
//         data={State}
//         search
//         maxHeight={300}
//         labelField="label3"
//         valueField="value3"
//         placeholder="Select State "
//         searchPlaceholder="Search here..."
//         value={value3}
//         onChangeText={(text)=>setValue3(text)}
//         onChange={(item) => {
//           setValue3(item.value3);
//           setErrorState('');
//           setState(value3);
//         }}
//       />
//       <Text style={externalstyle.textValidation}>{errorState}</Text>

//       <Text style={externalstyle.label}>City</Text>
//       <Dropdown
//         style={Style.dropdown}
//         placeholderStyle={Style.placeholderStyle}
//         selectedTextStyle={Style.selectedTextStyle}
//         inputSearchStyle={Style.inputSearchStyle}
//         iconStyle={Style.iconStyle}
//         data={City}
//         search
//         maxHeight={300}
//         labelField="label4"
//         valueField="value4"
//         placeholder="Select City "
//         searchPlaceholder="Search here..."
//         value={value4}
//         onChangeText={(text)=>setValue4(text)}
//         onChange={(item) => {
//           setValue4(item.value4);
//           setErrorCity('');
//           setCity(value4);
//         }}
//       />
//       <Text style={externalstyle.textValidation}>{errorCity}</Text>

//       <Text style={externalstyle.label}>Date of Birth</Text>
//           {!datePicker && (
//           <View>
//             <TextInput 
//             keyboardType='numeric' 
//             placeholder="dd/mm/yy" 
//             placeholderTextColor={"white"}  
//             style={externalstyle.input} 
//             value={moment(date).format('DD/MM/YYYY')}
//             />
//             <Text style={externalstyle.textValidation}>{errorDob}</Text>
//           </View>
//           )}

//         {datePicker && (
//           <DateTimePicker
//             value={date}
//             // value={moment(date).format('DD/MM/YYYY')}
//             mode={'date'}
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             is24Hour={true}
//             onChangeText={(text)=>setDate(text)}
//             onChange={onDateSelected}
//             onConfirm={(date) => {
//               // console.log(date,"ttttttttttttttttttttttt")
//               setOpen(true) 
//               setDate(moment(date).format('DD/MM/YYYY'))
//             }}
//           />
//         )}

//         <TouchableOpacity
//         onPress={showDatePicker}>
//         <Image style={Style.dateImage} 
//         source={require('../../asets/icons/calendar-week.png')}
//         />
//         </TouchableOpacity>

//         <Text style={externalstyle.label}>Address</Text>
//         <TextInput placeholder="Enter Address" 
//         placeholderTextColor={"white"} 
//         style={externalstyle.input}
//         onChangeText={(text)=>setAddress(text)}
//         onChange={handleAddressChange} 
//         value={address}/>
//         <Text style={externalstyle.textValidation}>{errorAddress}</Text>

//         <Text style={externalstyle.label}>Pincode</Text>
//         <TextInput keyboardType = 'numeric' 
//         placeholder="Enter Pincode" 
//         placeholderTextColor={"white"}  
//         style={externalstyle.input}
//         onChangeText={(text)=>setPincode(text)}
//         onChange={handlePincodeChange} 
//         value={pincode}/>
//         <Text style={externalstyle.textValidation}>{errorPincode}</Text>

//         <Text style={externalstyle.label}>Landmark</Text>
//         <TextInput placeholder="Enter Landmark" 
//         placeholderTextColor={"white"}  
//         style={externalstyle.input}
//         onChangeText={(text)=>setLandmark(text)}
//         onChange={handleLandmarkChange} 
//         value={landmark}/>
//         <Text style={externalstyle.textValidation}>{errorLandmark}</Text>

//         <Text style={externalstyle.label}>Brand</Text>
//         <Dropdown
//         style={Style.dropdown}
//         placeholderStyle={Style.placeholderStyle}
//         selectedTextStyle={Style.selectedTextStyle}
//         inputSearchStyle={Style.inputSearchStyle}
//         iconStyle={Style.iconStyle}
//         data={Brand}
//         search
//         maxHeight={300}
//         labelField="name"
//         valueField="id"
//         placeholder="Select Brand"
//         searchPlaceholder="Search here..."
//         value={value5}
//         onChange={(item) => {
//           console.log(item.id,"asjdjasgjhdasyjdjhasfdyfas")
//           setValue5(item.id);
//           setErrorBrand('');
//           setBrand(value5);
//           callApiModels(item.id)
//         }}
//       />
//       <Text style={externalstyle.textValidation}>{errorBrand}</Text>

//       <Text style={externalstyle.label}>Model</Text>
//         <Dropdown
//         style={Style.dropdown}
//         placeholderStyle={Style.placeholderStyle}
//         selectedTextStyle={Style.selectedTextStyle}
//         inputSearchStyle={Style.inputSearchStyle}
//         iconStyle={Style.iconStyle}
//         data={Model}
//         search
//         maxHeight={300}
//         labelField="name"
//         valueField="id"
//         placeholder="Select Model "
//         searchPlaceholder="Search here..."
//         value={value6}
//         onChange={(item) => {
//           setValue6(item.id);
//           setErrorModel('');
//           setModel(value6);
//         }}
//       />
//       <Text style={externalstyle.textValidation}>{errorModel}</Text>

//         <TouchableOpacity style={externalstyle.button} 
//        //onPress={()=>navigation.navigate("Next")}
//         onPress={(e)=>{Submit(e)}}>
//         <Text style={externalstyle.buttonText}>UPDATE</Text>
//       </TouchableOpacity>

//       </ScrollView>
//       </ImageBackground>
//     </View>  
//   )
// }

// const Style = StyleSheet.create({
  
//   photo:{
//     width:150,
//     height:150,
//     backgroundColor:'#2D2D2D',
//     marginTop:20,
//     // marginLeft:110,
//     borderRadius:8,
//     alignItems:'center',
//     justifyContent:'center',
//     flex:1,
//     marginVertical:30,
//     // alignSelf:'center',
//   },
//   uploadprofile:{
//     color:"white",
//     fontSize:16,
//     textAlign:"center",
//     marginTop:15,
//     marginBottom:10,
//   },
//   uploadImage:{
//     textAlign:"center",
//     fontSize:16,
//     fontWeight:"bold",
//     // marginVertical:60,
//     alignItems:'center',
//     color:'#FFFFFF',
//     opacity:0.6,
//     marginTop:-10,
//     marginBottom:10,
//   },
//   userImage:{
//     width:150,
//     height:150,
//     // marginTop:-20,
//   },
//   dropdown: {
//     // margin: 16,
//     marginHorizontal:20,
//     height:40,
//     borderBottomColor: 'white',
//     borderBottomWidth: 1,
//     marginTop:-4,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   placeholderStyle: {
//     fontSize: 15,
//     color:"white",
//     marginHorizontal:5,
//     // marginTop:-15,
//   },
//   selectedTextStyle: {
//     fontSize: 15,
//     color:"white",
//   },
//   iconStyle: {
//     width: 20,
//     height: 20, 
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   dateImage:{
//     width:20,
//     height:20,
//     // marginLeft:320,
//     marginTop:-60,
//     justifyContent:'flex-end',
//     alignItems:'flex-end',
//     alignSelf:'flex-end',
//     marginHorizontal:20,
//   },
//   placeholder:{
//     marginHorizontal:10,
//   },
//   gender:{
//     borderBottomColor:"white",
//     borderBottomWidth:5,
//     color:"white",
//  },
// })

// export default ForCreateProfile


















import React,{useEffect, useState} from "react";
import {Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, Alert, ImageBackground} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import externalstyle from '../styles/commonStyles';
import Svg, {Path, Rect, G, Circle} from 'react-native-svg';
import PhoneInput from "react-native-phone-number-input";
import { androidCameraPermission } from "../../permission.js";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import axios from "axios";

const Gender =[
  { label1: 'Male', value1: 'Male' },
  { label1: 'Female', value1: 'Female' },
]

const ForCreateProfile = ({navigation})=>{

  const [countryData, setcountryData] = useState([])
  const [stateData, setstateData] = useState([])
  const [cityData, setcityData] = useState([])

  const [Brand,setBrandArr] = useState([])
    const [Model,setModelArr] = useState([])
    const [value5, setValue5] = useState("");
    const [value6, setValue6] = useState("");

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [lable4, setLable4] = useState(null);

  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const[firstName, setFirstName] = useState('');
  const[errorFirstName, setErrorFirstName] = useState('');

  const[lastName, setLastName] = useState('');
  const[errorLastName, setErrorLastName] = useState('');

  const[mobile, setMobile] = useState('');
  const[errorMobile, setErrorMobile] = useState('');

  const[gender, setGender] = useState('')
  const[errorGender, setErrorGender] = useState('')

  const[country, setCountry] = useState('')
  const[errorCountry, setErrorCountry] = useState('')

  const[state, setState] = useState('')
  const[errorState, setErrorState] = useState('')

  const[city, setCity] = useState('')
  const[errorCity, setErrorCity] = useState('')

  const[dob, setDob] = useState('')
  const[errorDob, setErrorDob] = useState('')

  const[address, setAddress] = useState('')
  const[errorAddress, setErrorAddress] = useState('')

  const[pincode, setPincode] = useState('')
  const[errorPincode, setErrorPincode] = useState('')

  const[landmark, setLandmark] = useState('')
  const[errorLandmark, setErrorLandmark] = useState('')

  const[brand, setBrand] = useState('')
  const[errorBrand, setErrorBrand] = useState('')

  const[modell, setModel] = useState('')
  const[errorModel, setErrorModel] = useState('')

  const [userImage, setUserImage] = useState('')

  const[countryCode, setCountryCode] = useState('')

  console.log(countryCode.callingCode)
  console.log(countryCode.cca2)

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
    setUserImage(image.path)
      console.log(userImage,"image");
  });
}

const onPress = ()=>{
  onSelectImage();
  // onopenGallery();
}

useEffect(()=>{
  callApiBrands()
 },[])

const handleFirstNameChange=(e)=>{
  setErrorFirstName('');
  setFirstName(e.target.value);
  // const isValid = removeEmptySpaces(e.target.value);
}

const handleLastNameChange=(e)=>{
  setErrorLastName('');
  setLastName(e.target.value);
}

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

const handleMobileChange=(e)=>{
  setErrorMobile('');
}

function showDatePicker() {
  setDatePicker(true);
};

function onDateSelected(event, value) {
  setDate(value);
  setDatePicker(false);
  setErrorDob('');
  setDob(value);
};

// for Brand and Models api................................................................... 

const callApiBrands = async () => {
  let res = await axios.get('brands/5')
let {data} = res
if(data.status==200){
setBrandArr(data.data)
}}
const callApiModels = async (id) => {
console.log(value5,"sjkgajdg")
let res = await axios.get(`models/${id}`)
let {data} = res
if(data.status==200){
setModelArr(data.data)
} 
}; 

// Brand and Models api end here......................................

// Country state city api.................................
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

// Country state city api end here.....................

const Submit=(e)=>{
  e.preventDefault();
  // const route = useRoute();

  if(firstName!=''){
    //  check first name
  }
  else{
    setErrorFirstName('please enter first name')
  }
  if(lastName!=''){
    // check last name
  }
  else {
    setErrorLastName('please enter last name')
  }
  if(mobile!=''){
    // check mobile
  }
  else{
    setErrorMobile('please enter mobile number')
  }
  if(gender!=''){
    // check gender
  }
  else{
    setErrorGender('please select gender')
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
  if(dob!=''){
    // check date of birth
  }
  else{
    setErrorDob('please select date')
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
  if(brand!=''){
    // check brand
  }
  else{
    setErrorBrand('please select brand')
  }
  if(modell!=''){
    // check model
  }
  else{
    setErrorModel('please select model')
  }
  if(firstName!=='' && lastName!=='' && mobile!=='' && gender!=='' && country!=='' && state!=='' && city!=='' && address!=='' && pincode!=='' && landmark!=='' && brand!=='' && modell!==''){
    navigation.navigate("Profile")
  }
}
  return(
    <View style={externalstyle.container}>
      <ImageBackground 
          source={require('../../asets/icons/onbaord_bg.png')}>
        <ScrollView>
        <StatusBar hidden={true} />

          {/* header start........ */}
         <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                  </View>
          {/* header end...... */}


    <View style={{justifyContent:'center', alignItems:'center'}}>
    <TouchableOpacity style={Style.photo}
    onPress={onSelectImage}>
            <Image
                  style={Style.userImage}
                  source={userImage ? { uri: userImage } : require('../../asets/icons/profile_placeholder.png') }
                /> 
      
      </TouchableOpacity>
      </View>
      <Text style={Style.uploadImage}>Upload Profile Picture</Text>

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
      
      <Text style={externalstyle.label}>Mobile</Text>

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
      
      <Text style={externalstyle.label}>Gender</Text>
      <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
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

      <Text style={externalstyle.label}>Date of Birth</Text>
          {!datePicker && (
          <View>
            <TextInput 
            keyboardType='numeric' 
            placeholder="dd/mm/yy" 
            placeholderTextColor={"white"}  
            style={externalstyle.input} 
            value={moment(date).format('DD/MM/YYYY')}
            />
            <Text style={externalstyle.textValidation}>{errorDob}</Text>
          </View>
          )}

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

        <TouchableOpacity
        onPress={showDatePicker}>
        <Image style={Style.dateImage} 
        source={require('../../asets/icons/calendar-week.png')}
        />
        </TouchableOpacity>

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

        <Text style={externalstyle.label}>Brand</Text>
        <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
        data={Brand}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder="Select Brand"
        searchPlaceholder="Search here..."
        value={value5}
        onChange={(item) => {
          console.log(item.id,"asjdjasgjhdasyjdjhasfdyfas")
          setValue5(item.id);
          setErrorBrand('');
          setBrand(value5);
          callApiModels(item.id)
        }}
      />
      <Text style={externalstyle.textValidation}>{errorBrand}</Text>

      <Text style={externalstyle.label}>Model</Text>
        <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
        data={Model}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder="Select Model "
        searchPlaceholder="Search here..."
        value={value6}
        onChange={(item) => {
          setValue6(item.id);
          setErrorModel('');
          setModel(value6);
        }}
      />
      <Text style={externalstyle.textValidation}>{errorModel}</Text>

        <TouchableOpacity style={externalstyle.button} 
       //onPress={()=>navigation.navigate("Next")}
        onPress={(e)=>{Submit(e)}}>
        <Text style={externalstyle.buttonText}>UPDATE</Text>
      </TouchableOpacity>

      </ScrollView>
      </ImageBackground>
    </View>  
  )
}

const Style = StyleSheet.create({
  
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
  },
  dateImage:{
    width:20,
    height:20,
    // marginLeft:320,
    marginTop:-60,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'flex-end',
    marginHorizontal:20,
  },
  placeholder:{
    marginHorizontal:10,
  },
  gender:{
    borderBottomColor:"white",
    borderBottomWidth:5,
    color:"white",
 },
})

export default ForCreateProfile

