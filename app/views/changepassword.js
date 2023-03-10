import React, {useState, useEffect} from "react";
import {Text, View, TextInput, Image, StyleSheet, ScrollView, Pressable, Modal, Alert, TouchableOpacity, ImageBackground } from "react-native";
import externalstyle from '../styles/commonStyles';
import {setToken,readName,setData,readData,setValue,readValue} from '../utilities/storage';

const ChangePassword =({navigation})=> {
    const [modalVisible, setModalVisible] = useState(false);
    const[newToken, setNewToken] = useState('')

    // for validation....
    const[oldPassword, setOldPassword] = useState('')
    const[errorOldPassword, setErrorOldPassword] = useState('')

    const[newPassword, setNewPassword] = useState('')
    const[errorNewPassword, setErrorNewPassword] = useState('')

    const[confirmPassword, setConfirmPassword] = useState('')
    const[errorConfirmPassword, setErrorConfirmPassword] = useState('')

    const handleOldPasswordChange=(e)=>{
      setErrorOldPassword('');
      setOldPassword(e.target.value);
    }

    const handleNewPasswordChange=(e)=>{
      setErrorNewPassword('');
      setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange=(e)=>{
      setErrorConfirmPassword('');
      setConfirmPassword(e.target.value);
    }

    const [isSecureEntry, setIsSecureEntry]=useState(true)
    const [isSecureEntrySecond, setIsSecureEntrySecond]=useState(true)
    const [isSecureEntryThird, setIsSecureEntryThird]=useState(true)

    useEffect(()=>{
      readName('token').then(res=>{
          const res_data= JSON.parse(res);
         setNewToken(res_data)
         })
   },[])

    const Submit=(e)=>{

      var myHeaders = new Headers();
        myHeaders.append("Cookie", "connect.sid=s%3AwXpO2Es5dCYzHh1iveJlt8MD2Pgz_vxR.ekn2H3OiHBks0NYH5mzAXnPzoh20xSZBJ%2Fe7cz9v230");

        var requestOptions = {
           method: 'POST',
           headers:  { 'Content-Type': 'application/json','Authorization': 'Bearer ' + newToken.token, },
           redirect: 'follow',
        };

      fetch("https://admin.tripperpedia.in/api/v1/taxi_driver/change_password",       requestOptions)
        .then(response => response.text())
        .then(result => console.log(result, "this is result of change password api........."))
        .catch(error => console.log('error', error));

      // e.preventDefault();
      if(oldPassword!=''){
        // check old password
      }
      else{
        setErrorOldPassword('please enter old password')
      }
      if(newPassword!=''){
        // check new password
      }
      else{
        setErrorNewPassword('please enter new password')
      }
      if(confirmPassword!=''){
        // check confirm password
      }
      else{
        setErrorConfirmPassword('please confirm your password')
      }
      if(oldPassword!=='' && newPassword!=='' && confirmPassword!==''){
        setModalVisible(!modalVisible)
      }
    }

    //  console.log(oldPassword, newPassword, confirmPassword, "this is password values...............")
        return(
            <View style={externalstyle.container}>
              <ImageBackground 
                source={require('../../asets/icons/onbaord_bg.png')}>
                  <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>navigation.navigate("BottomTab")}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                     <View style={externalstyle.headerText}>
                     <Text style={externalstyle.Headertitle}>Change Password</Text>
                      </View>
                  </View>

                  {/* <Text style={{textAlign:'center', color:'white', fontSize:18, marginTop:20, marginBottom:20,fontWeight:'bold'}}>Change Password</Text> */}

                  {/* header end...... */}
                <Text style={Style.label}>Old Password</Text>
                 <TextInput 
                 secureTextEntry={isSecureEntry} 
                 placeholder="Enter Old Password" 
                 placeholderTextColor={"white"}  
                 style={externalstyle.input}
                 onChange={handleOldPasswordChange} 
                 onChangeText={(text)=>setOldPassword(text)}
                 value={oldPassword}/>
                 <Text style={externalstyle.textValidation}>{errorOldPassword}</Text>

                 <TouchableOpacity 
                       onPress={()=>{
                        setIsSecureEntry((prev)=> !prev)
                       }}
                        >
                        <Image
                       //  name={this.state.iconName} 
                        style={Style.showPasswordImage}
                        source={require('../../asets/icons/eye-fill.png')}/>
                        </TouchableOpacity>

                 <Text style={externalstyle.label}>New Password</Text>
                  <TextInput secureTextEntry={isSecureEntrySecond} 
                  placeholder="Enter New Password" 
                  placeholderTextColor={"white"}  
                  style={externalstyle.input}
                  onChange={handleNewPasswordChange} 
                  onChangeText={(text)=>setNewPassword(text)}
                  value={newPassword}/>
                  <Text style={externalstyle.textValidation}>{errorNewPassword}</Text>

                  <TouchableOpacity 
                       onPress={()=>{
                        setIsSecureEntrySecond((prev)=> !prev)
                       }}
                        >
                        <Image
                       //  name={this.state.iconName} 
                        style={Style.showPasswordImage}
                        source={require('../../asets/icons/eye-fill.png')}/>
                        </TouchableOpacity>

                  <Text style={externalstyle.label}>Confirm Password</Text>
                  <TextInput secureTextEntry={isSecureEntryThird} 
                  placeholder="Re-Enter Password" 
                  placeholderTextColor={"white"}  
                  style={externalstyle.input}
                  onChange={handleConfirmPasswordChange} 
                  onChangeText={(text)=>setConfirmPassword(text)}
                  value={confirmPassword}/>
                  <Text style={externalstyle.textValidation}>{errorConfirmPassword}</Text>

                  <TouchableOpacity 
                       onPress={()=>{
                        setIsSecureEntryThird((prev)=> !prev)
                       }}
                        >
                        <Image
                       //  name={this.state.iconName} 
                        style={Style.showPasswordImage}
                        source={require('../../asets/icons/eye-fill.png')}/>
                        </TouchableOpacity>

                  <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
         >
        <View style={Style.centeredView}>
        <Image style={Style.backgroundImage}
          source={require('../../asets/icons/onbaord_bg.png')}/>
          <View style={Style.modalView}>
            <View>
            <Image style={Style.rightImage}/>
            </View>
            <Image style={Style.correctImage}
            source={require('../../asets/icons/correct.png')}/>
            <Text style={Style.modalTextcongratulation}>CONGRATULATIONS</Text>
            <Text style={Style.modalTextlorem}>Your password has been changed successfully</Text>
            <Pressable
              style={[Style.buttonmodal, Style.buttonClose]}
            //   onPress={() => setModalVisible(!modalVisible)}
            onPress={()=>navigation.navigate("BottomTab")}
            >
              <Text style={Style.textStylemodal}>OKAY</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

         <Pressable
        style={[externalstyle.buttonSecond, Style.buttonOpen]}
        // onPress={() => setModalVisible(true)}
        onPress={(e)=>{Submit(e)}}>
        <Text style={externalstyle.buttonText}>UPDATE</Text>
      </Pressable>

      {/* </ScrollView> */}
      </ImageBackground>
        </View>
    )
}

const Style = StyleSheet.create({
    
    // MODAL STYLING.....
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor:"black",
      },
      modalView: {
        margin: 40,
        backgroundColor: "#2d2d2d",
        borderRadius: 20,
        // padding: 35,
        paddingHorizontal:10,
        alignItems: "center",
        shadowColor: "#000",
        height:270,
      },
      button: {
        backgroundColor:"#ee003d",
        marginHorizontal:20,
        marginTop:50,
        height:55,
        borderRadius:8,
        marginVertical:250,
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color:"white",
        fontSize:18,
        textAlign:"center",
        marginTop:15,
        fontWeight:"bold",
      },
      buttonmodal:{
        backgroundColor:"red",
        marginHorizontal:30,
        marginTop:50,
        height:55,
        borderRadius:8,
      },
      buttonClose:{
        backgroundColor:"white",
        width:220,
        marginTop:-1,
      },
      textStylemodal:{
        color:"black",
        fontWeight:"bold",
        textAlign:"center",
        fontSize:20,
        marginVertical:10,
      },
      modalTextcongratulation:{
        fontWeight:"bold",
        fontSize:22,
        color:"white",
        marginTop:30,
      },
      modalTextlorem:{
        marginBottom: 15,
        textAlign: "center",
        color:"white",
        fontSize:14,
        marginTop:10,
        marginHorizontal:10,
        fontFamily:'Roboto',
        opacity:0.6,
      },
      rightImage:{
        width:50,
        height:50,
        marginTop:-20,
      },
      backgroundImage:{
        position:"absolute",
        width:'100%',
        height:1000,
      },
      correctImage:{
        width:100,
        height:100,
        marginTop:-70,
      },
      showPasswordImage:{
        width:20,
        height:14,
        alignSelf:'flex-end',
        marginHorizontal:20,
        marginTop:-50,
      },
      label:{
        marginHorizontal:20,
        fontSize:14,
        color:"white",
        marginTop:30,
        fontFamily:'Roboto',
        opacity:0.6,
    },
})

export default ChangePassword