import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import CustomText from '../../../components/customText';
import CustomButton from '../../../components/customButton';
import Language from '../../../utils/localisation';
import { showOrHideModal } from '../../../components/customModal/action';
import styles from './style';
import Constant from '../../../utils/constants';
import { saveLocation } from './action';
import syncStorage from 'sync-storage';
class LocationData extends React.PureComponent {
  onPressPinLocation(selectedLanguage) {
    const {
      navigation,
      searchText,
      screenP,
      locationData,
      showWarningModal,
      savePinnedLocation,route
    } = this.props;
    //  const { No } = route.params
    //  console.log(No,"nnnnonooon");
    console.log(screenP,"locationdata");
    syncStorage.set("search",JSON.stringify(searchText));
    console.log( syncStorage.get("search"),"location data"); 
    if (searchText && locationData.address_components) {
      savePinnedLocation(locationData);
     // navigation.pop(); 
      if(screenP == 0){
        navigation.pop();  
      }
      else if(screenP == 1){
        navigation.navigate(Constant.App.stackNames.DashBoard,{screen: 'addActivityStepTwo',params : {locationData}});
      }
    } else {
      showWarningModal({
        success: false,
        title: selectedLanguage.title.alert,
        message: selectedLanguage.error.serverError
      });
    }
  }

  render() {
    const { lang, locationData,searchText } = this.props;
    const selectedLanguage = Language[lang];
    return (
      <View style={styles.bottomView}>
        {locationData && locationData.formatted_address ? (
          <View style={styles.addressView}>
            <CustomText style={styles.addressTextStyle}>
              {locationData.formatted_address}
              {console.log(locationData.formatted_address,"data of map")}
            </CustomText>
          </View>
        ) : null}
        
        {locationData && locationData.formatted_address ? (
          <View style={styles.bottomContainer}>
            <CustomButton
              buttonStyle={styles.fpButtonStyle}
              textStyle={styles.fpButtonTextStyle}
              text={selectedLanguage.mapScreen.save}
              onPress={() => this.onPressPinLocation(selectedLanguage)}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.authLoadingReducer.selectedLanguage,
  locationData: state.mapReducer.geolocation,
});

const mapDispatchToProps = dispatch => ({
  savePinnedLocation: value => dispatch(saveLocation(value)),
  showWarningModal: value => dispatch(showOrHideModal(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationData);