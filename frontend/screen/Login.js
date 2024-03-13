import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { setUserEmailRedux,setUserUIDRedux } from '../store/userSlice'
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [password,setpassword] = useState('')
  const [email,setEmail] = useState('')
  const verifylogin=async()=>{
    let res=await auth().signInWithEmailAndPassword(email,password)
    
    if(res && res.user){
      console.log(res);
      dispatch(setUserEmailRedux(res.user.email))
      dispatch(setUserUIDRedux(res.user.uid))
      
      console.log('user logged in')

      navigation.navigate('Home');
    }
  }
  return (
    <View>
    <TextInput placeholder="Email"value={email} onChangeText={setEmail} />
    <TextInput placeholder="password" value={password} onChangeText={setpassword}  />
    <Button title="login" onPress={verifylogin} />
  </View>
  )
}

export default Login;