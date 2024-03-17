import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';
import { requestLocationPermission } from '../Usefull_functions/userinfo';
import { setUserEmailRedux, setUserLocation, setUserUIDRedux } from '../store/userSlice';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    const getLocation = async () => {
      const result = await requestLocationPermission();
     // console.log('res is:', result);
      if (result) {
        Geolocation.getCurrentPosition(
          position => {
            dispatch(setUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude}));
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
          //  console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    };

    const fetchData = async () => {
    //  console.log(auth().currentUser);
      getLocation();
      if (auth().currentUser) {
     //   console.log(auth().currentUser.email);
       // console.log(auth().currentUser.uid);
        dispatch(setUserEmailRedux(auth().currentUser.email));
        dispatch(setUserUIDRedux(auth().currentUser.uid));
        //console.log('User is already logged in');

        getLocation();
        const status = await EncryptedStorage.getItem("status");
        console.log("status",status)
        // Handle navigation based on user status
        navigation.navigate(status === "entity" ? 'TabNavigatorBB' : 'TabNavigator');
      }else{
        navigation.navigate("DashBoard");
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
