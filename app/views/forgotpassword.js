import React, { useState } from "react";
import {Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar} from "react-native";
import externalstyle from '../styles/commonStyles';

const ForgotPassword =({navigation})=> {
         const[email, setEmail] = useState('');
         const[errorEmail,setErrorEmail] = useState('');

         const handleEmailChange=(e)=>{
            setErrorEmail('');
            setEmail(e.target.value);
         }

         const Submit =(e)=>{
           e.preventDefault();

           if(email!=''){
            // check email
            // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(emailRegex.test(email)){
                setErrorEmail('')
                // return (true)
            }
            else{
                setErrorEmail('invalid email')
                // return (false)
            }
           }
           else{
            setErrorEmail('please enter email')
            // navigation.navigate("For Create Profile")
           }
         }

        return(
            <View style={externalstyle.container}>
                {/* <ScrollView> */}
                <StatusBar hidden={true} />
                <Image style={externalstyle.backgroundImage}
                  source={require('../../asets/icons/onbaord_bg.png')}/>
                  {/* header start........ */}
                  <View style={externalstyle.header}>

                <View style={externalstyle.forBackImage}>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <Image 
                style={externalstyle.backImage}
                source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                </View>

                 <View style={externalstyle.headerText}>
                {/* <Text style={externalstyle.Headertitle}>Forgot Password</Text> */}
                 </View>
                  </View>
                  {/* header end...... */}

                  <Text style={{textAlign:'center', color:'white', fontSize:18, marginTop:20, marginBottom:20,fontWeight:'bold'}}>Forgot Password</Text>

                <Image
                   style={Style.logo}
                    source ={require('../../asets/icons/forgot-password.png')}
                    />

                    <Text style={Style.forgot}>Forgot Password?</Text>
                    <Text style={Style.enteryour}>Enter your registered email address we will send to link to reset your password</Text>

                    <Text style={externalstyle.label}>Email</Text>
                    <TextInput placeholder="Enter Email Address" 
                    placeholderTextColor={"white"} 
                    style={externalstyle.input}
                    onChange={handleEmailChange} 
                    value={email}/>
                    <Text style={externalstyle.textValidation}>{errorEmail}</Text>

                    <TouchableOpacity style={externalstyle.buttonSecond}
                    // onPress={()=>navigation.navigate("Formik")}
                     onPress={(e)=>{Submit(e)}}>
                    <Text style={externalstyle.buttonText}>SEND</Text>
                    </TouchableOpacity>


                {/* </ScrollView> */}
                
            </View>
        )
}

const Style = StyleSheet.create({
    logo:{
        width:150,
        height:150,
        marginVertical:20,
        alignSelf:'center',
        justifyContent:'center',
    },
    forgot:{
        color:"white", 
        fontSize:20,
        textAlign:"center",   
        fontWeight:"bold",
    },
    enteryour:{
        color:"white",
        marginTop:15,
        fontSize:16,
        textAlign:"center",
        marginHorizontal:20,
        lineHeight:25,
        marginBottom:20,
    },
    
})

export default ForgotPassword