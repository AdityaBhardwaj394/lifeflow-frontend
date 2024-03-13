import { View, Text, Button } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
const Home = ({navigation}) => {
  const logout =async()=>{
    await auth().signOut().then(()=>{
      console.log('user logged out successfully')
      navigation.navigate('login')
    })
  }
  return (
    <View>

      <Button title="Go to chat" onPress={()=>navigation.navigate('chat')}/>
      <Button title='logout' onPress={logout}/>
    </View>
  )
}

export default Home;