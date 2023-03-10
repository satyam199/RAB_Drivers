import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  PermissionsAndroid,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CustomTextInput from '../../../components/customTextInput';
import Constant from '../../../utils/constants';
import Language from '../../../utils/localisation';
import { showOrHideModal } from '../../../components/customModal/action';
import { displayConsole } from '../../../utils/helper';
import {
  locationDataSearch,
  clearLocationData,
  locationApihit,
  hitGeoCodingApi,
  autoCompleteSearch,
  saveLocation,
} from './action';
import styles from './style';
import LocationData from './locationData';
import metrices from '../../../utils/metrices';
import BoldCustomText from '../../../components/customText/boldCustomText';
import locationData from './locationData';
import syncStorage from 'sync-storage';

const deltas = {
  latitudeDelta: 0.04864195044303443,
  longitudeDelta:
    (Dimensions.get('window').width / Dimensions.get('window').height) *
    0.04864195044303443,
};
let count = 1;

class MapScreen extends React.PureComponent {
  
  state = {
    searchText: '',
    placeId: '',
    address: '',
    showAutoComplete: false,
    impData: '',
    screenP: ''

  };

  async componentDidMount() {
    const { clearLocation } = this.props;
    clearLocation();
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
              this.getGeocoderData(
                position.coords.latitude,
                position.coords.longitude,
                true,
              );
            },
            error => {
              displayConsole('error', error.message);
            },
            { enableHighAccuracy: true, timeout: 15000 },
          );
        } else {
          displayConsole('Location permission denied');
        }
      } catch (err) {
        displayConsole('loc error', err);
      }
    } else {
      Geolocation.getCurrentPosition(position => {
        this.getGeocoderData(
          position.coords.latitude,
          position.coords.longitude,
          true,
        );
      });
    }
  }

  getGeocoderData(lat, lng, isFirstTime) {
    console.log("in");
    const { geoCodingApi } = this.props;
    displayConsole('getGeocoderData function', lat, lng);
    const data = {
      params: `${lat},${lng}`,
      isFirstTime: isFirstTime,
    };
    geoCodingApi(data);
    console.log( geoCodingApi(data),"/////////////////");
  }

  onRegionChange(region) {
    if (region.latitude && region.longitude) {
      console.log("region",region);
      displayConsole('onRegionChange region', region);
      this.getGeocoderData(region.latitude, region.longitude, false);
     
    }
  }

  onChangeSearchText() {
    const { searchLocationData } = this.props;
    const { searchText } = this.state;
    console.log( searchText," searchText");
    if (searchText) {
      this.setState({
        showAutoComplete: false,
      })
      searchLocationData(searchText);
    }
  }

  renderData(item, index) {
    return (
      <TouchableOpacity
        onPress={() => {
          const { getLocationDetailData } = this.props;
          getLocationDetailData(item.place_id)
          this.setState({
            showAutoComplete: false,
            searchText: item.description,
          })
        }}>
        <View
          style={{
            width: metrices.DEVICE_WIDTH * 0.9,
            alignSelf: 'center',
            backgroundColor: 'white',
            padding: 10,
            borderBottomColor: 'grey',
            borderBottomWidth: 0.5,
          }}>
          <BoldCustomText
            style={{
              color: 'black',
              fontSize: 18,
            }}>
            {item.description}
          </BoldCustomText>
        </View>
      </TouchableOpacity>
    )
  }

  renderSearchListing() {
    const { autoCompleteData } = this.props;
    return (
      <View
        style={{
          top: '10%',
          maxHeight: '32%',
        }}>
        <FlatList
          data={autoCompleteData}
          renderItem={({ item, index }) => this.renderData(item, index)}
        />
      </View>
    );
  }

  renderSearch(selectedLanguage) {
    const { searchText } = this.state;
    const { autoComplete } = this.props;
    return (
      <View style={styles.serachParentContainer}>
        <View style={styles.searchContainer}>
          <CustomTextInput
            returnKeyType="done"
            value={searchText}
            autoCapitalize="none"
            style={styles.textInputStyle}
            placeholder={selectedLanguage.mapScreen.search}
            placeholderTextColor={'grey'}
            onChangeText={value => {
              this.setState({
                searchText: value,
                showAutoComplete: true,
              });
              autoComplete(value);
            }}
            onSubmitEditing={() => this.onChangeSearchText()}
          />
        </View>
      </View>
    );
  }

  renderMapViewIos() {
    const { locationData } = this.props;
    console.log("locationData",locationData);
    return (
      <MapView
        initialRegion={{
          latitude: parseFloat(locationData.geometry.location.lat),
          longitude: parseFloat(locationData.geometry.location.lng),
          latitudeDelta: deltas.latitudeDelta,
          longitudeDelta: deltas.latitudeDelta,
        }}
        region={{
          latitude: locationData.geometry.location.lat,
          longitude: locationData.geometry.location.lng,
          latitudeDelta: deltas.latitudeDelta,
          longitudeDelta: deltas.latitudeDelta,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onRegionChange={value => {
          count = count + 1;
          if (count > 2) {
            displayConsole('onRegionChange', value);
            this.onRegionChange(value);
          }
        }}
      />
    );
  }

  renderMapViewAndroid() {
    const { locationData } = this.props;
    const {impData} = this.state
   // console.log(locationData.geometry.location,"..........location............");
    syncStorage.set("latitude",JSON.stringify(locationData.geometry.location.lat));
    syncStorage.set("longitude",JSON.stringify(locationData.geometry.location.lng));
   // console.log( syncStorage.get("latitude"),syncStorage.get("longitude"),"latitudeLongitude"); 
    return (
      <MapView
        initialRegion={{
          latitude: parseFloat(locationData.geometry.location.lat),
          longitude: parseFloat(locationData.geometry.location.lng),
          latitudeDelta: deltas.latitudeDelta,
          longitudeDelta: deltas.latitudeDelta,
        }}
        region={{
          latitude: locationData.geometry.location.lat,
          longitude: locationData.geometry.location.lng,
          latitudeDelta: deltas.latitudeDelta,
          longitudeDelta: deltas.latitudeDelta, 
        }}
        showsIndoors={true}
        showsBuildings={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onRegionChangeComplete={value => {
          count = count + 1;
          if (count > 2) {
            displayConsole('onRegionChangeComplete', value);
            this.onRegionChange(value);
          }
        }}
        
      />
    );
  }

  render() {
    const { lang, navigation, locationData,route } = this.props;
    const selectedLanguage = Language[lang];
    const {No} = route.params
    this.setState({screenP : No})
    const { showAutoComplete,impData } = this.state;
    const { searchText,screenP } = this.state;
    console.log( searchText," searchText");
    return (
      <View style={styles.parentContainer}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 28,
                  height: 28,
                }}
                resizeMode="contain"
                source={Constant.App.staticImages.backArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.parentContainer}>
          {Platform.OS === 'ios' && locationData && locationData.geometry
            ? this.renderMapViewIos()
            : null}
          {Platform.OS === 'android' && locationData && locationData.geometry
            ? this.renderMapViewAndroid()
            : null}
          {this.renderSearch(selectedLanguage)}
          {showAutoComplete && this.renderSearchListing()}

          <View style={styles.markerViewStyle}>
            <Image
              style={styles.markerStyle}
              resizeMode="contain"
              source={Constant.App.staticImages.marker}
            />
          </View>
          <LocationData navigation={navigation} searchText={searchText} screenP = {screenP} />
         {/* {(props) => <LocationData {...props} navigation={navigation} searchText={searchText} No = {No.route.params} />}  */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.authLoadingReducer.selectedLanguage,
  locationData: state.mapReducer.locationData,
  autoCompleteData: state.mapReducer.autoCompleteData,
});

const mapDispatchToProps = dispatch => ({
  showWarningModal: value => dispatch(showOrHideModal(value)),
  savePinnedLocation: value => dispatch(saveLocation(value)),
  searchLocationData: value => dispatch(locationDataSearch(value)),
  clearLocation: () => dispatch(clearLocationData()),
  getLocationDetailData: id => dispatch(locationApihit(id)),
  geoCodingApi: value => dispatch(hitGeoCodingApi(value)),
  autoComplete: value => dispatch(autoCompleteSearch(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapScreen);

