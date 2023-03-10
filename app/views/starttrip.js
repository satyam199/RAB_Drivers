import React, { Component } from 'react';
import { Dimensions, View, StyleSheet,TouchableOpacity,Image,Text, Pressable, Modal, Alert, ScrollView, StatusBar } from 'react-native';
// import { View } from 'react-native-animatable';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyDqZ6kiQVS5um4kEbO5vMgbnYjxreGWCDg';


class ConfirmRide extends Component {

  state={
    modalVisible:false,
  };

  constructor(props) {
    super(props);

    // this.state = {
    //   modalVisible:false,
    // };

    this.state = {
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ],
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
    };

    this.mapView = null;

  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }
  mapViewThis(){
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
      onPress={this.onMapPress}
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
          strokeWidth={3}
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

  modalView(){
    return(
      <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
         >
        <View style={Style.centeredView}>
               <ImageBackground 
                  source={require('../../asets/icons/onbaord_bg.png')}>
        {/* <Image style={Style.backgroundImage}
          source={require('../../asets/icons/travel-splash23.png')}/> */}
          <View style={Style.modalView}>
          <Image style={Style.correctImage}
            source={require('../../asets/icons/correct.png')}/>
            <Text style={Style.modalTextcongratulation}>CONGRATULATIONS</Text>
            <Text style={Style.modalTextlorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>
            <Pressable
              style={[Style.buttonmodal, Style.buttonClose]}
            
            onPress={()=>this.props.navigation.navigate("BottomTab")}
            >
              <Text style={Style.textStylemodal}>OKAY</Text>
            </Pressable>
          </View>
          </ImageBackground>
        </View>
      </Modal>
  </ >
    )
  }

  render() {
    
    return (  
      
      <>
        {/* {this.mapViewThis()} */}

       <View>
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
       <View style={Style.container}>
        <ScrollView>
      <View>
         </View>

        <View style={Style.forImageCall}>
            <View style={Style.image}>
            <Image style={Style.customerImage}
            source={require('../../asets/icons/Group1212.png')}/>
            </View>
            <Text style={Style.name}>Mark Smith</Text>
            <Text style={Style.customer}>Customer</Text>
            <TouchableOpacity>
            <Image style={Style.callImage}
          source={require('../../asets/icons/Group1428.png')}/>
          </TouchableOpacity>
        </View>

        {/* <Modal
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
          source={require('../../asets/icons/travel-splash23.png')}/>
          <View style={Style.modalView}>
          <Image style={Style.correctImage}
            source={require('../../asets/icons/correct.png')}/>
            <Text style={Style.modalTextcongratulation}>CONGRATULATIONS</Text>
            <Text style={Style.modalTextlorem}>Lorem ipsum is simply dummy text of the printing and typesetting industry</Text>
            <Pressable
              style={[Style.buttonmodal, Style.buttonClose]}
            
            onPress={()=>navigation.navigate("BottomTab")}
            >
              <Text style={Style.textStylemodal}>OKAY</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}


      <Pressable
        style={[Style.button, Style.buttonOpen]}
        onPress={() => this.setState({modalVisible:true })}>
        <Text style={Style.textStyle}>MARK AS COMPLETED</Text>
      </Pressable>

        <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate("Cancel")}
        style={Style.forcancel}>
            <Text style={Style.cencel}>CANCEL</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
        
         
         </View> 

         {this.state.modalVisible && this.modalView()}
      
        {/* {this.mapViewThis()} */}
      
      </>
     
    );
  }
}

const Style = StyleSheet.create({
  forImageCall:{
    // width:'100%',
    height:100,
    backgroundColor:"#2d2d2d",
    marginHorizontal:20,
    marginTop:400,
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
    fontSize:16,
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
forMakeAsCompleted:{
    backgroundColor:"#ee003d",
    marginHorizontal:20,
    marginTop:10,
    height:50,
    borderRadius:8,
},
makeAsCompleted:{
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
map:{
    width:200,
    height:400,
},
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
  button: {
    backgroundColor:"#ee003d",
    marginHorizontal:20,
    marginTop:10,
    height:55,
    borderRadius:8,
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
    // marginHorizontal:10,
    fontFamily:'Roboto',
    opacity:0.6,
  },
  backgroundImage:{
    position:"absolute",
    width:400,
    height:800,
  },
  correctImage:{
    width:100,
    height:100,
    marginTop:-50,
  },
  callImage:{
    width:54,
    height:54,
    marginTop:-20,
    // marginLeft:240,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'flex-end',
    marginHorizontal:20
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