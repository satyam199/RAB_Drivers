import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainerStyle: {
    elevation: 2,
    shadowOffset: {width: 2, height: 3},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 10,
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 30,
    backgroundColor: 'gray',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 16
  },
});
