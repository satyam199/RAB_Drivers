import React from 'react';
import { Text, View, Image } from 'react-native';

const LedgerScreen = () => {
  return (
    <>
    <Image style={{flex: 1,
        position:'absolute',
        width:'150%',
        // height:verticalScale(1300),
        height:'150%',
        }}
    source={require('../../asets/icons/travel-splash23.png')} />
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: 'center'}}>
    {/* <Image style={{width: 60, height: 70}}
                source={require('../../asets/icons/newSearch.png')} /> */}
    <Text style = {{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>
        Oh No!
      </Text>
      <Text style = {{ color: 'white',}}>
        Oops! We couldn't find any experiences that matched. 
      </Text>
    </View>
    </>
  );
}

export default LedgerScreen;