import React, {Component} from "react";
import {Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, ImageBackground} from "react-native";
import externalstyle from '../styles/commonStyles';

class ContactUs extends Component{
  constructor(){  
    super();  
    this.state={  
    isVisible : true, 
    name:"",
    email:"",
    message:"",
    errorname:"",
    erroremail:"", 
    errormessage:"",
   }  
 }  

 submit = ()=>{
  if(this.state.name.length<1){
    this.setState({errorname:"please enter name"})
  }
  else{
    this.setState({errorname:""})
  }
  if(this.state.email.length<1){
    this.setState({erroremail:"please enter mail"})
  }
  else{
    this.setState({erroremail:""})
  }
  if(this.state.message.length<1){
    this.setState({errormessage:"please write message"})
  }
  else{
    this.setState({errormessage:""})
  }

 }
 
    render(){
  return(
    <View style={externalstyle.container}>
      <ImageBackground 
      style={{flex:1}}
          source={require('../../asets/icons/onbaord_bg.png')}>
        <StatusBar hidden={true} />
          <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("BottomTab")}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                     <View style={externalstyle.headerText}>
                     <Text style={externalstyle.Headertitle}>Contact Us</Text>
                      </View>
                  </View>
                  {/* header end...... */}

                  {/* <Text style={{textAlign:'center', color:'white', fontSize:18, marginTop:20, marginBottom:20,fontWeight:'bold'}}>Contact Us</Text> */}

    <Text style={Style.lorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>

    <Text style={externalstyle.label}>Name</Text>
      <TextInput 
      placeholder="Enter First Name" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      value={this.state.name}
      onChangeText={(name)=>this.setState({name})}/>
      <Text style={externalstyle.textValidation}>{this.state.errorname}</Text>

      <Text style={externalstyle.label}>Email</Text>
      <TextInput 
      placeholder="Enter Email" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      value={this.state.email}
      onChangeText={(email)=>this.setState({email})}/>
      <Text style={externalstyle.textValidation}>{this.state.erroremail}</Text>

      <Text style={externalstyle.label}>Message</Text>
      <TextInput 
      placeholder="Enter Message Here" 
      placeholderTextColor={"white"}  
      style={externalstyle.input}
      value={this.state.message}
      onChangeText={(message)=>this.setState({message})}/>
      <Text style={externalstyle.textValidation}>{this.state.errormessage}</Text>

      <TouchableOpacity style={externalstyle.buttonSecond}
       onPress={()=>{this.submit()}}>
        <Text style={externalstyle.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View> 
  )
}
}

const Style = StyleSheet.create({
    lorem:{
        color:"white",
        marginTop:30,
        fontSize:16,
        textAlign:"center",
        marginHorizontal:20,
        lineHeight:20,
        marginBottom:10,
    },

})


export default ContactUs
