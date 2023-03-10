
import { Dimensions } from "react-native";


export const RfW = value => {
    const dim = Dimensions.get('window');
    return dim.width * (value / STANDARD_SCREEN_DIMENSIONS.width);
  };
  
  export const RfH = value => {
    const dim = Dimensions.get('window');
    return dim.height * (value / STANDARD_SCREEN_DIMENSIONS.height);
  };

  export const STANDARD_SCREEN_DIMENSIONS = {height: 812, width: 375};