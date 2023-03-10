import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  ImageBackground
} from 'react-native';
import externalstyle from '../styles/commonStyles';
import Axios from 'axios';
import Toast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from './customLoader';
import {setToken,readName,setData,readData,setValue,readValue} from '../utilities/storage';
// import SplashScreen from 'react-native-splash-screen'    // for splash screen...(added)


export const STANDARD_SCREEN_DIMENSIONS = {height: 812, width: 375};

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default class Myapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      erroremail: '',
      errorpassword: '',
      passwordVisible: '',
      setPasswordVisible: '',
      fcmToken:'',
      secureTextEntry: true,  
      dimensions: {
        window,
        screen,
      },
      showLoader: false
    };
  }

  onChange = ({window, screen}) => {
    this.setState({dimensions: {window, screen}});
  }; 

  // // for splash screen....(added)
  // componentDidMount() {
  //     SplashScreen.hide();
  // }

  componentDidMount() {
    // SplashScreen.hide();    // for splash screen...(added)
    this.dimensionsSubscription = Dimensions.addEventListener(
      'change',
      this.onChange,
    );
  }
  getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      this.setState({fcmToken: token})
      console.log(token,"FCM token");

    } catch (e) {
      console.log(error);
    }
  };

  componentWillUnmount() {
    // SplashScreen.hide();         // for splash screen...(added)
    this.dimensionsSubscription?.remove();
  }

  callApi = async () => {
    const {navigation} = this.props
   // await checkToken();
   this.setState({showLoader: true})
    Axios.post('/taxi_driver/login', {
      email: this.state.email,
      password: this.state.password,
      fcm: this.state.fcmToken,
    }).then(({data}) => {
      console.log(data,"login Api");
      this.setState({showLoader: false})
      if(data.data==null){
        //popup to messsafge
        console.log(data.message)
      }else if(data.error==true){
        //data.message
      }else{
        // console.log(data.message) // pupop
        let dataL = {dataList: data.data}
        let usernew = { token : data.data.token}
        setToken("token",JSON.stringify(usernew)).then(()=>{
          readName('token').then(res=>{
          console.log(res,"gggg");
          })
        })
        setData("data",JSON.stringify(dataL)).then(()=>{
          readData('data').then(res=>{
          console.log(res,"yellow");
          })
        })
      }  
      if (data && data.status == 200) {
        this.setState({showLoader: false})
        let firstName = data.data.first_name
        let lastName = data.data.last_name
        let image = data.data.image
        this.props.navigation.navigate('BottomTab',{firstName,lastName,image});
        
      } else if (data.status == 400 && data.data && data.data.is_otp_verified == 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.CENTER);
        let number = data.data.mobile_no
        let countryCode = data.data.country_code
        let countryiso  = data.data.country_iso
        this.props.navigation.navigate('VerifyMobile',{number,countryCode,countryiso});
      }
      // else if(data.status == 400){
      //   Toast.showWithGravity(data.message, Toast.LONG, Toast.CENTER);
      // }
       else {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.CENTER);
      }
    }).catch(err => {
      console.log(err)
    })
  };



  submit = () => {
    let s1 = {...this.state};
    if (s1.email.length < 1) {
      this.setState({erroremail: 'please enter email'});
    } else {
      this.setState({erroremail: ''});
    }

    if (s1.password < 1) {
      this.setState({errorpassword: 'please enter password'});
    } else {
      this.setState({errorpassword: ''});
    }

    if (s1.errorpassword == '' && s1.erroremail == '') {
      this.callApi();
    }
  }

  componentDidMount() {
     this.getFCMToken() 
  }

  onIconPress = () => {
  
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  render() {
    const {showLoader} = this.state
    return (
      <View style={styles.MainContainer}>
        <ImageBackground source={require('../../asets/icons/onbaord_bg.png')}>
        {/* <View style={{flexDirection: 'column', height:200, position:'absolute', marginVertical:600}}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center', textAlign:'center'}}
              onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.signup}>
                  Don't have an Account?{' '}
                  <Text style={{color: '#ff4082', fontWeight: 'bold'}}>
                    SIGNUP
                  </Text>{' '}
                </Text>
            </TouchableOpacity>
          </View> */}

        <ScrollView>
        <StatusBar hidden={true} />
          {/* <StatusBar hidden={true} /> */}

          {/* <Image
            style={externalstyle.backgroundImage}            
          /> */}

          <Image
            style={styles.logo}
            source={require('../../asets/icons/RAB-logo1.png')}
          />

          <Text style={externalstyle.label}>Email</Text>
          <TextInput
            placeholder="Enter Email Address"
            placeholderTextColor={'white'}
            style={externalstyle.input}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          <Text style={styles.mailValidation}>{this.state.erroremail}</Text>

          <Text style={externalstyle.label}>Password</Text>
          <TextInput
            secureTextEntry={this.state.secureTextEntry}
            placeholder="Enter Password"
            placeholderTextColor={'white'}
            style={externalstyle.input}
            onChangeText={password => this.setState({password})}
          />
          <Text style={styles.passwordValidation}>
            {this.state.errorpassword}
          </Text>

          <TouchableOpacity 
          onPress={this.onIconPress}
          >
            <Image
              //  name={this.state.iconName}
              style={styles.showPasswordImage}
              source={require('../../asets/icons/eye-fill.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Forgot Password')}>
            <Text style={styles.forgotpassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forlogin}
            //  onPress={()=>this.props.navigation.navigate("BottomTab")}
            onPress={() => {
              this.submit();
            }}>
            <Text style={styles.login}>LOGIN</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <ScrollView>
                <Text style={styles.signup}>
                  Don't have an Account?{' '}
                  <Text style={{color: '#ff4082', fontWeight: 'bold'}}>
                    SIGNUP
                  </Text>{' '}
                </Text>
              </ScrollView>
            </TouchableOpacity>
          </View>
          <CustomLoader showLoader={showLoader}/>
        </ScrollView>
    </ImageBackground>
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  MainContainer: {
    //  flex: 1,
    //  justifyContent: 'center',
    //  alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'space-between',
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    //  margin: 50,
    position: 'absolute',
    width: '100%',
    height: '100%',
    // width:Dimensions.get('screen').width,
    // height:Dimensions.get('screen').height,
    // height: height,
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: '#00BCD4',
    //  flex:1,
  },

  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  image: {
    // marginTop:100,
    width: 240,
    height: 120,
    resizeMode: 'contain',
  },
  logo: {
    width: 240,
    height: 128,
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 60,
    alignSelf: 'center',
  },
  email: {
    marginHorizontal: 25,
    fontSize: 16,
    //  color:"#f8f8ff",
    fontFamily: 'Roboto',
    color: '#FFFFFF',
    opacity: 0.6,
  },
  password: {
    marginHorizontal: 25,
    fontSize: 16,
    marginTop: 40,
    //  color:"white",
    fontFamily: 'Roboto',
    color: '#FFFFFF',
    opacity: 0.6,
  },
  forgotpassword: {
    //  marginTop:5,
    fontSize: 14,
    fontWeight: 'bold',
    //  marginLeft:230,
    color: 'white',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
  },
  forlogin: {
    backgroundColor: '#ee003d',
    marginHorizontal: 20,
    marginTop: 40,
    height: 50,
    borderRadius: 8,
    // marginBottom:200,
  },
  login: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 13,
    fontWeight: 'bold',
  },
  signup: {
    fontSize: 16,
    marginTop: 100,
    color: 'white',
    //  marginLeft:70,
    marginVertical: 50,
  },
  showPasswordImage: {
    width: 22,
    height: 16,
    // marginLeft:320,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: -50,
  },
  mailValidation: {
    color: 'red',
    marginHorizontal: 20,
    fontSize: 14,
  },
  passwordValidation: {
    color: 'red',
    marginHorizontal: 20,
    fontSize: 14,
  },
});
