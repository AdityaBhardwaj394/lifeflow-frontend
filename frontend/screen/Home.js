import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import Header from './Header';
import Icon from 'react-native-vector-icons/Entypo';
import Background from '../components/Background';
const Home = ({navigation}) => {
  const logout =async()=>{
    await auth().signOut().then(()=>{
      console.log('user logged out successfully')
      navigation.navigate('DashBoard')
    })
  }
  return (
    <ImageBackground
    source={require('./icon1.png')}
    resuzeMode="cover"
    style={styles.backgroundImage}
  >
    <Header navigation={navigation} />
    {/* Your content here */}
  </ImageBackground>
  )
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0,0,0,0)', // Adjust the last value (0.5) for the opacity
  },
});
export default Home;