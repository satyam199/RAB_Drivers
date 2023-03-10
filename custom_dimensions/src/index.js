import { Dimensions, Platform } from 'react-native';
import { getBottomSpace, isIphoneX } from '../../components/iPhoneXHelper';

const IS_ANDROID = Platform.OS === 'android';

const { height, width } = Dimensions.get('window');

export default {
  ANDROID_STATUSBAR: 24,
  DEVICE_HEIGHT: IS_ANDROID ? height : height - getBottomSpace(),
  DEVICE_WIDTH: width,
};