import React, { Component } from 'react';  
import { Platform, StyleSheet, View, Text, ScrollView, TextInput,   
Image, TouchableOpacity, Alert } from 'react-native'; 

export default class Myapp extends Component
{  
  constructor(){  
    super();  
    this.state={  
    isVisible : true,  
   }  
 }  
  Hide_Splash_Screen=()=>{  
   this.setState({   
     isVisible : false   
   });  
 }  
  
 componentDidMount(){  
   var that = this;  
   setTimeout(function(){  
     that.Hide_Splash_Screen();  
   }, 3000);  
  }  
  
   render()  
   {  
       let Splash_Screen = (  
            <View style={styles.SplashScreen_RootView}> 
            <Image 
           style={styles.backgroundImage}
           source={require('../../asets/icons/travel-splash23.png')}/> 
                <View style={styles.SplashScreen_ChildView}>  
                   <Image 
               style={styles.image}
               source={require('../../asets/icons/RAB-logo1.png')}/>
               </View>  
            </View> )  

     return(  
            <View style = { styles.MainContainer }>  
               <ScrollView>
     <Image style={styles.backgroundImage}
       source={require('../../asets/icons/travel-splash23.png')}/>
     <Image
     style={styles.logo}
     source ={require('../../asets/icons/RAB-logo1.png')}
     />

      <Text style={styles.email}>Email</Text>
     <TextInput placeholder="Enter Email Address" placeholderTextColor={"white"}  style={styles.input}/>
      
     <Text style={styles.password}>Password</Text>
     <TextInput secureTextEntry={true} placeholder="Enter Password" placeholderTextColor={"white"} style={styles.input2}/>

     <Image 
     style={styles.showPasswordImage}
     source={require('../../asets/icons/eye-fill.png')}/>

     <TouchableOpacity
     onPress={()=>this.props.navigation.navigate("Forgot Password")}>
       <Text style={styles.forgotpassword}>Forgot Password?</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.forlogin}
     onPress={()=>this.props.navigation.navigate("BottomTab")}>
       <Text style={styles.login}>LOGIN</Text>
     </TouchableOpacity>

     <TouchableOpacity
     onPress={()=>this.props.navigation.navigate("SignUp")}>
       <Text style={styles.signup}>Don't have an Account? </Text>
       <Text style={styles.forsignup}> SIGNUP </Text>

       </TouchableOpacity>
                {  
                 (this.state.isVisible === true) ? Splash_Screen : null  
               }  
                </ScrollView>
           </View>  
             );  
   }  
}  
const styles = StyleSheet.create(  
{  
   MainContainer:  
   {  
       flex: 1,  
       justifyContent: 'center',  
       alignItems: 'center',  
       paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
   },  
  
   SplashScreen_RootView:  
   {  
       justifyContent: 'center',  
       flex:1,  
       margin: 10,  
       position: 'absolute',  
       width: '100%',  
       height: '100%',  
     },  
  
   SplashScreen_ChildView:  
   {  
       justifyContent: 'center',  
       alignItems: 'center',  
       // backgroundColor: '#00BCD4',  
       // flex:1,  
   },
   
   backgroundImage:{
       position:"absolute",
       width:400,
       height:800,
   },

   image:{
       // marginTop:100,
       width:240,
       height:120,
       resizeMode:"contain",
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
});  