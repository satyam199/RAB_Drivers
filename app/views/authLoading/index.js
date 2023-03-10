// import React, { Component } from 'react';  
//  import { Platform, StyleSheet, View, Text,  
//  Image, TouchableOpacity, Alert,Dimensions } from 'react-native';  
//  import { readName } from '../../utilities/storage';
//  export const STANDARD_SCREEN_DIMENSIONS = {height: 812, width: 375};
//  import SplashScreen from 'react-native-splash-screen'    // for splash screen...(added)

// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

//  export default class AuthLoading extends Component  
// {  
//    constructor(){  
//      super();  
//      this.state={  
//      isVisible : true,  
//     }  
//   }  
  
//    Hide_Splash_Screen=()=>{  
//     this.setState({   
//       isVisible : false   
//     });  
//   }  
   
//   componentDidMount() {
//      const { navigation, setLocalStore } = this.props;
//      readName('token').then(res => {
//        console.log(res, "on auth");
//        if (res) { 
//          navigation.navigate('BottomTab')
//        } else {
//          navigation.navigate('Login')
//        }
//      }).done();
//      var that = this;
//      setTimeout(function () {
//        that.Hide_Splash_Screen();
//      }, 5000);
//    }  
   
//     render()  
//     {  
//         let Splash_Screen = (  
//              <View style={styles.SplashScreen_RootView}>  
//                  <View style={styles.SplashScreen_ChildView}>  
//                        <Image source={require('../../../asets/icons/SplachScreen.png')}  
//                     style={{width: '150%', height: '100%', resizeMode: 'contain'}} />  
//                 </View>  
//              </View> )  
//          return(  
//              <View style = {styles.MainContainer}>   
//                  {  
//                   (this.state.isVisible === true) ? Splash_Screen : null  
//                  }  
//             </View>  
//               );  
//     }  
// }  
//  const styles = StyleSheet.create(  
// {  
//     MainContainer:  
//     {  
//         flex: 1,  
//         justifyContent: 'center',  
//         alignItems: 'center',  
//         paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
//     },  
   
//     SplashScreen_RootView:  
//     {  
//         justifyContent: 'center',  
//         flex:1,  
//         margin: 10,  
//         position: 'absolute',  
//         width: '100%',  
//         height: '100%',  
//       },  
   
//     SplashScreen_ChildView:  
//     {  
//         justifyContent: 'center',  
//         alignItems: 'center',  
//         backgroundColor: 'black',  
//         flex:1,  
//     },  
// });  


























import React, { Component } from 'react';  
 import { Platform, StyleSheet, View, Text,  
 Image, TouchableOpacity, Alert,Dimensions } from 'react-native';  
 import { readName } from '../../utilities/storage';
 export const STANDARD_SCREEN_DIMENSIONS = {height: 812, width: 375};
 import SplashScreen from 'react-native-splash-screen'    // for splash screen...(added)

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

 export default class AuthLoading extends Component  
{  
   constructor(){  
     super();  
    //  this.state={  
    //  isVisible : true,  
    // }  
  }  
  
  //  Hide_Splash_Screen=()=>{  
  //   this.setState({   
  //     isVisible : false   
  //   });  
  // }  

//   componentDidMount() {
//     setTimeout(() => SplashScreen.hide() , 3000);
// }
   
  componentDidMount() {
    // SplashScreen.hide();    // for splash screen...(added)
     const { navigation, setLocalStore } = this.props;
     readName('token').then(res => {
      setTimeout(() => SplashScreen.hide() , 1000);
      // SplashScreen.hide();    // for splash screen...(added)
       console.log(res, "on auth");
       if (res) { 
        // SplashScreen.hide();    // for splash screen...(added)
         navigation.navigate('BottomTab')
       } else {
        // SplashScreen.hide();    // for splash screen...(added)
         navigation.navigate('Login')
       }
     }).done();
    //  SplashScreen.hide();    // for splash screen...(added)
    //  var that = this;
    //  setTimeout(function () {
    //    that.Hide_Splash_Screen();
    //  }, 5000);
   }  
   
    render()  
    {  
        // let Splash_Screen = (  
        //      <View style={styles.SplashScreen_RootView}>  
        //          <View style={styles.SplashScreen_ChildView}>  
        //                <Image source={require('../../../asets/icons/SplachScreen.png')}  
        //             style={{width: '150%', height: '100%', resizeMode: 'contain'}} />  
        //         </View>  
        //      </View> )  
         return(  
             <View style = {styles.MainContainer}>   
                 {/* {  
                  (this.state.isVisible === true) ? Splash_Screen : null  
                 }   */}
            </View>  
              );  
    }  
}  
 const styles = StyleSheet.create(  
{  
    // MainContainer:  
    // {  
    //     flex: 1,  
    //     justifyContent: 'center',  
    //     alignItems: 'center',  
    //     paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
    // },  
   
    // SplashScreen_RootView:  
    // {  
    //     justifyContent: 'center',  
    //     flex:1,  
    //     margin: 10,  
    //     position: 'absolute',  
    //     width: '100%',  
    //     height: '100%',  
    //   },  
   
    // SplashScreen_ChildView:  
    // {  
    //     justifyContent: 'center',  
    //     alignItems: 'center',  
    //     backgroundColor: 'black',  
    //     flex:1,  
    // },  
});  