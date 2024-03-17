import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import Header from './Header';
import ColorfulCard from "react-native-colorful-card";
import Icon from 'react-native-vector-icons/Entypo';
import Background from '../components/Background';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import axios from 'axios';
const Home = ({navigation}) => {
  const email = auth().currentUser.email;
  const [nearest,setnearest]=useState(null)

  console.log(email);
  const location = useSelector(state => state.user.location);
  console.log(location);
  const logout = async () => {
    await auth().signOut().then(() => {
      console.log('user logged out successfully');
      navigation.navigate('DashBoard');
    });
  }
  useEffect(()=>{
    try{
      if(location.latitude!==0){
      const res=axios.get(`http://192.168.163.190:8001/nearest/?lat=${location.latitude}&lon=${location.longitude}`).then((res)=>{
        setnearest(res.data)

        console.log(res.data.poi.name)
        // hospitalname
        console.log(res.data.dist)

        // hosptaldistance
        // console.log(res.data.)
        // phoneno
         console.log(res.data.address.freeformAddress )
        // email

      }

      )
    }
    }catch(err){
      console.log(err);
    }

  },[location])
  
  return (
    <View style={{
      flex:1,
    }}>
      
      {/* <Header navigation={navigation} /> */}
      {/* Your content here */}
      <ColorfulCard
        title={email}
        value="Welcome"
        valuePostfix=""
        footerTitle=""
        iconImageSource={require("./app-logo.jpeg")}
        footerValue=""
        style={{ backgroundColor: "#7954ff", width: '95%', padding: '10%', margin: '2%', height:'22%'}}
        onPress={() => navigation.navigate('Profile')}
      ></ColorfulCard>

      {
        nearest&&
        <ColorfulCard
        title={nearest?.poi?.name}
        // value={nearest.dist}
        value={`${nearest.dist.toFixed(1)} `}
        valuePostfix="meter away"
        footerTitle=""
        iconImageSource={require("./app-logo.jpeg")}
        footerValue={nearest.address.freeformAddress}
        style={{ backgroundColor: "tomato", width: '95%', padding: '10%', margin: '2%' ,height:'30%' }}
        
      ></ColorfulCard>
      }
      
      <WebView
        source={{ uri: 'https://www.openstreetmap.org/?mlat=28.5899&mlon=77.1453#map=11/28.5899/77.1453' }}
        style={{
         height:50
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0,0,0,0)', // Adjust the last value (0.5) for the opacity
  },
  map: {
    flex: 1,
    height:'100%'
  },
});

export default Home;
