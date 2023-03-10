import React from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, ImageBackground } from 'react-native';
import Svg, {Path} from 'react-native-svg';
import externalstyle from '../styles/commonStyles'

const ListScreen = ({navigation})=>{
    const Payment = [
        {
            No: '**** **** **** 8765',
            Bank:'State Bank of India'
        },
        {
          No: '**** **** **** 8765',
          Bank:'Punjab National Bank'
        },
        {
          No: '**** **** **** 8765',
          Bank:'Bank of America'
        },  
        
    ]
    return(
        <View style={Style.container}>
          <ImageBackground 
            source={require('../../asets/icons/onbaord_bg.png')}>
          {/* <ScrollView> */}
          <StatusBar hidden={true} />
          {/* <Image style={externalstyle.backgroundImage}
          source={require('../../asets/icons/travel-splash23.png')}/> */}
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
                     <Text style={externalstyle.Headertitle}>My Payment Method</Text>
                      </View>
                  </View>
                  {/* header end...... */}

                  {/* <Text style={{textAlign:'center', color:'white', fontSize:18, marginTop:20, marginBottom:20,fontWeight:'bold'}}>My Payment Method</Text> */}

            <FlatList data={Payment} 
            renderItem={({item})=>{
                return (
                <TouchableOpacity style={Style.box}>
                  <Image style={Style.rectangleImage}
                  source={require('../../asets/icons/Rectangle1264.png')} />
                  {/* <Image style={Style.bankImage}
                  source={require('../../asets/icons/bank1.svg')} /> */}
               <Svg xmlns="http://www.w3.org/2000/svg" width="18.667" height="20" viewBox="0 0 18.667 20" style={Style.bankImage}>
               <Path id="bank" d="M9.333,0l9.333,4.286V5.714H17.422a.71.71,0,0,1-.2.5.623.623,0,0,1-.471.212H1.915a.626.626,0,0,1-.471-.212.711.711,0,0,1-.2-.5H0V4.286ZM2.489,7.143H4.978v8.571H6.222V7.143H8.711v8.571H9.956V7.143h2.489v8.571h1.244V7.143h2.489v8.571h.573a.626.626,0,0,1,.471.212.709.709,0,0,1,.2.5v.714H1.244v-.714a.71.71,0,0,1,.2-.5.623.623,0,0,1,.471-.212h.573V7.143ZM18,17.857a.626.626,0,0,1,.471.212.709.709,0,0,1,.2.5V20H0V18.571a.71.71,0,0,1,.2-.5.623.623,0,0,1,.471-.212H18Z" fill="#282d3d"/>
               </Svg>

                <Text style={Style.textNo}>{item.No}</Text>
                <Text style={Style.textBank}>{item.Bank}</Text>
                
                </TouchableOpacity>
                )
            }}/>

          <TouchableOpacity style={externalstyle.buttonSecond}>
            <Text style={externalstyle.buttonText}>ADD NEW BANK</Text>
          </TouchableOpacity>
        {/* </ScrollView> */}
        </ImageBackground>
        </View>
        
    )
}

const Style = StyleSheet.create({
    container:{
      backgroundColor:"black",
    },
    textNo:{
      fontSize:14,
      color:"white",
      textAlign:"center",
      // marginTop:10,
      marginTop:-45,
      marginLeft:10,
    },
    textBank:{
      fontSize:14,
      color:"white",
      textAlign:"center",
      // marginTop:10,
      // marginTop:-5,
      marginLeft:10,
    },
    box:{
      backgroundColor:"#2d2d2d",
      // width:350,
      height:100,
      marginTop:30,
      borderRadius:15,
      marginHorizontal:20,
    },
    forAddNewBank:{
      backgroundColor:"#ee003d",
      marginHorizontal:20,
      marginTop:200,
      height:55,
      borderRadius:8,
      marginVertical:100,
    },
    addNewBank:{
      color:"white",
      fontSize:18,
      textAlign:"center",
      marginTop:15,
      fontWeight:"bold",
    },
    backgroundImage:{
      position:"absolute",
      width:400,
      height:800,
    },
    rectangleImage:{
      width:40,
      height:40,
      // marginLeft:20,
      marginTop:30,
      marginHorizontal:20,
    },
    bankImage:{
      width:18,
      height:20,
      position:'absolute',
      // marginTop:-5,
      marginLeft:30,
      marginTop:40,

    },
    header:{
      width:"100%",
      height:70,
      // backgroundColor:"white",
      borderBottomColor:"ghostwhite",
      borderBottomWidth:0.5,
  },
  backImage:{
      width:20,
      height:20,
      marginTop:35,
      marginLeft:20,
  },
  Headertitle:{
      color:"white",
      fontSize:18,
      fontWeight:"bold",
      textAlign:"center",
      marginTop:30,
  },
  forBackImage:{
      width:80,
      height:70,
      // backgroundColor:"white",
  },
  headerText:{
      width:200,
      height:70,
      // backgroundColor:"pink",
      marginLeft:80,
      marginTop:-70,
  }
})

export default ListScreen