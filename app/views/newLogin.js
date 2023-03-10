import React, {Component} from "react";
import {Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView} from "react-native";

class Login extends Component{
    render(){
  return(
    <View style={Style.container}>
      <ScrollView>
      <Image style={Style.backgroundImage}
        source={require('../../asets/icons/travel-splash23.png')}/>
      <Image
      style={Style.logo}
      source ={require('../../asets/icons/RAB-logo1.png')}
      />

       <Text style={Style.email}>Email</Text>
      <TextInput placeholder="Enter Email Address" placeholderTextColor={"white"}  style={Style.input}/>
       
      <Text style={Style.password}>Password</Text>
      <TextInput secureTextEntry={true} placeholder="Enter Password" placeholderTextColor={"white"} style={Style.input2}/>

      <Image 
      style={Style.showPasswordImage}
      source={require('../../asets/icons/eye-fill.png')}/>

      <TouchableOpacity
      onPress={()=>this.props.navigation.navigate("Forgot Password")}>
        <Text style={Style.forgotpassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Style.forlogin}
      onPress={()=>this.props.navigation.navigate("BottomTab")}>
        <Text style={Style.login}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>this.props.navigation.navigate("SignUp")}>
        <Text style={Style.signup}>Don't have an Account? </Text>
        <Text style={Style.forsignup}> SIGNUP </Text>

        </TouchableOpacity>
        
      </ScrollView>
    </View>
  )
}
}

const Style = StyleSheet.create({
  container:{
    backgroundColor:"black"
  },
  logo:{
    width:200,
    height:100,
    marginVertical:100,
    // alignItems:"center"
    marginHorizontal:80,
  },
  input:{
    marginHorizontal:20,
    borderBottomWidth:2,
    borderBottomColor:"white",
    fontSize:20,
    color:"white",
    // marginTop:20,
    // placeholder:"something"
  },
  input2:{
    marginHorizontal:20,
    borderBottomWidth:2,
    borderBottomColor:"white",
    fontSize:20,
    // marginTop:20,
    color:"white",
  },
  email:{
    marginHorizontal:25,
    fontSize:16,
    color:"white",
  }, 
  password:{
    marginHorizontal:25,
    fontSize:16,
    marginTop:50,
    color:"white",
  },
  forgotpassword:{
    marginTop:30,
    fontSize:20,
    fontWeight:"bold",
    marginLeft:180,
    color:"white",
  },
  forlogin:{
    backgroundColor:"#ee003d",
    marginHorizontal:30,
    marginTop:50,
    height:55,
    borderRadius:8,
  },
  login:{
    color:"white",
    fontSize:18,
    textAlign:"center",
    marginTop:15,
    fontWeight:"bold",
  },
  signup:{
    fontSize:20,
    marginTop:35,
    // textAlign:"center",
    // marginVertical:60,
    color:"white",
    marginLeft:40,
  },
  showPasswordImage:{
    width:30,
    height:20,
    marginLeft:310,
    marginTop:-30,
  },
  forsignup:{
    color:"white",
    fontSize:20,
    marginLeft:250,
    marginTop:-27,
    marginVertical:50,
    color:"#de507a",
    fontWeight:"bold",
  },
  backgroundImage:{
    position:"absolute",
    width:400,
    height:850,
  },
  

})

export default Login