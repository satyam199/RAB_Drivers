// import React, {Component} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// class Storage extends Component {
//   static get = async (key) => {
//     try {
//       const jsonValue = await AsyncStorage.getItem(key)
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch(e) {}
//   }

//   static set = async (key, value) => {
//     try {
//       return await AsyncStorage.setItem(key, JSON.stringify(value))
//     } catch (e) {}
//   }
// }

// export default Storage;

import AsyncStorage from '@react-native-async-storage/async-storage';

export function setToken(key,value) {//storing id
    if(key !== null && value!== null){
       return AsyncStorage.setItem(key, value);
    } 
  } 
  
  
  export const readName =async(key)=> {
    try {
      const userAge = await AsyncStorage.getItem(key)
      //console.log(userAge,"SsSsS");
      if (userAge !== null  && userAge ) {
        return userAge
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  export function setData(key,value) {//storing id
    if(key !== null && value!== null){
       return AsyncStorage.setItem(key, value);
    } 
  } 
   
  export const readData =async(key)=> {
    try {
      const user = await AsyncStorage.getItem(key)
      console.log(user,"wewewe");
      if (user !== null  && user ) {
        return user
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  export function setValue(key,value) {//storing id
    if(key !== null && value!== null){
       return AsyncStorage.setItem(key, value);
    } 
  } 
   
  export const readValue =async(key)=> {
    try {
      const user = await AsyncStorage.getItem(key)
      console.log(user,"wewewe");
      if (user !== null  && user ) {
        return user
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  export const removeItemValue= async (key) =>{
    try {
        await AsyncStorage.removeItem(key);
    }
    catch(exception) {
        return false;
    }
  }