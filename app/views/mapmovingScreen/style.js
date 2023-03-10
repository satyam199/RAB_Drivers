import { StyleSheet } from 'react-native';
import Constant from '../../../utils/constants';
import metrices from '../../../utils/metrices';

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  map: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  markerStyle: { height: 50, width: 50 },
  markerViewStyle: {
    flex: 1,
    top: '43%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  bottomView: {
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center',
    width: metrices.DEVICE_WIDTH * 0.8,
  },
  addressView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  bottomContainer: {
    marginTop: metrices.DEVICE_HEIGHT * 0.03,
  },
  addressTextStyle: {
    color: 'black',
    fontSize: Constant.App.fontSize.largeMedium,
    textAlign: 'center',
  },
  fpButtonStyle: {
    backgroundColor: Constant.App.colors.buttonThemeColor,
    width: metrices.DEVICE_WIDTH * 0.9,
    padding: 15,
    borderRadius: 30,
    alignSelf: 'center',
  },
  fpButtonTextStyle: {
    fontSize: Constant.App.fontSize.medium,
    color: 'white',
    textAlign: 'center',
  },

  serachParentContainer: {
    position: 'absolute',
    top: '3%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 15,
    backgroundColor: 'white',
    width: metrices.DEVICE_WIDTH * 0.9,
  },
  buttonContainerStyle: {
    
    marginBottom: 30,
    alignSelf: 'center',
    width: metrices.DEVICE_WIDTH * 0.6,
    backgroundColor: Constant.App.colors.buttonThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Constant.App.dimen.buttonPadding,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 56, height: 13 },
    borderWidth: 0,
    borderRadius: 0,
},
buttonContainer1Style: {
  marginBottom: 20,
  marginLeft: 10,
  alignSelf: 'center',
  width: metrices.DEVICE_WIDTH * 0.4,
  height: 40,
  backgroundColor: '#FDEFD3',
  justifyContent: 'center',
  alignItems: 'center',
  //padding: Constant.App.dimen.buttonPadding,
  shadowColor: 'black',
  shadowOpacity: 0.9,
  elevation: 6,
  shadowRadius: 15,
  shadowOffset: { width: 56, height: 13 },
  borderWidth: 0,
  borderRadius: 1,
},
  textInputStyle: {
    width: metrices.DEVICE_WIDTH * 0.9 - 20,
  },
  separtorStyle: {
    width: metrices.DEVICE_WIDTH,
    height: 1 / 2,
    backgroundColor: 'grey',
  },
  flatlistContainer: {
    marginTop: 5,
  },
  inputContainerStyle: {
    width: '99%' ,
    alignSelf: 'center',
    flexDirection: 'column',
    borderBottomColor: '#B9B9B9',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    marginTop: 15,
    paddingVertical: 5,
},
inputContainerStyle1: {
  width: metrices.DEVICE_WIDTH * 0.8 ,
  alignSelf: 'center',
  flexDirection: 'column',
  borderBottomColor: '#B9B9B9',
  borderBottomWidth: 1,
  justifyContent: 'space-between',
  marginTop: 15,
  paddingVertical: 5,
},
labelTextStyle: {
    color: '#3E3E3E',
    fontSize: Constant.App.fontSize.smallMedium
},
inputTextStyle: {
    width: metrices.DEVICE_WIDTH * 0.9,
    fontSize: Constant.App.fontSize.medium,
    marginTop: 5,
    color: 'white',
},
boxStyle:{
  width:'90%',
  height:'60%',
  backgroundColor:'#FFFAFA',
  alignSelf:'center',
  marginVertical:'50%',
  borderRadius:8,
},
boxStyle1:{
  width:'90%',
  height:'40%',
  backgroundColor:'#FFFAFA',
  alignSelf:'center',
  marginVertical:'50%',
  borderRadius:8,
}
});

export default styles;
