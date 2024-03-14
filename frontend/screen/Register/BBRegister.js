import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import Background from '../../components/Background';
import { useDispatch } from 'react-redux';
import { setBBNameRedux, setBBPhoneno, setBBemailRedux, setBBreg_no } from '../../store/hospitalSlice';
import axios from 'axios';
const BBRegister = ({route,navigation}) => {
  const {hospital_ph,hospital_name,hospital_id,hospital_lat,hospital_lon}=route.params;
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [phone_number, setPhone] = useState('')
  const [reg_no, setRegno] = useState('')
  const dispatch=useDispatch()
  // const [hospital_name, setHospital] = useState('')
  
  const [loading, setLoading] = useState(false);
  const register= async ()=>{
    await auth().createUserWithEmailAndPassword(email,password).then(
      ()=>{
        dispatch(setBBNameRedux(hospital_name));
        dispatch(setBBPhoneno(phone_number));
        dispatch(setBBemailRedux(email));
        dispatch(setBBreg_no(reg_no));
        axios.post('http://192.168.1.58:8001/entity/create', 
        {
          "primary_email": email,
          "primary_ph_no": phone_number,
          "reg_number": reg_no,
          "name": hospital_name,
        });
         navigation.navigate('login')
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
    
       <Background>
      {/* <TextInput placeholder="Email"value={email} onChangeText={setEmail} /> */}
      <TextInput
        label="email"
        returnKeyType="done"
        value={email}
        onChangeText={setEmail}
        // secureTextEntry
      />
      {/* <TextInput placeholder="password" value={password} onChangeText={setpassword}  /> */}
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={setpassword}
        secureTextEntry
      />
      <TextInput
        label="Phone Number"
        returnKeyType="done"
        value={phone_number}
        onChangeText={setPhone}
        // secureTextEntry
      />
      <TextInput
        label="Hospital Name"
        returnKeyType="done"
        value={hospital_name}
        // onChangeText={setHospital}
        // secureTextEntry
      />
      <TextInput
        label="Registration Number"
        returnKeyType="done"
        value={reg_no}
        onChangeText={setRegno}
        // secureTextEntry
      />
      <Button loading={loading} mode="contained" onPress={register}>
        Register
      </Button>
    
    </Background>
    
  )
}

export default BBRegister