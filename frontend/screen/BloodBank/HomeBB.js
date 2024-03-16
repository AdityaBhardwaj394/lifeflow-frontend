import auth from '@react-native-firebase/auth'
import React from 'react'
import { Button } from 'react-native'
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
    </View>
  )
}

export default HomeBB;