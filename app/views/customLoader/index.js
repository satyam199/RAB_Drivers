import React from 'react';
import {View, ActivityIndicator, Modal, Text} from 'react-native';
import style from './style';

const CustomLoader = props => {
  const {showLoader} = props;
  return (
    showLoader && (
      <Modal
        animationType="fade"
        onRequestClose={() => {}}
        transparent
        isVisible={showLoader}>
        <View style={style.parentContainerStyle}>
          <View style={style.innerContainerStyle}>
            <ActivityIndicator
              color= 'white'
              size="large"
            />
          </View>
          <Text style={style.textStyle}>Loading...</Text>
        </View>
      </Modal>
    )
  );
};

export default CustomLoader;
