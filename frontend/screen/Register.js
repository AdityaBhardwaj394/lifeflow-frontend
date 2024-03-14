import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import TextInput from '../components/TextInput';
import { useDispatch } from 'react-redux';
import { theme } from '../theme/theme';
import Button from '../components/Button';
import Background from '../components/Background';
import { setUserEmailRedux, setUserUIDRedux } from '../store/userSlice';

const Register = ({navigation}) => {
  const [password,setpassword] = useState('')
  const [email,setEmail] = useState('')
  // console.log(name)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const register= async ()=>{
    setLoading(true);

    try{
    await auth().createUserWithEmailAndPassword(email,password).then(
      ()=>{
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
    })}catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }
  return (
    // <View>
    //   <Button title="Register as BloodBank" onPress={()=>navigation.navigate('BBRegisterSearch')}/>
    //   <Button title="Register as User" onPress={()=>navigation.navigate('UserRegister')}/>
    // </View>.
    <Background>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={setpassword}
        secureTextEntry
      />
      <Button loading={loading} mode="contained" onPress={register}>
        Register
      </Button>
      <View style={styles.row}>
        <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
        }}>Register as a Hospital? </Text>
        <TouchableOpacity onPress={() => navigation.replace('BBRegisterSearch')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text>{error}</Text>
    </Background>
  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.secondary,
  },
});

export default Register;