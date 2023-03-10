import React, {useEffect, useState} from "react";
import {Text,Alert, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, Platform, ImageBackground, Checkbox} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-checkbox';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from 'react-native-image-crop-picker'
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import externalstyle from '../styles/commonStyles';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import Signup, {firstName, lastName, email, password, confirmPassword, mobile} from "./signup";
import { androidCameraPermission } from "../../permission.js";
import {setToken,readName,setData,readData,setValue,readValue} from '../utilities/storage';
import CustomLoader from './customLoader';
import Axios from 'axios'
import axios from "axios";
// import CheckBox from '@react-native-community/checkbox';




const CreateProfile =(props)=>{
   
  // const mobile_no = route.params.mobile
  // console.log(mobile_no)
  
    const [Brand,setBrandArr] = useState([])
    const [Model,setModelArr] = useState([])
    const [valueB, setValueB] = useState("");
    const [valueM, setValueM] = useState(null);

    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    // for validation.........
    const[brand, setBrand] = useState('')
    const[errorBrand, setErrorBrand] = useState('')

    const[modell, setModel] = useState('')
    const[errorModel, setErrorModel] = useState('')

    const[registration, setRegistration] = useState('')
    const[errorRegistration, setErrorRegistration] = useState('')

    const[location, setLocation] = useState('')
    const[errorLocation, setErrorLocation] = useState('')

    const[drivingAreaRadius, setDrivingAreaRadius] = useState('')
    const[errorDrivingAreaRadius, setErrorDrivingAreaRadius] = useState('')

    const[licenseNumber, setLicenseNumber] = useState('')
    const[errorLicenseNumber, setErrorLicenseNumber] = useState('')

    const[licenseExpiryDate, setLicenseExpiryDate] = useState('')
    const[errorLicenceExpiryDate, setErrorLicenceExpiryDate] = useState('')

    const[locationName, setLocationName] = useState('')
    const [isfrontCardImage, setIsVistingCardImage] = useState(false)
    const [imageObjfrontCard, setImageObjfrontCard] = useState('')
    const [imageObjbackCard, setImageObjbackCard] = useState('')
    const [imagefrontCard, setImagefrontCard] = useState('')
    const [imagebackCard, setImagebackCard] = useState('')
    const [preFormData,setPreformData]=useState({});
    const [showLoader, setshowLoader] = useState(false)

    // const [agree, setAgree] = useState(false)

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    
    const route = useRoute();

    // const number = route.params.mobile
    // console.log(number, "this is number.............")

    const [userImage, setUserImage] = useState('')
    const [imageObj, setImageObj] = useState('')

    const [value3,setValue3]=useState(route.params.value3);


    const[image, openCamera] = useState('');
    const[images, openGallery] = useState(''); 



   useEffect(()=>{
    callApiBrands()
    readValue('loc').then(res => {
      console.log(res, "yyyyyLOC");
      setLocationName(res)
    })
   },[])

   useEffect(()=>{
   setPreformData(props.route.params.preFormData);
   },[])


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
       //cropping: true,
     }).then(image => {
       //setImageObj(image)
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
    
      if (isfrontCardImage) {
        setImageObjbackCard(user_image)
        setImagebackCard(image.path)
        //console.log(userImage,"image");
      } else if (!isfrontCardImage){   
        setImageObjfrontCard(user_image)
        setImagefrontCard(image.path)
      }
     });
   };
 
 const onGallery =()=>{
  console.log(isfrontCardImage);
   ImagePicker.openPicker({
     width: 300,
     height: 400,
     //cropping: true
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
    if (isfrontCardImage) {
      setImageObjbackCard(user_image)
      setImagebackCard(image.path)
      //console.log(userImage,"image");
    } else if (!isfrontCardImage){   
      setImageObjfrontCard(user_image)
      setImagefrontCard(image.path)
    }
   });
 }
 
 const onPress = ()=>{
   onSelectImage();
   // onopenGallery();
 }

  const callApiBrands = async () => {
  
    let res = await axios.get('brands/5')
    let { data } = res
    console.log(data, "dattttttBrand");
    if (data.status == 200) {
      setBrandArr(data.data)
    }
  }

  const callApiModels = async (id) => {
    console.log(valueB, "sjkgajdg")
    let res = await axios.get(`models/${id}`)
    let { data } = res
    console.log(data, "dattttttModels");
    if (data.status == 200) {
      setModelArr(data.data)
    }
  };   

 function showDatePicker() {
      setDatePicker(true);
    };
  
    function onDateSelected(event, value) {
      setDate(value);
      setDatePicker(false);
      setErrorLicenceExpiryDate('');
      setLicenseExpiryDate(e.target.value)
      
    }; 

    const handleRegistrationNumberChange =(e)=>{
      setErrorRegistration('');
      setRegistration(e.target.value);
    }

    const handleLocationChange =(e)=>{
      setErrorLocation('');
      setLocation(e.target.value);
    }

    const handleDrivingAreaRadiusChange =(e)=>{
      setErrorDrivingAreaRadius('');
      setDrivingAreaRadius(e.target.value);
    }

    const handleLicenseNumberChange =(e)=>{
      setErrorLicenseNumber('');
      setLicenseNumber(e.target.value);
    }

    const Submit = () => {
      
      setshowLoader(true)
      console.log(showLoader,"...inn......");
      const {value1,country,state, date, value2, value3, value4, address, pincode, landmark,firstName, lastName, email, password, confirmPassword, mobile, countryCode, lable4,profileImage } = preFormData;
      
      const {dataLoc,locationLat,locationLng}=props.route.params;
      // console.log(value1, date, value2, value3, value4, address, pincode, landmark,firstName, lastName, email, password, confirmPassword, mobile, countryCode,lable4,"submit function")
      console.log(locationLat,locationLng,"location on submit")
      // setshowLoader(true)
      var formdata = new FormData();
      //===================== Personal Details ================////////  
      formdata.append("first_name", firstName);
      formdata.append("last_name", lastName);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("country_iso", countryCode?.cca2 ? countryCode.cca2 : 'IN');
      formdata.append("country_code", countryCode?.callingCode ? `+${countryCode?.callingCode.toString()}` : '+91');
      formdata.append("mobile_no", mobile);
      formdata.append("gender", value1);
      formdata.append("dob", moment(route.params.date).format('DD/MM/YYYY'));
      formdata.append("country", country);
      formdata.append("state", state);
      formdata.append("city", lable4);
      formdata.append("device_type", Platform.OS === 'android' ? 'Android' : Platform.OS === 'ios' ? 'Ios' : null );
      formdata.append("address", address);
      formdata.append("pin_code", pincode);
      formdata.append("landmark", landmark);
      formdata.append("brand_id", valueB);
      formdata.append("model_id", valueM);
      formdata.append("registration_no", registration);
      formdata.append("location", dataLoc);
      formdata.append("latitude",locationLat);
      formdata.append("longitude", locationLng);
      formdata.append("driving_area_radius", drivingAreaRadius);
      formdata.append("license_no", licenseNumber);
      formdata.append("license_expiry_date",  "03-02-2023");
      formdata.append("image",  {
        uri: profileImage.uri,
        type: 'image/jpeg',
        name: profileImage.name
      });
      formdata.append("license_fornt_image",  {
        uri: imageObjfrontCard.uri,
        type: 'image/jpeg',
        name: imageObjfrontCard.name
      });
      formdata.append("license_back_image",  {
        uri: imageObjbackCard.uri,
        type: 'image/jpeg',
        name: imageObjbackCard.name
      });
     
      console.log((formdata), "formdata===>");
      console.log(showLoader,"...inn......");
      fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/signup', {
        method: 'POST',
        headers: {
          'Host': 'admin.tripperpedia.in',
          'Content-Type': 'multipart/form-data',
          'Content-Length': '703686',
        },
    body: formdata
  })
      .then((response) => response.json()).then((responseData) => {
    console.log("signUp", responseData);
    
    if (responseData && responseData.status == 200) {
      let number = mobile
      console.log(number,"numbernumber");
      props.navigation.navigate("VerifyOtp",{number})
     // alert(responseData.message)
     setshowLoader(false)
    }else{
      setshowLoader(false)
      alert(responseData.message)
    }
  }).catch(err => {
    alert(err)
  })
    }

    // const Submit =async(e)=>{
    //   e.preventDefault();
    //   const {value1, date, value2, value3, value4, address, pincode, landmark } = route.params
    //   const {firstName, lastName, email, password, confirmPassword, mobile, countryCode} = route.params

    //   console.log(valueB,valueM,value1, value2,"submit function")

    //   // if(brand!=''){
    //   //   // check brand
    //   // }
    //   // else{
    //   //   setErrorBrand('please select brand')
    //   // }
    //   // if(modell!=''){
    //   //   // check model
    //   // }
    //   // else{
    //   //   setErrorModel('please select model')
    //   // }
    //   // if(registration!=''){
    //   //   // check registration
    //   // }
    //   // else{
    //   //   setErrorRegistration('please enter registration number')
    //   // }
    //   // if(location!=''){
    //   //   // check location
    //   // }
    //   // else{
    //   //   setErrorLocation('please enter location')
    //   // }
    //   // if(drivingAreaRadius!=''){
    //   //   // check radius
    //   // }
    //   // else{
    //   //   setErrorDrivingAreaRadius('please enter driving area radius')
    //   // }
    //   // if(licenseNumber!=''){
    //   //   // check license number
    //   // }
    //   // else{
    //   //   setErrorLicenseNumber('please enter license number')
    //   // }
    //   // if(licenseExpiryDate!=''){
    //   //   // check license expiry date
    //   // }
    //   // else{
    //   //   setErrorLicenceExpiryDate('please select date')
    //   // }
    //   // if(brand!=='' && modell!=='' && registration!=='' && location!=='' && drivingAreaRadius!=='' && licenseNumber!==''){
    //   //   navigation.navigate("Verify", {firstName, lastName, email, password, confirmPassword, countryCode, mobile, value1, value2, registration, location, drivingAreaRadius, licenseNumber, date})
    //   // }

    // //  console.log(countryCode)
    
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       first_name: firstName,
    //       last_name: lastName,
    //       email: email,
    //       password: password, 
    //       country_iso:countryCode.cca2, 
    //       country_code:countryCode?.callingCode[0], 
    //       mobile_no: mobile, 
    //       gender: value1, 
    //       dob: moment(route.params.date).format('DD/MM/YYYY'), 
    //       country: value2, 
    //       state: value3, 
    //       city:value4, 
    //       device_type: Platform.OS, 
    //       address:address, 
    //       pin_code:pincode, 
    //       landmark:landmark, 
    //       brand_id: valueB, 
    //       model_id: valueM, 
    //       registration_no:registration, 
    //       location: location,
    //       latitude:"30.733315",
    //       longitude:"77.1891761", 
    //       driving_area_radius:drivingAreaRadius, 
    //       license_no: licenseNumber, 
    //       license_expiry_date: "03-02-2023", 
    //       license_fornt_image:"Certificate-Sample-123.png", 
    //       license_back_image:"Certificate-Sample-123.png",
    //       image: "Certificate-Sample-123.png"
    //      })
    //   };

    //   console.log(requestOptions,"KKKKK")
    //   // const postExample = async () => {
    //     try {
    //        const response = await fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/signup', requestOptions);
    //        const data = await response.json();
    //        console.log(response,"data");
    //        //console.log("this is mobile number",mobile)
    //        if(data && data.status == 200){
    //         console.log("Data submited",data)
    //         navigation.navigate("VerifyOtp",{mobile_no: mobile})
    //        }
    //        else{
    //         console.log()
    //        }              
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }

        
        

    // }
    // formdata.append("device_type", Platform.OS === 'android' ? 'Android' : Platform.OS === 'ios' ? 'Ios' : null );
    // Platform.OS === 'android' ?
    //           'Device is IOS':
    //           'Device is Android'


              // console.log(platform.OS)
              

  const onPlaceChosen = (params) => {
    // here is your callback function
  }
    const {showPickerModal} = useState 
    const {dataLoc,locationLat,locationLng} = route.params
    console.log(dataLoc,locationLat,locationLng,"locationL route"); 
   
    return(
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
                    <TouchableOpacity onPress={() => {
                  props.navigation.goBack();
                }}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                  </View>
                  {/* header end...... */}
                <Text style={Style.addTexidriver}>Add Taxi driver business detail</Text>

                <Text style={externalstyle.label}>Brand</Text>
            <Dropdown
        style={Style.dropdown}
        placeholderStyle={Style.placeholderStyle}
        selectedTextStyle={Style.selectedTextStyle}
        inputSearchStyle={Style.inputSearchStyle}
        iconStyle={Style.iconStyle}
        itemTextStyle={{color:'grey'}}
        data={Brand}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder="Select Brand"
        searchPlaceholder="Search here..."
        value={valueB}
        onChange={(item) => {
          console.log(item.id,"asjdjasgjhdasyjdjhasfdyfas")
          setValueB(item.id);
          setErrorBrand('');
          setBrand(valueB);
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
        itemTextStyle={{color:'grey'}}
        data={Model}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder="Select Model "
        searchPlaceholder="Search here..."
        value={valueM}
        onChange={(item) => {
          setValueM(item.id);
          setErrorModel('');
          setModel(valueM);
        }}
      />
      <Text style={externalstyle.textValidation}>{errorModel}</Text>
      
      <Text style={externalstyle.label}>Registration Number</Text>
      <TextInput placeholder="Enter Number" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      onChangeText={(text)=>setRegistration(text)}
      onChange={handleRegistrationNumberChange} 
      value={registration}/>
      <Text style={externalstyle.textValidation}>{errorRegistration}</Text>

      <Text style={externalstyle.label}>Location</Text>
      <TextInput placeholder="Enter Location" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      // onChangeText={(text)=>setLocation(text)}
      // onChange={handleLocationChange} 
      value={dataLoc != 'Enter Location' ? dataLoc : 'Noida'}/>
      <Text style={externalstyle.textValidation}>{errorLocation}</Text>

      <TouchableOpacity
        onPress={()=>props.navigation.navigate("Location Map", {onPlaceChosen,preFormData})}>
        <Image style={Style.pinImage} 
        source={require('../../asets/icons/pin.png')}
        />
      </TouchableOpacity>

      <Text style={externalstyle.label}>Driving Area Radius(KM)</Text>
      <TextInput placeholder="Enter Radius" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      onChangeText={(text)=>setDrivingAreaRadius(text)}
      onChange={handleDrivingAreaRadiusChange} 
      value={drivingAreaRadius}/>
       <Text style={externalstyle.textValidation}>{errorDrivingAreaRadius}</Text>

      <Text style={externalstyle.label}>License Number</Text>
      <TextInput keyboardType="numeric" 
      placeholder="Enter Number" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      onChangeText={(text)=>setLicenseNumber(text)}
      onChange={handleLicenseNumberChange} 
      value={licenseNumber}/>
      <Text style={externalstyle.textValidation}>{errorLicenseNumber}</Text>

      <Text style={externalstyle.label}>License Expiry Date</Text>
      
      
         <View style={[externalstyle.input,{flexDirection: 'row'}]}>
         <TextInput keyboardType='numeric' placeholder="dd/mm/yy" placeholderTextColor={"white"}  style={[externalstyle.input,{borderBottomWidth:0,marginTop: 5, marginHorizontal:0,}]} 
         value={moment(date).format('DD/MM/YYYY')}
         />
         <TouchableOpacity style={{alignSelf: 'center', marginLeft: 'auto'}}
           onPress={showDatePicker}>
           <Image style={[Style.dateImage,{
            // marginLeft: 'auto',marginRight: - 30
            justifyContent:'flex-end',
            alignItems:'flex-end',
            alignSelf:'flex-end',
          }]}
             source={require('../../asets/icons/calendar-week.png')}
           />
         </TouchableOpacity>
       </View>
       <Text style={externalstyle.textValidation}>{errorLicenceExpiryDate}</Text>
        
        

      {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            onChangeText={(text)=>setDate(text)}
            onConfirm={(date) => {
              setOpen(true) 
              setDate(moment(date).format('DD/MM/YYYY'))
            }}
          />
        )}

        {/* <TouchableOpacity
        onPress={showDatePicker}>
        <Image style={Style.dateImage} 
        source={require('../../asets/icons/calendar-week.png')}
        />
          </TouchableOpacity>   */}

                <Text style={externalstyle.label}>Licence Images</Text>
                
                <View style={{justifyContent:'center', alignItems:'center'}}>
                 <TouchableOpacity style={Style.photo}
                 onPress={()=>{onSelectImage(),setIsVistingCardImage(true)}}>
                  <Image style={imagefrontCard ?  [Style.photo,{marginTop:0}] : {width: 50, height: 50}}
                  // onPress={onPress}
                  // source={require('../../asets/icons/uploadalt.png')}

                  resizeMode='cover'
                  source={imagefrontCard ? { uri: imagefrontCard } : require('../../asets/icons/uploadalt.png') }
                  />

                
                </TouchableOpacity>
                <Text style={Style.uploadImage}>Upload Your Licence Front here</Text>
                </View>
            
                {/* <Text style={externalstyle.textValidation}>{errorLicenceExpiryDate}</Text> */}
                <View style={{justifyContent:'center', alignItems:'center'}}>
                 <TouchableOpacity style={Style.photo}
                 onPress={()=>{onSelectImage(),setIsVistingCardImage(false)}}>
                {/* // onPress={()=>{onSelectImage,setIsVistingCardImage(true)}}> */}
                {/* onPress={{onSelectImage}}> */}
                 
                  <Image style={imagebackCard ? [Style.photo,{marginTop:0}] : {width: 50, height: 50}}
                  // onPress={onPress}
                  // source={require('../../asets/icons/uploadalt.png')}

                  resizeMode='cover'
                  source={imagebackCard ? { uri: imagebackCard } : require('../../asets/icons/uploadalt.png') }
                  />  

               
                </TouchableOpacity>
                <Text style={Style.uploadImage}>Upload Your Licence Back here</Text>
                </View>

                {/* <Text style={externalstyle.label}>Licence Back Image</Text>
                <TouchableOpacity style={Style.photo}>
                  <Image style={Style.upload}
                  resizeMode="contain"
                  source={require('../../asets/icons/uploadalt.png')}/>

                <Text style={Style.uploadImage}>Upload Your Licence here</Text>
                </TouchableOpacity> */}
                {/* <Text style={externalstyle.textValidation}>{errorLicenceExpiryDate}</Text> */}


                <CheckBox
                // value={agree}
                // onValueChange={()=> setAgree(!agree)}
                 checkboxStyle={externalstyle.checkbox}
                 labelStyle={externalstyle.check}
                 label='I agree to the Term & Services and Privacy Policy'
                 onChange={(checked) => console.log('I am checked', checked)}
                //  color={agree ? '#000' : undefined}
              //     style={[{color : agree ? '#000' : undefined}
              // ]}

              disabled = {false}
              value = {toggleCheckBox}
              onValueChange={(n)=>setToggleCheckBox(n)}
                />

                {/* <CheckBox
                   value={isSelected}
                   onValueChange={setSelection}
                     style={Style.checkbox}
                     label='I agree to the Term & Services and Privacy Policy'
                   /> */}
               {/* <Text style={Style.label}>'I agree to the Term & Services and Privacy Policy'</Text> */}

                <TouchableOpacity style={[
                  externalstyle.button, 
                {
                   backgroundColor: toggleCheckBox ? "#ee003d" : "#ee003d",
                }
              ]}
                 disabled={false}
                // onPress={()=>navigation.navigate("Verify")}
                onPress={(e)=>{Submit(e)}}>
                <Text style={externalstyle.buttonText}>SUBMIT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                onPress={()=>props.navigation.navigate("Login")}>
                <Text style={externalstyle.login}>Already have an Account? <Text style={{color:"#ff4082", fontWeight:'bold'}}>LOGIN</Text></Text>
                {/* <Text style={externalstyle.forlogin}> LOGIN </Text> */}
                </TouchableOpacity>


            </ScrollView>
            <CustomLoader showLoader={showLoader}/>
            </ImageBackground>
            </View>
        )
   }

const Style = StyleSheet.create({
    photo:{
        width:330,
        height:150,
        backgroundColor: '#282D3D',
        marginTop:20,
        borderRadius:8,
        // marginHorizontal:15,
        borderColor: '#515870',
        borderWidth:2,
        borderStyle:"dashed",
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        
    },
    uploadImage:{
        textAlign:"center",
        fontSize:16,
        fontWeight:"bold",
        marginTop:20,
        color:"white",
    },
    addTexidriver:{
        color:"white", 
        fontSize:18,
        textAlign:"center",   
        fontWeight:"bold",
        marginTop:10,
        marginBottom:20,
    },
    dropdown: {
        // margin: 16,
        marginHorizontal:20,
        height: 40,
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
      },
      selectedTextStyle: {
        fontSize: 16,
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
    upload:{
      width:280,
      height:50,
      marginTop:40,
      // marginLeft:140,
    },
    backgroundImage:{
      position:"absolute",
      width:400,
      height:1750,
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
    pinImage:{
      width:20,
      height:35,
      marginTop:-60,
      justifyContent:'flex-end',
      alignItems:'flex-end',
      alignSelf:'flex-end',
      marginHorizontal:20,
    },
    label: {
      // margin: 8,
      color:"white",
        marginTop:40,
        borderColor:'white', 
    },
    // checkbox:{
    //   marginTop:40,
    //   borderRadius:5,
    //   marginLeft:15,
    //   borderColor:'white',
    //   color:'white',
    // }
})

export default CreateProfile









































































































