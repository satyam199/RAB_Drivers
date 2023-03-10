import React, {Component} from "react";
import {Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, Alert} from "react-native";
import { number } from "yup";
import externalstyle from '../styles/commonStyles';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

class VerifyMobile extends Component{
    constructor(){  
        super();  
        this.state={  
        isVisible : true, 
        mobile:"",
        errormobile:"", 
       }  
     } 

     redirectOTP = async (mobile_no,country_code,country_iso) => {
        const { route } = this.props
        const {number,CountryIso,CountryCode} = route.params
        console.log(number,"mmmnnnnnnnnnnnpppp")
        console.log(CountryIso, "this is country iso")
        console.log(CountryCode, "rhis is country code")
        console.log("hellooooo")
        console.log('hiiiii')
        var details = { 'old_mobile_no' :  number, 'country_iso' : CountryIso, 'country_code' : CountryCode ,'new_mobile_no': number }
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
     
        formBody = formBody.join("&");
        const requestOptions = {
          method: 'POST',
          headers: {  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: formBody
        };
        console.log(requestOptions)
        // const postExample = async () => {
          try {
             const response = await fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/update/mobile_no', requestOptions);
             const data = await response.json();
            //  const data= JSON.stringify(response);
            console.log(data)
            if (data && data.status == 200) {
              //Toast.showWithGravity(data.message, Toast.LONG, Toast.CENTER);
              console.log(number,"numbernumber");
              this.props.navigation.navigate("VerifyOtp",{number})
              
            }
            else {
              console.log("hiiiiiii", data)
              console.log("hello",data.status)
            }
          }
          catch (error) {
              console.error(error);
          }
      }
     
      submit = ()=>{
        if(this.state.mobile.length<1){
          this.setState({errormobile:"please enter mobile number"})
        }
        else if(this.state.mobile.length<10){
          this.setState({errormobile:"mobile number only 10 digits"})
        }
        else if(this.state.mobile.length>10){
            this.setState({errormobile:"mobile number only 10 digits"})
          }
        else{
          this.setState({errormobile:""})
          this.redirectOTP()
        }
      }
     
    render(){

        return(
            <View style={Style.container}>
                {/* <ScrollView> */}
                <StatusBar hidden={true} />
                <ImageBackground 
                  source={require('../../asets/icons/onbaord_bg.png')}>
                   {/* header start........ */}
                   <View style={Style.header}>
                   <View style={Style.forBackImage}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                <Image 
                   style={Style.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                     <View style={Style.headerText}>
                     {/* <Text style={Style.Headertitle}>Verify Mobile</Text> */}
                      </View>
                  </View>
                  {/* header end...... */}
                  <Text style={{textAlign:'center', color:'white', fontSize:18, marginTop:20, marginBottom:20,fontWeight:'bold'}}>Verify Mobile</Text>
                <Image
                   style={Style.logo}
                    source ={require('../../asets/icons/RAB-logo1.png')}/>

                    <Text style={Style.verify}>Verify Mobile Number</Text>
                    <Text style={Style.lorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>

                    <Text style={externalstyle.label}>Phone Number</Text>
                    <TextInput keyboardType = 'numeric' placeholder="Enter Phone Number" placeholderTextColor={"white"}  style={externalstyle.input}
                    value={this.state.mobile}
                    onChangeText={(mobile)=>this.setState({mobile})}/>
                    <Text style={externalstyle.textValidation}>{this.state.errormobile}</Text>

                    <TouchableOpacity style={externalstyle.button}
                    // onPress={()=>this.props.navigation.navigate("VerifyOtp")} 
                    onPress={()=>this.submit()}>
                    <Text style={externalstyle.buttonText}>SEND OTP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Style.buttonSecond}
                    // onPress={()=>this.props.navigation.navigate("VerifyOtp")} 
                    onPress={()=>this.submit()}>
                    <Text style={externalstyle.buttonText}>RESEND</Text>
                    </TouchableOpacity>
                    </ImageBackground>
                {/* </ScrollView> */}
                
                
            </View>
        )
    }
  }

const Style = StyleSheet.create({
    container:{
        backgroundColor:"black"
    },
    logo:{
        width:240,
        height:128,
        marginVertical:30,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        // marginHorizontal:70,
    },
    verify:{
        color:"white", 
        fontSize:22,
        textAlign:"center",   
        fontWeight:"bold",
        marginTop:10,
    },
    lorem:{
        color:"white",
        marginTop:15,
        fontSize:16,
        textAlign:"center",
        marginHorizontal:20,
        marginBottom:30,
    },
    // for Header styling.....
    header:{
        width:"100%",
        height:50,
        borderBottomColor:"ghostwhite",
        borderBottomWidth:0.5,
    },
    forBackImage:{
        width:80,
        height:70,
    },
    backImage:{
        width:20,
        height:20,
        marginTop:15,
        marginLeft:20,
    },
    headerText:{
        width:200,
        height:70,
        marginLeft:80,
        marginTop:-70,
        // backgroundColor:"pink",
    },
    Headertitle:{
        color:"white",
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center",
        // backgroundColor:"pink",
        marginTop:15,
    },
    buttonSecond:{
        backgroundColor:"#ee003d",
        marginHorizontal:20,
        marginTop:10,
        height:50,
        borderRadius:8,
        marginBottom:100,
    }
    // header styling end here.....
})

export default VerifyMobile