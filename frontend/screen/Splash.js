import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import auth, { firebase } from "@react-native-firebase/auth"
import { useDispatch } from 'react-redux'
import { setUserEmailRedux,setUserUIDRedux } from '../store/userSlice'
const Splash = ({navigation}) => {
   const dispatch = useDispatch()
  useEffect(()=>{
    
     console.log(auth().currentUser)
      if(auth().currentUser){
       console.log(auth().currentUser.email)
       console.log(auth().currentUser.uid)
        dispatch(setUserEmailRedux(auth().currentUser.email))
        dispatch(setUserUIDRedux(auth().currentUser.uid))
        console.log('User is already logged in')
        navigation.navigate('Home');
        
      }
      else navigation.navigate('DashBoard');
    
  },[])
  return (
    <View>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash