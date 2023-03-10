import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './app/views/login';
import SignUp from './app/views/signup';
import Nextpage from './app/views/next';
import VerifyMobile from './app/views/verifymobile';
import VerifyOtp from './app/views/verifyotp';
import CreateProfile from './app/views/createprofile';
import AddVehicalDetail from './app/views/addvehicledetail';
import AddBank from './app/views/addbank';
import ForgotPassword from './app/views/forgotpassword';
import Home from './app/views/home';
import BottomTab from './app/views/bottomtab';
import changePassword from './app/views/changepassword';
import ContactUs from './app/views/contactus';
import Send from './app/views/send';
import Map from './app/views/map';
import Cancel from './app/views/cancel';
import Notification from './app/views/notification';
import Profile from './app/views/profile';
import MyPaymentMethod from './app/views/mypaymentmethod';
import StartTrip from './app/views/starttrip';
import AboutUs from './app/views/aboutus';
import LocationMap from './app/views/locationMap';
import AuthLoading from './app/views/authLoading';
// import FirstScreen from './app/views/firstscreen';
// import Splash from './app/views/spleshExample';
// import Splesh from './app/views/newSpleshScreen';
// import Splash from './app/views/splash';
import ForCreateProfile from './app/views/forCreateProfile.js';
import DemoProject from './app/views/showHidePassword';
import DimensionExample from './app/views/dimensionExample';
import RandomColor from './app/views/generatingRandomColor';
import FormikExample from './app/views/formik';
import {createStackNavigator} from '@react-navigation/stack';
import {normalizeUnits} from 'moment';
import {transform} from '@babel/core';
import Axios from 'axios'
import completTrip from './app/views/completTrip';
import ShowImage from './app/views/showImage';
import LicenceFullImage from './app/views/licenceFullImage';

const Stack = createStackNavigator();

export default function App() {
  Axios.defaults.baseURL = 'https://admin.tripperpedia.in/api/v1/';
  Axios.defaults.headers = {'X-Requested-With': 'XMLHttpRequest','Accept': 'application/json',
  'Content-Type': 'application/json'};
  // Axios.defaults.timeout = 10000;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        {/* <Stack.Screen name="Start" component={FirstScreen} options={{ headerShown: false }}/> */}
       
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoading}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Next"
          component={Nextpage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Verify"
          component={VerifyMobile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyMobile"
          component={VerifyMobile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Add Business Detail"
          component={CreateProfile}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Add Vehicle Detail" component={AddVehicalDetail} />

        <Stack.Screen
          name="Add Bank"
          component={AddBank}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Forgot Password"
          component={ForgotPassword}
          // options={{
          //   // headerShown: true,
          //   headerTransparent: true,
          //   headerTitleStyle:{
          //     color:"white",
          //   },
          // }}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Change Password"
          component={changePassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Contact Us"
          component={ContactUs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Send"
          component={Send}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Map"
          component={Map}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Cancel"
          component={Cancel}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="My Payment Method"
          component={MyPaymentMethod}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Start Trip"
          component={StartTrip}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="About Us"
          component={AboutUs}
          options={{headerShown: false}}
        />

        {/* <Stack.Screen name='Splash Example' component={Splash} options={{ headerShown: false }}/> */}

        {/* create second for different files.... */}
        {/* <Stack.Screen name='Splesh Example' component={Splesh} options={{ headerShown: false }}/> */}

        <Stack.Screen
          name="Random Color Generate"
          component={RandomColor}
          // options={{ headerShown: false }}
        />

        <Stack.Screen name="FormikExample" component={FormikExample} />

        <Stack.Screen name="DimensionExample" component={DimensionExample} />

        <Stack.Screen name="DemoProject" component={DemoProject} />

        <Stack.Screen
          name="For Create Profile"
          component={ForCreateProfile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Location Map"
          component={LocationMap}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Complet Trip"
          component={completTrip}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Show Image"
          component={ShowImage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Licence Full Image"
          component={LicenceFullImage}
          options={{headerShown: false}}
        />

        {/* <Stack.Screen name='Splash Screen' component={Splash} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
