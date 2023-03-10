import React, { useState } from "react";
import {StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import externalstyle from '../styles/commonStyles';
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

 
export default function AboutUs({navigation}) {

  const [isLoad, setIsLoad] = useState(false)

  const Submit = ()=>{
   setIsLoad(true)
   setTimeout(()=>{
    setIsLoad(false)
   }, 3000)
  }
 
  return (
    <View style={externalstyle.container}>
       <ImageBackground style={externalstyle.backgroundImage}
        source={require('../../asets/icons/onbaord_bg.png')}>
      <ScrollView>
      <StatusBar hidden={true} />
       
        {/* header start........ */}

        <View style={externalstyle.header}>
                    <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>navigation.navigate("BottomTab")}>
                <Image 
                   style={externalstyle.backImage}
                    source={require('../../asets/icons/Group1417.png')}/>
                 </TouchableOpacity>
                      </View>
                      <View style={externalstyle.headerText}>
                      <Text style={externalstyle.Headertitle}>About Us</Text>
                       </View>
                   </View>
        {/* header end...... */}   
         <View style={styles.oopsMoment}> 
         {
          isLoad ? <ActivityIndicator color={'#ee003d'} size={'large'} animating={isLoad}/> : 
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Image 
            style={{width:65, height:65}}
            source={require('../../asets/icons/ic_empty.png')} />
          <Text style={styles.oops}>Opps...</Text>
          <Text style={{fontWeight:'bold', fontSize:25, color:"ghostwhite", marginHorizontal:25, opacity:0.9}}>Sorry,{''}
          <Text style={{flex:1,fontSize:15,alignItems:"center",justifyContent:"center", color:"ghostwhite",marginHorizontal:25, fontWeight:'normal' }}>  We couldn't find the item you ware looking for this time.</Text>{''}
          </Text>
          </View>
         }
         </View>

         <TouchableOpacity style={styles.forTryAgain}
         onPress={()=>Submit()}>
        <Text style={styles.tryAgain}>TRY AGAIN</Text>
        </TouchableOpacity>


      </ScrollView>
     </ImageBackground>
    </View>
   
  );
}
 
const styles = StyleSheet.create({
  oopsMoment:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:150,
  },
  oops:{
   flex:1,
   justifyContent:"center",
   alignItems:"center",
   fontSize:30,
   color:"#ee003d",
   marginBottom:20,
   fontWeight:'bold',
  },
  forTryAgain:{
    backgroundColor:"#ee003d",
    marginHorizontal:20,
    marginTop:50,
    height:50,
    borderRadius:8,
  },
  tryAgain:{
    color:"white",
    fontSize:16,
    textAlign:"center",
    marginTop:13,
    fontWeight:"bold",
  },


});