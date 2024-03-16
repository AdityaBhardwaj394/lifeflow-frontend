import { View, Text, Button } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import Header from './Header';
import Icon from 'react-native-vector-icons/Entypo';
const Home = ({navigation}) => {
  const logout =async()=>{
    await auth().signOut().then(()=>{
      console.log('user logged out successfully')
      navigation.navigate('DashBoard')
    })
  }
  return (
    <View>
    <Header navigation ={navigation}/>
    


      {/* <Button title="Go to chat" onPress={()=>navigation.navigate('chat')}/> */}
    
    </View>
 
  )
};

export default Home;