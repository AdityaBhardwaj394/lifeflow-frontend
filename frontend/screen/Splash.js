import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth, { firebase } from "@react-native-firebase/auth"
import { useDispatch } from 'react-redux'
import Geolocation from 'react-native-geolocation-service';
import {setUserLocation, setUserEmailRedux,setUserUIDRedux } from '../store/userSlice'
import { requestLocationPermission } from '../Usefull_functions/userinfo'
const Splash = ({navigation}) => {
   const dispatch = useDispatch()
  //  requestLocationPermission();
   const [location,setLocation]=useState(false)
  useEffect(()=>{
    const getLocation = () => {
      const result = requestLocationPermission();
      result.then(res => {
        console.log('res is:', res);
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              console.log(position);
              dispatch(setUserLocation({latitude:position.coords.latitude,longitude:position.coords.longitude}))
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
              setLocation(false);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
      // console.log(location);
    };
    console.log(auth().currentUser)
    getLocation();
    if(auth().currentUser){
       console.log(auth().currentUser.email)
       console.log(auth().currentUser.uid)
        dispatch(setUserEmailRedux(auth().currentUser.email))
        dispatch(setUserUIDRedux(auth().currentUser.uid))
        console.log('User is already logged in')

        getLocation();
        navigation.navigate('TabNavigator');
        
      }
      else navigation.navigate('DashBoard');

      
    
  },[])
  return (
    <View>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash