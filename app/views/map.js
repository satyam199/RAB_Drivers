import React, { Component } from 'react';
import { Dimensions, View, StyleSheet,TouchableOpacity,Image,Text,Modal, TextInput, ScrollView, StatusBar, PermissionsAndroid } from 'react-native';
// import { View } from 'react-native-animatable';
import MapView from 'react-native-maps';
import { setToken, readName, setData, readData, setValue, readValue } from '../utilities/storage';
import CustomLoader from './customLoader';
import MapViewDirections from 'react-native-maps-directions';
import call from 'react-native-phone-call'
import Geolocation from '@react-native-community/geolocation';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCwwij8DTqH8Z65p_82QDEU5K-RJcp_ziE';


class ConfirmRide extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        {
          latitude: 28.618786666666665,
          longitude: 77.36964833333333,
        },
        {
          latitude: 28.704060,
          longitude: 77.102493,
        },
      ],
      coordinate:{
        latitude: 28.535517,
          longitude: 77.391029,
      },
      chooseReason: 0,
      showBoxModal: false,
      showNewBoxModal:false,
      showConfirmBoxModal: false,
      checked: '',
      checked1:'',
      checked2:'',
      checked3:'',
      button: 0,
      EXPENSES: '',
      mapCount: 4,
      confirmR: 0,
      newToken:'',
      start: 0,
      showLoader: false,
      otp: '',
      newStart: 0
    };

    this.mapView = null;
  }
  
  componentDidMount(){
    const {route} = this.props
    const {item} = route.params
    console.log(item,"mount");
    readName('token').then(res => {
      const res_data = JSON.parse(res);
      this.setState({newToken: res_data})
    })   
    this.setState({coordinates:[
      {
        latitude: parseInt(item.pickup_latitude),
        longitude: parseInt(item.pickup_longitude),
      },
      {
        latitude: parseInt(item.drop_latitude),
        longitude: parseInt(item.drop_longitude),
      },
    ]})

    
  }
  timer =()=> setInterval(()=>this.updateCurrentloc(),3000);
  
  
  async updateCurrentloc(){
    console.log("current location updates")
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Access Location?',
            message:
              'Favarr needs access to your Location for updating your profile',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              let curr=this.state.coordinates
              curr.splice(0,1,{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
              })

              this.setState({...this.state,coordinates:curr},()=>{console.log(this.state.coordinates,"newC")})
              //console.log(curr,"currcurr");
              
              this.setState({...this.state,coordinate:{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
              }},()=>{console.log(this.state.coordinate)})
              
            },
            error => {
              displayConsole('error', error.message);
            },
            {enableHighAccuracy: true, timeout: 15000},
          );
        } else {
         console.log("Permission denied")
        }
      } catch (err) {
      console.log(err)
      }
    } else {
      Geolocation.getCurrentPosition(position => {
        let curr=this.state.coordinates
              curr.splice(0,1,{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
              })

        this.setState({...this.state,coordinates:curr},()=>{console.log(this.state.coordinates,"newC")})
        this.setState({...this.state,coordinate:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
        }},()=>{console.log(this.state.coordinate)})
        
      });
    }
  }

  startTrip = async (item) => {
    this.timer()
    const {newToken} = this.state
    this.setState({showLoader: true})
    var details = { 'id': item?.id, 'ride_otp':  parseInt(this.state.otp), 'user_id': item?.user_id }
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Authorization': 'Bearer ' + newToken?.token, },
      body: formBody
    };
    console.log(requestOptions)
    // const postExample = async () => {
    try {
      const response = await fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/startRide', requestOptions);
      const data = await response.json();
      //  const data= JSON.stringify(response);
      console.log(data, "log_us");
      if (data.status == 200) {
        this.setState({showLoader: false})
        this.setState({start: 1})
      }

    }
    catch (error) {
      console.error(error);
    }
  }

  Args(){
   args = {
    number: '9517036196', // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
    skipCanOpen: true // Skip the canOpenURL check
  }
  
  call(args).catch(console.error)
}
  
  CompletedTrip = async (item) => {
    clearInterval(this.timer())
    const {newToken} = this.state
    this.setState({showLoader: true})
    var details = { 'id': item?.id }
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Authorization': 'Bearer ' + newToken?.token, },
      body: formBody
    };
    console.log(requestOptions)
    // const postExample = async () => {
    try {
      const response = await fetch('https://admin.tripperpedia.in/api/v1/taxi_driver/completeRequest', requestOptions);
      const data = await response.json();
      //  const data= JSON.stringify(response);
      console.log(data, "log_us");
      if (data.status == 200) {
        this.setState({showLoader: false})
        this.props.navigation.navigate("Home")
      }

    }
    catch (error) {
      console.error(error);
    }
  }

  // onMapPress = (e) => {
  //   this.setState({
  //     coordinates: [
  //       ...this.state.coordinates,
  //       e.nativeEvent.coordinate,
  //     ],
  //   });
  // }

  mapViewThis(){
    console.log(this.state.newStart,this.state.coordinate,"from location");
    
    return(
      <MapView
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={StyleSheet.absoluteFill}
      ref={c => this.mapView = c}
      // onPress={this.onMapPress}
    >
    
      {this.state.coordinates.map((coordinate, index) =>
        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
      )}
      {(this.state.coordinates.length >= 2) && (
        <MapViewDirections    
          origin={this.state.coordinates[0]}
          waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
          destination={this.state.coordinates[this.state.coordinates.length-1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onStart={(params) => {
            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
          }}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`)
            console.log(`Duration: ${result.duration} min.`)

            this.mapView.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
              }
            });
          }}
          onError={(errorMessage) => {
            // console.log('GOT AN ERROR');
          }}
        />
      )}
    </MapView>
    )
  }

  render() {
    const {route} = this.props
    const {item} = route.params
    console.log(this.state.otp,"llllllll");
    return (
       <View>
        <ScrollView>
       {this.mapViewThis()}
       <StatusBar hidden={true} />
       {/* header start........ */}
       <View style={Style.header}>
                   <View style={Style.forBackImage}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <Image 
                   style={Style.backImage}
                   source={require('../../asets/icons/Group1417.png')}/>
                </TouchableOpacity>
                     </View>
                  </View>
        {/* header end...... */}
        {this.state.start == 0 ? 
        <>
        {/* <TextInput style={Style.input} placeholder="Enter OTP" placeholderTextColor={"white"} /> */}
        <TextInput placeholder="Enter OTP" 
         placeholderTextColor={"white"}  
         style={Style.input}
         onChangeText={value => this.setState({ otp : value })}
         />

        <View style={Style.forImageCall}>
        <View style={Style.image}>
        <Image style={Style.customerImage}
           //source={require('../../asets/icons/Group12122x.jpg')}
           source={{ uri: item?.user?.image }}
         />
        </View>
        <Text style={Style.name}>{item?.user?.first_name} {item?.user?.last_name}</Text>
        <Text style={Style.customer}>Customer</Text>
        <TouchableOpacity  onPress={()=> {this.Args()}}>
        <Image style={Style.callImage}
         source={require('../../asets/icons/Group1428.png')}/>
         </TouchableOpacity>
        </View>

        <TouchableOpacity
        onPress={()=> this.startTrip(item)} 
         style={Style.forStartTrip}>
            <Text style={Style.startTrip}>START TRIP</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate("Cancel")}
        style={Style.forcancel}>
            <Text style={Style.cencel}>CANCEL</Text>
        </TouchableOpacity>
        </>
        : this.state.start == 1 ?
        <>
        {/* <TextInput style={Style.input} placeholder="Enter OTP" placeholderTextColor={"white"} /> */}
        <View style={[Style.forImageCall,{marginTop:450,}]}>
        <View style={Style.image}>
        <Image style={Style.customerImage}
           //source={require('../../asets/icons/Group12122x.jpg')}
           source={{ uri: item?.user?.image }}
         />
        </View>
        <Text style={Style.name}>{item?.user?.first_name} {item?.user?.last_name}</Text>
        <Text style={Style.customer}>Customer</Text>
        <TouchableOpacity>
        <Image style={Style.callImage}
         source={require('../../asets/icons/Group1428.png')}/>
         </TouchableOpacity>
        </View>

        <TouchableOpacity
        onPress={()=>this.CompletedTrip(item)} 
         style={Style.forStartTrip}>
            <Text style={Style.startTrip}>MARK AS COMPLETED</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate("Cancel",{item})}
        style={Style.forcancel}>
            <Text style={Style.cencel}>CANCEL</Text>
        </TouchableOpacity></> :<></>
      }       
         </ScrollView>
      </View> 
     
    );
  }
}

const Style = StyleSheet.create({
  input:{
    backgroundColor:"#2d2d2d",
    // width:320,
    height:40,
    marginHorizontal:20,
    borderRadius:8,
    color:"white",
    marginTop:450,
  },
  forImageCall:{
    // width:320,
    height:100,
    backgroundColor:"#2d2d2d",
    marginHorizontal:20,
    marginTop:10,
    borderRadius:8,
},
image:{
    width:80,
    height:80,
    backgroundColor:"white",
    marginTop:10,
    marginLeft:10,
    borderRadius:6,
},
name:{
    color:"white",
    fontSize:18,
    fontWeight:"bold",
    marginLeft:100,
    marginTop:-80,
},
customer:{
    color:"white",
    fontSize:11,
    marginLeft:100,
    fontFamily:'Roboto',
    opacity:0.6,
},
forStartTrip:{
  backgroundColor:"#ee003d",
  marginHorizontal:20,
  marginTop:10,
  height:50,
  borderRadius:8,
},
startTrip:{
  color:"white",
  fontSize:16,
  textAlign:"center",
  marginTop:13,
  fontWeight:"bold",
},
forcancel:{
  backgroundColor:"#7b7b7b",
  marginHorizontal:20,
  marginTop:10,
  height:50,
  borderRadius:8,
  marginBottom:30,
},
cencel:{
  color:"white",
  fontSize:16,
  textAlign:"center",
  marginTop:13,
  fontWeight:"bold",
},
callImage:{
  width:54,
  height:54,
  marginTop:-20,
  justifyContent:'flex-end',
  alignItems:'flex-end',
  alignSelf:'flex-end',
  marginHorizontal:20
  // marginLeft:240,
},
customerImage:{
  width:80,
  height:80,
  borderRadius:6,
},
header:{
  width:"100%",
  height:70,
  // backgroundColor:"white",
  // borderBottomColor:"ghostwhite",
  // borderBottomWidth:0.5,
},
backImage:{
  width:20,
  height:20,
  marginTop:35,
  marginLeft:20,
},
forBackImage:{
width:80,
height:70,
// backgroundColor:"white",
},



})

export default ConfirmRide



////////
// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,Dimensions
// } from 'react-native';
// import MapView from 'react-native-maps';


// const mode = 'driving'; // 'walking';
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const SPACE = 0.01;
// const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
// const { width, height } = Dimensions.get('window');

// export default class ConfirmRide extends Component {

//   constructor(props) {
//     super(props);  
//     this.mapRef = null;    
//   }

//   state = {    
//     MARKERS : null,
//     origin :'22.9962,72.5996',
//     destination :'23.0134,72.5624',    
//     destMarker : '',
//     startMarker :'',
//     imageloaded:false,
//   }

//   componentWillMount()
//   {
//     this.getRoutePoints(this.state.origin,this.state.destination);
//   }

//   /**
//    * This method will give you JSON response with all location points between 2 location
//    */
//   getRoutePoints(origin,destination) {
//     console.log("-----getRoutePoints-----")    
//     const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key= AIzaSyCwwij8DTqH8Z65p_82QDEU5K-RJcp_ziE&mode=${mode}`;
//     console.log("URL -- >>" + url);

//     fetch(url)
//       .then(response => response.json())
//       .then(responseJson => {
//         if (responseJson.routes.length) {
//           var cortemp = this.decode(responseJson.routes[0].overview_polyline.points) // definition below;
//           var length = cortemp.length - 1;

//           var tempMARKERS = []; 
//           tempMARKERS.push(cortemp[0]) ;   //start origin        
//           tempMARKERS.push(cortemp[length]); //only destination adding

//           console.log("tempMARKERS : " + JSON.stringify(tempMARKERS));

//           this.setState({
//             coords: cortemp,            
//             MARKERS:tempMARKERS,
//             destMarker : cortemp[length],
//             startMarker:cortemp[0],
//           });

//         }
//       }).catch(e => { console.warn(e) });
//   }

//   /**
//    * This method will transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
//    */

//   decode(t, e) {
//     for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
//       a = null, h = 0, i = 0;
//       do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
//       n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
//       do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
//       o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
//     }
//     return d = d.map(function (t) {
//       return {
//         latitude: t[0],
//         longitude: t[1]
//       }
//     })
//   }

//   /**
//    * After loading custome image of marker it will render map and refresh map will image
//    */
//   forceUpdateMap() {
//     console.log("-----forceUpdateMap------")
//     this.setState({ imageloaded: true });
//   }

//   /**
//    * This method will fit all markers point into single screen 
//    */
//   fitAllMarkers() {
//     const temMark = this.state.MARKERS;
//     console.log( "------fitAllMarkers------")
//     this.setState({loading:false});
//     if (this.mapRef == null) {
//       console.log("map is null")
//     } else {
//       //option:1  
//       console.log("temMark : " + JSON.stringify(temMark));
//       this.mapRef.fitToCoordinates(temMark, {
//         edgePadding: DEFAULT_PADDING,
//         animated: false,
//       });              
//     }
//   }


//   render() {

//     return (
//       <View style={styles.container}>
//         {
//           (this.state.coords != null) ?
//             <MapView
//               ref={ref => { this.mapRef = ref; }}
//               style={styles.map}
//               onLayout={() => this.fitAllMarkers()}>

//               {/*used to drae line on rout point of locations*/}
//               < MapView.Polyline
//                 coordinates={this.state.coords}
//                 strokeWidth={2}
//               />

//               {/*start point marker*/}
//               <MapView.Marker
//                 key={1}
//                 coordinate={this.state.startMarker}
//               />

//               {/*end point marker*/}
//               <MapView.Marker
//                 key={2}
//                 coordinate={this.state.destMarker}
//               >                
//               </MapView.Marker>
//             </MapView> : null
//         }
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });