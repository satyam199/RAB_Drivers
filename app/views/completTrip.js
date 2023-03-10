import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Image,
  Dimensions,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const {width, height} = Dimensions.get('window');

import haversine from 'haversine';
import Geolocation from '@react-native-community/geolocation';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCwwij8DTqH8Z65p_82QDEU5K-RJcp_ziE';
// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.33454235;
const LONGITUDE = -122.03611286;


class CompletTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      curLoc: {
        latitude: 28.76535,
        longitude: 78.75849,
      },
      destiLatlng: {
        latitude: 30.7046,
        longitude: 77.1025,
      },
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
  }

  componentDidMount() {
    const {coordinate} = this.state;
    Geolocation.getCurrentPosition(position => {
      console.log('position===' + JSON.stringify(position));
      const {latitude, longitude} = position.coords;

      const newCoordinate = {
        latitude,
        longitude,
      };

      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(newCoordinate, 7000);
        }
      } else {
        coordinate.timing(newCoordinate).start();
      }

      this.setState({
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
        curLoc: {latitude, longitude},
      });
    }).catch(err => {
      console.log(err);
    });
    this.watchID = Geolocation.watchPosition(
      position => {
        console.log('position===' + JSON.stringify(position));
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(newCoordinate, 7000);
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          coordinate: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
          curLoc: {latitude, longitude},
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: false,
        // timeout: 20000,
        // maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <>
          {this.state.curLoc.latitude ? (
            <MapView
              style={StyleSheet.absoluteFill}
              initialRegion={{
                ...this.state.curLoc,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              ref={c => (this.mapView = c)}
              onPress={this.onMapPress}>
              <Marker.Animated
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}>
                
              </Marker.Animated>
              {this.state.destiLatlng.latitude &&
                Object.keys(this.state.destiLatlng).length > 0 && (
                  <MapView.Marker coordinate={this.state.destiLatlng} />
                )}
              {this.state.destiLatlng.latitude && (
                <MapViewDirections
                  origin={this.state.curLoc}
                  destination={this.state.destiLatlng}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="hotpink"
                  optimizeWaypoints={true}
                  onStart={params => {
                    console.log(
                      `Started routing between "${params.origin}" and "${params.destination}"`,
                    );
                  }}
                  onReady={result => {
                    // console.log('map result' + JSON.stringify(result));
                    console.log(`Distance: ${result.distance} km`);
                    console.log(`Duration: ${result.duration} min.`);
                    this.setState({
                      selectedDist: result.distance.toFixed(2),
                      selectedTime: result.duration.toFixed(2) + 'min',
                    });
                    this.mapView.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        right: width / 20,
                        bottom: height / 20,
                        left: width / 20,
                        top: height / 20,
                      },
                    });
                  }}
                  onError={errorMessage => {}}
                />
              )}
              {/* )} */}
            </MapView>
          ) : null}
        </>

        <TouchableOpacity
          style={{position: 'absolute', top: 20, left: 20}}
          onPress={() => {
            navigation.goBack();
          }}>
       
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              Distance to be covered:
              {'  '}
              {this.state.selectedDist} km
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default CompletTrip;


// import haversine from 'haversine';
// import React, { Component } from 'react';  
// import { Dimensions, View, StyleSheet,TouchableOpacity,Image,Text,Modal, TextInput, ScrollView, StatusBar } from 'react-native'; 
// import MapView,{AnimatedRegion, MarkerAnimated,Polyline} from 'react-native-maps';  
// import { Marker } from 'react-native-maps';  
// import Geolocation from '@react-native-community/geolocation';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.771707;
// const LONGITUDE = -122.4053769;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// export default class completTrip extends Component {  
//     constructor(props) {
//         super(props);
//         this.state = {
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           routeCoordinates: [],
//           distanceTravelled: 0,
//           prevLatLng: {},
//           coordinate: new AnimatedRegion({
//            latitude: LATITUDE,
//            longitude: LONGITUDE
//           })
//         };
//       }

//       componentDidMount() {
//         this.watchID = Geolocation.watchPosition(
//           position => {
//             const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
//             const { latitude, longitude } = position.coords;
            
//             const newCoordinate = {
//               latitude,
//               longitude
//             };
//             if (Platform.OS === "android") {
//               if (this.marker) {
//                 this.marker._component.animateMarkerToCoordinate(
//                   newCoordinate,
//                   500
//                 );
//                }
//              } else {
//                coordinate.timing(newCoordinate).start();
//              }
//              this.setState({
//                latitude,
//                longitude,
//                routeCoordinates: routeCoordinates.concat([newCoordinate]),
//                distanceTravelled:
//                distanceTravelled + this.calcDistance(newCoordinate),
//                prevLatLng: newCoordinate
//              });
//            },
//            error => console.log(error),
//            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//         );
//       }

//       calcDistance = newLatLng => {
//         const { prevLatLng } = this.state;
//         return haversine(prevLatLng, newLatLng) || 0;
//       };

//       getMapRegion = () => ({
//         latitude: this.state.latitude,
//         longitude: this.state.longitude,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA
//       });

//   render() {  
//     return (  
//       <View style={styles.MainContainer}>  
  
//   <MapView
//   style={styles.map}
//   showUserLocation
//   followUserLocation
//   loadingEnabled
//   region={this.getMapRegion()}
// >
//   <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
//   <Marker.Animated
//     ref={marker => {
//       this.marker = marker;
//     }}
//     coordinate={this.state.coordinate}
//   />
// </MapView>
//       </View>  
//     );  
//   }  
// }  
  
// const styles = StyleSheet.create({  
//   MainContainer: {  
//     position: 'absolute',  
//     top: 0,  
//     left: 0,  
//     right: 0,  
//     bottom: 0,  
//     alignItems: 'center',  
//     justifyContent: 'flex-end',  
//   },  
//   mapStyle: {  
//     position: 'absolute',  
//     top: 0,  
//     left: 0,  
//     right: 0,  
//     bottom: 0,  
//   },  
// });  