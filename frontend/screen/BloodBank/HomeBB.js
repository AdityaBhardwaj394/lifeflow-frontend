import auth from '@react-native-firebase/auth'
import React from 'react'
import { Button } from 'react-native'
import { View, Text } from 'react-native'
const HomeBB = ({navigation}) => {
  const logout =async()=>{
    await auth().signOut().then(()=>{
      console.log('user logged out successfully')
      navigation.navigate('DashBoard')
    })
  }
  return (
    <View>
      <Text>HomeBB</Text>
      <Button title="Logout" onPress={logout}/>
    </View>
  )
}

export default HomeBB;