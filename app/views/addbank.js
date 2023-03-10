import React, {useState} from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable, Modal, Alert, Image, StatusBar} from "react-native";
import CheckBox from 'react-native-checkbox';
import externalstyle from '../styles/commonStyles';

const AddBank =({navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);

    // for validation....

    const[accountHolderName, setAccountHolderName] = useState('')
    const[errorAccountHolderName, setErrorAccountHolderName] = useState('')

    const[accountNumber, setAccountNumber] = useState('')
    const[errorAccountNumber, setErrorAccountNumber] = useState('')

    const[ifscCode, setIfscCode] = useState('')
    const[errorIfscCode, setErrorIfscCode] = useState('')

    const handleAccountHolderNameChange = (e)=>{
      setErrorAccountHolderName('');
      setAccountHolderName(e.target.value);
    }

    const handleAccountNumberChange = (e)=>{
      setErrorAccountNumber('');
      setAccountNumber(e.target.value);
    }

    const handleIfscCodeChange = (e)=>{
      setErrorIfscCode('');
      setIfscCode(e.target.value);
    }

    const Submit=(e)=>{
      e.preventDefault();

      if(accountHolderName!=''){
        // check account holder name
      }
      else{
        setErrorAccountHolderName('pelease enter account holder name')
      }
      if(accountNumber!=''){
        // check account number
      }
      else{
        setErrorAccountNumber('please enter account number')
      }
      if(ifscCode!=''){
        // check ifsc code
      }
      else{
        setErrorIfscCode('please enter IFSC code')
      }
      if(accountHolderName!=='' && accountNumber!=='' && ifscCode!==''){
        setModalVisible(!modalVisible)
      }
    }

        return(
            <View style={externalstyle.container}> 
            {/* <ScrollView> */}
            <StatusBar hidden={true} />
            <ImageBackground 
            source={require('../../asets/icons/onbaord_bg.png')}>
              {/* header start........ */}
              <View style={externalstyle.header}>
                   <View style={externalstyle.forBackImage}>
                    <TouchableOpacity onPress={()=>navigation.navigate("VerifyOtp")}>
                <Image 
                   style={externalstyle.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                     <View style={externalstyle.headerText}>
                     {/* <Text style={externalstyle.Headertitle}>Add Bank</Text> */}
                      </View>
                  </View>
                  {/* header end...... */}

                  <Text style={{textAlign:'center', color:'white', fontSize:18, marginTop:20, marginBottom:20,fontWeight:'bold'}}>Add Bank</Text>

            <Text style={externalstyle.label}>Account Holder Name</Text>
            <TextInput placeholder="Enter Name" placeholderTextColor={"white"}  style={externalstyle.input}
            onChange={handleAccountHolderNameChange} value={accountHolderName}/>
            <Text style={externalstyle.textValidation}>{errorAccountHolderName}</Text>

            <Text style={externalstyle.label}>Account Number</Text>
            <TextInput placeholder="Enter Number" placeholderTextColor={"white"}  style={externalstyle.input}
            onChange={handleAccountNumberChange} value={accountNumber}/>
            <Text style={externalstyle.textValidation}>{errorAccountNumber}</Text>

            <Text style={externalstyle.label}>IFSC Code</Text>
            <TextInput placeholder="Enter Code" placeholderTextColor={"white"}  style={externalstyle.input}
            onChange={handleIfscCodeChange} value={ifscCode}/>
            <Text style={externalstyle.textValidation}>{errorIfscCode}</Text>

            <CheckBox
             checkboxStyle={externalstyle.checkbox}
             labelStyle={externalstyle.check}
             label='Set as primary bank'
             onChange={(checked) => console.log('I am checked', checked)}
            />

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
          <Image style={Style.correctImage}
            source={require('../../asets/icons/correct.png')}/>
            <Text style={Style.modalTextcongratulation}>CONGRATULATIONS</Text>
            <Text style={Style.modalTextlorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>
            <Pressable
              style={[Style.buttonmodal, Style.buttonClose]}
            //   onPress={() => setModalVisible(!modalVisible)}
            onPress={()=>navigation.navigate("Login")}
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
        <Text style={externalstyle.buttonText}>SUBMIT</Text>
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
        paddingHorizontal:10,
        alignItems: "center",
        shadowColor: "#000",
        height:270,
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      buttonmodal:{
        backgroundColor:"#ee003d",
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
        marginTop:20,
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
      backgroundImage:{
        position:"absolute",
        width:'100%',
        height:1000,
      },
      correctImage:{
        width:100,
        height:100,
        marginTop:-50,
      },
})

export default AddBank