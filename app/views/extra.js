import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet,TouchableOpacity,Image,Text,Modal, ScrollView, } from 'react-native';
import { View } from 'react-native-animatable';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Constant from '../../../../utils/constants';
import CustomButton from '../../../../components/customButton';
import CustomTextInput from '../../../../components/customTextInput';
import CustomText from '../../../../components/customText';
import styles from './style';
import Language from '../../../../utils/localisation';
import metrices from '../../../../utils/metrices';
import { RadioButton, DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyDqZ6kiQVS5um4kEbO5vMgbnYjxreGWCDg';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E0931C',
    accent: '#E0931C',
  },
};

class ConfirmRide extends React.PureComponent {

  constructor(props) {
    super(props);

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
  componentDidMount(){
    const { lang, navigation,route } = this.props;
    const selectedLanguage = Language[lang];
    // const {show} = route.params
    const {confirmR} = this.state
    console.log(confirmR,"confirmR");
    return(
      <>
      {confirmR == 1?
        this.setState({showConfirmBoxModal: true}):<></>
      }
      </>
      
    
    )
  }

  createModalBox() {
    const { showBoxModal, showNewBoxModal,showConfirmBoxModal,checked1,checked2,checked3,checked,EXPENSES,mapCount } = this.state
    const { lang, navigation,route } = this.props;
    const selectedLanguage = Language[lang];
    const {id} = route.params
    return (
      <>
        <Modal
          animationType='slide'
          transparent={true}
          visible={showBoxModal}
        >
          <View style={styles.boxStyle}>
            <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.largeMedium, fontWeight: 'bold', color: '#000000', marginTop: 20, marginHorizontal: 15,borderBottomWidth:1,borderBottomColor:'#8C8C8C' }]}>
              {"Choose Reason"}
            </CustomText>
            <View style={{flexDirection:'column',marginTop:10}}>
             <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="first"
                  theme={theme}
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => { this.setState({ checked: 'first'}) }  }
                />
                <CustomText style={[styles.labelTextStyle, {marginStart: 10,  color: '#3E3E3E',marginTop:10 }]}>
                  {"toll"}
                </CustomText>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="first"
                  theme={theme}
                  status={checked1 === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => { this.setState({ checked1: 'first'}) }  }
                />
                <CustomText style={[styles.labelTextStyle, {marginStart: 10,  color: '#3E3E3E',marginTop:10 }]}>
                  {"Food"}
                </CustomText>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="first"
                  theme={theme}
                  status={checked2 === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => { this.setState({ checked2: 'first' }) }  }
                />
                <CustomText style={[styles.labelTextStyle, {marginStart: 10,  color: '#3E3E3E',marginTop:10 }]}>
                  {"Halt"}
                </CustomText>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="first"
                  theme={theme}
                  status={checked3 === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => { this.setState({ checked3: 'first'}) }  }
                />
                <CustomText style={[styles.labelTextStyle, {marginStart: 10,  color: '#3E3E3E',marginTop:10 }]}>
                  {"Other"}
                </CustomText>
              </View>
            </View>
           
            {/ {this.renderItemsView()} /}
            <View  style={{flexDirection:'row',borderTopColor:'#707070',borderTopWidth:1}}>
            <TouchableOpacity onPress={() => this.setState({ showBoxModal: false,button: 1 })}>
              <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.largeMedium, color: '#E09300', marginVertical: 10, marginLeft: "60%" }]}>
                {"Cancel"}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showBoxModal: false, button: 1 })}>
              <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.largeMedium, color: '#E09300', marginVertical: 10}]}>
                {"Pause"}
              </CustomText>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>



        <Modal
          animationType='slide'
          transparent={true}
          visible={showNewBoxModal}   
        >
        <ScrollView >
          <View style={[styles.boxStyle,{height: '37%',}]}>
            <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.largeMedium, fontWeight: 'bold', color: '#000000', marginTop: 20, marginHorizontal: 15,borderBottomWidth:1,borderBottomColor:'#8C8C8C' }]}>
              {"Add Expenses"}
            </CustomText>
            <View style={{flexDirection:'column',marginTop:10}}>
             <View style={{flexDirection: 'row'}}>
                <CustomText style={[styles.labelTextStyle, {marginStart: 10,  color: '#707070',marginTop:10, }]}>
                  {"Please let us know how much expenses you till during this pause and upload bill."}
                </CustomText>
              </View>
            </View>
          <View style={{borderColor:'#707070',borderWidth:1.5,height:40,width:'50%',marginHorizontal:10,marginVertical:20,borderRadius:5}}>
        <View style={{ flexDirection:'row'}}>
          <CustomText style={[styles.labelTextStyle, {marginStart: 10,  color: '#000000',marginTop:10,fontSize: Constant.App.fontSize.largeMedium, }]}>
                  {"$"}
             </CustomText>
            <CustomTextInput
                  maxLength={10}
                  value={EXPENSES}
                  returnKeyType="next"
                  autoCapitalize="none"
                  placeholder={"0.00"}
                  placeholderTextColor={'#3E3E3E'}
                  style={styles.inputTextStyle}
                  onChangeText={value => this.setState({ EXPENSES : value })}
                />
          </View>
            </View>
            <View  style={{flexDirection:'row',borderTopColor:'#707070',borderTopWidth:1}}>
            <TouchableOpacity onPress={() => this.setState({ showNewBoxModal: false,button: 1 })}>
              <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.largeMedium, color: '#E09300', marginVertical: 10, marginLeft: "60%" }]}>
                {"Cancel"}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {this.setState({confirmR: 1}) , navigation.navigate(Constant.App.stackNames.OnBoard,{screen:'mapScreen', params: {mapCount,id} })}} >
              <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.largeMedium, color: '#E09300', marginVertical: 10}]}>
                {"Submit"}
              </CustomText>
            </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </Modal>

        <Modal
          animationType='slide'
          transparent={true}
          visible={showConfirmBoxModal}   
        >
          <View style={styles.boxStyle1}>
            <Image style={{ width: 36, height: 36, alignSelf: 'center', marginTop: 10 }}
              resizeMode="contain"
              source={Constant.App.staticImages.locationImage}
            />
            <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.medium, fontWeight: 'bold', color: '#000000', marginTop: 10, marginHorizontal: 15 }]}>
              {selectedLanguage.mapScreen.newBoxHeader}
            </CustomText>
            <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.smallMedium, color: '#707070', marginHorizontal: 15, marginTop: 5 }]}>
              {selectedLanguage.mapScreen.nextText}
            </CustomText>
            <View style={[styles.inputContainerStyle1, { backgroundColor: '#F5F5F5', borderRadius: 5, borderBottomWidth: 0 }]}>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 40, height: 40, marginHorizontal: 5, marginRight: 10,marginTop:'3%' }}
                    resizeMode="contain"
                    source={Constant.App.staticImages.person}
                  />
                  <View style={{ flexDirection: 'column' }}>
                    <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.largeMedium, fontWeight: 'bold', color: '#000000', marginHorizontal: 10,marginVertical:'3%' }]}>
                      {selectedLanguage.mapScreen.textOne}
                    </CustomText>
                    <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.medium, color: '#434343', marginHorizontal: 10,}]}>
                      {selectedLanguage.mapScreen.textTwo}
                    </CustomText>
                  </View>
                  <View style={[styles.buttonContainer1Style, { width: 75, height: 35, backgroundColor: '#F9C662', borderRadius: 2,marginLeft:'auto',marginHorizontal:10,marginTop:'3%' }]}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image style={{width: 13, height: 13, marginHorizontal: 5, marginRight: 10 }}
                        resizeMode="contain"
                        source={Constant.App.staticImages.call}
                      />
                      <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.smallMedium, fontWeight: 'bold', color: '#000000', }]}>
                        {"Call"}
                      </CustomText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <CustomButton
              buttonStyle={[styles.buttonContainerStyle,{width: metrices.DEVICE_WIDTH * 0.4, height:"15%", marginTop:20, padding:0}]}
              textStyle={styles.labelTextStyle}
              text={"Reached to pickup".toUpperCase()}
              onPress={() => {
                this.setState({showNewBoxModal:false,count : '2'})
              }}
            /> 
          </View>
        </Modal>
      </>
    )
  }


  render() {
    const {navigation, lang} = this.props
    const {chooseReason,showBoxModal,showNewBoxModal,showConfirmBoxModal,button} = this.state 
    const selectedLanguage = Language[lang];
    return (
      
      // <MapView
      //   initialRegion={{
      //     latitude: LATITUDE,
      //     longitude: LONGITUDE,
      //     latitudeDelta: LATITUDE_DELTA,
      //     longitudeDelta: LONGITUDE_DELTA,
      //   }}
      //   style={StyleSheet.absoluteFill}
      //   ref={c => this.mapView = c}
      //   onPress={this.onMapPress}
      // >
      //   <TouchableOpacity
      //             onPress={() => {
      //               navigation.navigate(Constant.App.stackNames.DashBoard,{screen:'home'}) ;
      //             }}>
      //             <Image
      //               style={{  width: 24,
      //                 height: 24,}}
      //               resizeMode="contain"
      //               source={Constant.App.staticImages.ImageBack}
      //             />
      //           </TouchableOpacity>
      //   {this.state.coordinates.map((coordinate, index) =>
      //     <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
      //   )}
      //   {(this.state.coordinates.length >= 2) && (
      //     <MapViewDirections
      //       origin={this.state.coordinates[0]}
      //       waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
      //       destination={this.state.coordinates[this.state.coordinates.length-1]}
      //       apikey={GOOGLE_MAPS_APIKEY}
      //       strokeWidth={3}
      //       strokeColor="hotpink"
      //       optimizeWaypoints={true}
      //       onStart={(params) => {
      //         console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
      //       }}
      //       onReady={result => {
      //         console.log(`Distance: ${result.distance} km`)
      //         console.log(`Duration: ${result.duration} min.`)

      //         this.mapView.fitToCoordinates(result.coordinates, {
      //           edgePadding: {
      //             right: (width / 20),
      //             bottom: (height / 20),
      //             left: (width / 20),
      //             top: (height / 20),
      //           }
      //         });
      //       }}
      //       onError={(errorMessage) => {
      //         // console.log('GOT AN ERROR');
      //       }}
      //     />
      //   )}
      // </MapView>
      <>
      
        {this.mapViewThis()}
       
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              resizeMode="contain"
              source={Constant.App.staticImages.backArrowNew}
            />
          </TouchableOpacity>
          <View>
            {button == 0?
             <CustomButton
             buttonStyle={styles.buttonContainerStyle}
             textStyle={styles.labelTextStyle}
             text={"Pause Trip".toUpperCase()}
             onPress={() => {this.setState({showBoxModal:true}) }}
           />  :
           <CustomButton
           buttonStyle={styles.buttonContainerStyle}
           textStyle={styles.labelTextStyle}
           text={"Resume Trip".toUpperCase()}
           onPress={() => {this.setState({showNewBoxModal:true,}) }}
         />
          
          }
            
  
            <TouchableOpacity>
              <CustomText style={[styles.labelTextStyle, { fontSize: Constant.App.fontSize.medium, fontWeight: 'bold', color: '#E09300', alignSelf: 'center', marginTop: 10, textDecorationLine: 'underline' }]}>
                {"View Trip Details"}
              </CustomText>
            </TouchableOpacity>
          </View>
         
        </View>
        {showBoxModal && this.createModalBox()}
        {showNewBoxModal && this.createModalBox()}
        {showConfirmBoxModal && this.createModalBox()}
      </>
     
    );
  }
}



const mapStateToProps = state => ({
  lang: state.authLoadingReducer.selectedLanguage,
  localStoreData: state.authLoadingReducer.localStoreData,
});

const mapDispatchToProps = dispatch => ({
  showWarningModal: value => dispatch(showOrHideModal(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRide);