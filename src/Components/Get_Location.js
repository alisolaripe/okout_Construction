import {PermissionsAndroid} from "react-native";
import Geocoder from "react-native-geocoder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
const GLOBAL = require("./Global");

export async function requestLocationPermission (){
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === 'granted') {

        return true;
      } else {

        return false;
      }
    } catch (err) {
      return false;
    }
  };

  return (
    requestLocationPermission().then(res => {

      return res
    })
.catch(error => console.log("dd", error)));
}
export async function geocodePosition (NY){
  // useEffect(() => {
  //   Geocoder.fallbackToGoogle(GLOBAL.mapKeyValue);
  // })
  Geocoder.fallbackToGoogle(GLOBAL.mapKeyValue);
  return (
    Geocoder.geocodePosition(NY).then(res => {
      return res
    })
      .catch(err => console.log(err, "errrrr"))

  );
}
export async function writeDataStorage (key, obj){
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (e) {
  }
}
export async function removeDataStorage (key){
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
  }
}
