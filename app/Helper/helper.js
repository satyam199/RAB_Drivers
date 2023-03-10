import React, { Component } from 'react';
import { Dimensions, View, StyleSheet,TouchableOpacity,Image,Text,Modal, TextInput, ScrollView, StatusBar } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service'

export const locationPermission = () => new Promise(async (resolve, reject)=>{
    if(Platform.OS === 'ios'){
        try{
           const permissionStatus = await Geolocation.requestAuthorization('whenInUse')
           if(permissionStatus === 'granted')
           {
            return resolve('granted')
           }
           reject("Permission not granted")
        }catch(error){
         return reject(error,"ppppo")
        }
    }
    return PermissionsAndroid.request(
        
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted)=> {
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            resolve('granted')
        }
        return reject('Location Permission Denied')
    }).catch((error)=>{
        console.log('Ask Location Permission error',error);
    })
})