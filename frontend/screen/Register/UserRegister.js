import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
const UserRegister = ({navigation}) => {
  const [password,setpassword] = useState('')
  const [email,setEmail] = useState('')
  // console.log(name)
  const register= async ()=>{
    await auth().createUserWithEmailAndPassword(email,password).then(
      ()=>{
         navigation.navigation('login')
      }
    ).catch(err=>{
      if (err.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(err);
    })
    
  }
  return (
    <View>
      <TextInput placeholder="Email"value={email} onChangeText={setEmail} />
      <TextInput placeholder="password" value={password} onChangeText={setpassword}  />
      <Button title="Register" onPress={register} />
    </View>
  )
}

export default UserRegister