import { View, Text, Button } from 'react-native'
import React from 'react'

const DashBoard = ({navigation}) => {
  return (
    <View>
      <Button title="Go to Login" onPress={()=>navigation.navigate('login')}/>
      <Button title='Go to Register' onPress={()=>navigation.navigate('register')}/>
    </View>
  )
}

export default DashBoard;