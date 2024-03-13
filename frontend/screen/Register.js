import { View, Text,Button } from 'react-native'
import React from 'react'

const Register = ({navigation}) => {
  return (
    <View>
      <Button title="Register as BloodBank" onPress={()=>navigation.navigate('BBRegisterSearch')}/>
      <Button title="Register as User" onPress={()=>navigation.navigate('UserRegister')}/>
    </View>
  )
}

export default Register;