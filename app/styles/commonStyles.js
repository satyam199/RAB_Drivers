import React from "react";
import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import Diman from '../../custom_dimensions/src/index'

const externalstyle = StyleSheet.create({
    container:{
        backgroundColor:"black",
        flex:1,
    },
    backgroundImage:{
        // flex: 1,
        position:'absolute',
        width:'100%',
        // height:verticalScale(1300),
        height:'100%',
        
        // flex:1,
    },
    input:{
        marginHorizontal:moderateScale(20),
        borderBottomWidth:0.8,
        borderBottomColor:"ghostwhite",
        fontSize:15,
        color:"white",
        marginTop:-10,
        // marginBottom:5,
    },
    label:{
        marginHorizontal:20,
        fontSize:14,
        color:"white",
        marginTop:5,
        fontFamily:'Roboto',
        opacity:0.6,
    },
    button:{
        backgroundColor:"#ee003d",
        marginHorizontal:20,
        marginTop:50,
        height:50,
        borderRadius:8,
        marginBottom:10,
    },
    buttonSecond:{
        backgroundColor:"#ee003d",
        marginHorizontal:20,
        marginTop:50,
        height:verticalScale(50),
        borderRadius:8,
        marginBottom:300,
    },
    buttonText:{
        color:"white",
        fontSize:16,
        textAlign:"center",
        marginTop:15,
        fontWeight:"bold",
    },

    // for already have an account?LOGIN (signup, next, createprofile screen)......
    login:{
        fontSize:16,
        marginTop:25,
        marginVertical:20,
        color:"white",
        // marginLeft:65,
    },
    forlogin:{
        color:"white",
        fontSize:14,
        marginLeft:250,
        marginTop:-40,
        marginVertical:40,
        color:"#ff4082",
        fontWeight:"bold",
    },
    // end here...


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
    // header styling end here.....


    // header styling for home, history, setting page start here.....
    headerSecond:{
        width:"100%",
        height:verticalScale(55),
        borderBottomColor:"ghostwhite",
        borderBottomWidth:0.5,
        flexDirection:"row",
    },
    forProfile:{
        width:'80%',
        height:verticalScale(60),
    },
    forProfileImage:{
        width:scale(40),
        height:verticalScale(40),
        backgroundColor:"white",
        borderRadius:50,
        marginHorizontal:20,
        alignItems: 'center',
        marginVertical: 5
        //marginTop:15,
    },
    image:{
        width:scale(40),
        height:verticalScale(40),
        borderRadius:50,
    },
    name:{
        color:"white",
        fontSize:18,
        marginLeft:70,
        marginTop:-42,
        //fontWeight:"bold",
        alignItems:'center'
    },
    forNotification:{
        width:'20%',
        height:verticalScale(60),
    },
    notification:{
        marginTop:20,
        marginLeft:30,
    },
    notificationImage:{
        width:scale(18),
        height:verticalScale(20),
    },
    // header styling for home, history, setting page end here.....

    // for checkbox styling...........
    check:{
        color:"white",
        marginTop:40,
        borderColor:'white',
        // backgroundColor:"#00c443",
    },
    checkbox:{
        marginTop:40,
        // backgroundColor:"#00c443",
        borderRadius:5,
        marginLeft:15,
        borderColor:'white',
    },

    // validation styling..........
    textValidation:{
        color:"red",
        marginHorizontal:20,
        fontSize:14,
    }
})
 
export default  externalstyle
    


    
