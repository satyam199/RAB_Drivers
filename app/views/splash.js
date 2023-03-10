
import React, { Component } from 'react';  
import { Platform, StyleSheet, View, Text, ScrollView, TextInput,   
Image, TouchableOpacity, Alert, StatusBar, Dimensions} from 'react-native'; 
import externalstyle from '../styles/commonStyles';
// import { width, height, totalSize } from 'react-native-dimension';
//const {width, height} = Dimensions.get('window')

import {RfW, RfH} from '../../custom_responsive/src/responsive'
export const STANDARD_SCREEN_DIMENSIONS = {height: 812, width: 375};

// STANDARD_SCREEN_DIMENSIONS={width:360, heigth:779}

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default class Myapp extends Component
{  
  constructor(props){  
    super(props);  
    this.state={  
    isVisible : true, 
    email:"",
    password:"",
    erroremail:"",
    errorpassword:"", 
    passwordVisible:"", 
    setPasswordVisible:"",
    secureTextEntry: true,
    dimensions: {
      window,
      screen
    }
   }  
  //  dimensions: {
  //   window,
  //   screen
  // }
 }  

 onChange = ({ window, screen }) => {
  this.setState({ dimensions: { window, screen } });
};

componentDidMount() {
  this.dimensionsSubscription = Dimensions.addEventListener("change", this.onChange);
}

componentWillUnmount() {
  this.dimensionsSubscription?.remove();
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
   }, 7000);  
  }  

  onIconPress = ()=>{
    // let iconName = (this.state.secureTextEntry) ? "eye-off" : "eye";

    this.setState({
      secureTextEntry: ! this.state.secureTextEntry
    });
  }
  
   render()  
   {  

    const { dimensions: { window, screen } } = this.state;

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

    //      return(  
    //         <View style = { styles.MainContainer }>  
    //            <ScrollView>
    //            <StatusBar hidden={true} />
    //  <Image style={externalstyle.backgroundImage}
    //    source={require('../../asets/icons/travel-splash23.png')}/>
    //  <Image
    //  style={styles.logo}
    //  source ={require('../../asets/icons/RAB-logo1.png')}
    //  />

    //  <Text style={externalstyle.label}>Email</Text>
    //  <TextInput placeholder="Enter Email Address" placeholderTextColor={"white"}  
    //  style={externalstyle.input}
    //  keyboardType='email-address'
    //  value={this.state.email}
    //  onChangeText={(email)=>this.setState({email})}/>
    //  <Text style={styles.mailValidation}>{this.state.erroremail}</Text>
      
    //  <Text style={externalstyle.label}>Password</Text>
    //  <TextInput secureTextEntry={this.state.secureTextEntry} 
    //  placeholder="Enter Password" placeholderTextColor={"white"} 
    //  style={externalstyle.input}
    //  onChangeText={(password)=>this.setState({password})}/>
    //  <Text style={styles.passwordValidation}>{this.state.errorpassword}</Text>
     
    //  <TouchableOpacity 
    //  onPress={this.onIconPress}>
    //  <Image
    // //  name={this.state.iconName} 
    //  style={styles.showPasswordImage}
    //  source={require('../../asets/icons/eye-fill.png')}/>
    //  </TouchableOpacity>

    //  <TouchableOpacity
    //  onPress={()=>this.props.navigation.navigate("Forgot Password")}>
    //    <Text style={styles.forgotpassword}>Forgot Password?</Text>
    //  </TouchableOpacity>

    //  <TouchableOpacity style={styles.forlogin}
    // //  onPress={()=>this.props.navigation.navigate("BottomTab")}
    //  onPress={()=>{this.submit()}}>
    //    <Text style={styles.login}>LOGIN</Text>
    //  </TouchableOpacity>

    //  <View style={{flexDirection:'column'}}>
    //  <TouchableOpacity 
    //  style={{justifyContent:'center',alignItems:'center'}}
    //   onPress={()=>this.props.navigation.navigate("SignUp")}>
    //     <ScrollView>
    //    <Text style={styles.signup}>Don't have an Account? <Text style={{color:"#ff4082", fontWeight:'bold'}}>SIGNUP</Text> </Text>
    //    {/* <Text style={styles.forsignup}> SIGNUP </Text> */}
    //    </ScrollView>
    //    </TouchableOpacity>
    //    </View>
    //             {  
    //              (this.state.isVisible === true) ? Splash_Screen : null  
    //             }  
    //             </ScrollView>
    //        </View>  
    //   );  
   }  
}  
const styles = StyleSheet.create(  
{  
//    MainContainer:  
//    {  
//       //  flex: 1,  
//       //  justifyContent: 'center',  
//       //  alignItems: 'center',  
//        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  ,
//        justifyContent:'space-between',
//    },  
  
   SplashScreen_RootView:  
    {  
       justifyContent: 'center',  
       flex:1,  
      //  margin: 50,  
       position: 'absolute',  
       width: '100%',
       height: '100%',
      // width:Dimensions.get('screen').width,
      // height:Dimensions.get('screen').height,
        
      // height: height,
    },  
  
   SplashScreen_ChildView:  
   {  
       justifyContent: 'center',  
       alignItems: 'center',
      //  backgroundColor: '#00BCD4',  
      //  flex:1,  
   },
   
   backgroundImage:{
       position:"absolute",
       width:"100%",
       height:"100%",
   },

   image:{
       // marginTop:100,
       width:240,
       height:120,
       resizeMode:"contain",
   },
//    logo:{
//        width:240,
//        height:128,
//        marginVertical:100,
//        justifyContent:'center',
//        alignItems:"center",
//        marginHorizontal:60,
//        alignSelf:'center',
//      },
//      email:{
//        marginHorizontal:25,
//        fontSize:16,
//       //  color:"#f8f8ff",
//        fontFamily:'Roboto',
//        color: '#FFFFFF',
//        opacity:0.6,
//      }, 
//      password:{
//        marginHorizontal:25,
//        fontSize:16,
//        marginTop:40,
//       //  color:"white",
//       fontFamily:'Roboto',
//       color: '#FFFFFF',
//       opacity:0.6,
//      },
//      forgotpassword:{
//       //  marginTop:5,
//        fontSize:14,
//        fontWeight:"bold",
//       //  marginLeft:230,
//        color:"white",
//        alignSelf:'flex-end',
//        marginHorizontal:20,
//      },
//      forlogin:{
//        backgroundColor:"#ee003d",
//        marginHorizontal:20,
//        marginTop:40,
//        height:50,
//        borderRadius:8,
//      },
//      login:{
//        color:"white",
//        fontSize:16,
//        textAlign:"center",
//        marginTop:13,
//        fontWeight:"bold",
//      },
//      signup:{
//        fontSize:16,
//        marginTop:100,
//        color:"white",
//       //  marginLeft:70,
//        marginVertical:50,
//      },

//      showPasswordImage:{
//       width:20,
//       height:14,
//       // marginLeft:320,
//       alignSelf:'flex-end',
//       marginHorizontal:20,
//       marginTop:-50,
//     },
//      mailValidation:{
//       color:"red",
//       marginHorizontal:20,
//       fontSize:14,
//      },
//      passwordValidation:{
//       color:"red",
//       marginHorizontal:20,
//       fontSize:14,
//      },
});  