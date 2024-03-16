import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Background from '../components/Background';
import { setUserEmailRedux, setUserUIDRedux } from '../store/userSlice';
import { theme } from '../theme/theme';
import { setBBNameRedux,setBBPhoneno,setBBemailRedux } from '../store/hospitalSlice';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const verifylogin = async () => {
    try {
      setLoading(true);
      const res = await auth().signInWithEmailAndPassword(email, password);
      if (res && res.user) {
        // try {
        //   const result = await axios.get(`http://192.168.1.85:8001/entity/email/${res.user.email}`);
        //   // console.log(result.data);
        //   if (result.data.length > 0) {
        //     console.log('go the hospital page');
        //     await EncryptedStorage.setItem('hospital_email', JSON.stringify(result.data[0].primary_email));
        //     navigation.navigate('TabNavigatorBB');
        //   }
        // } catch (err) {
        //   console.log(err);
        // }

        dispatch(setUserEmailRedux(res.user.email));
        dispatch(setUserUIDRedux(res.user.uid));

        console.log('user logged in');
        navigation.navigate('Home');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button loading={loading} mode="contained" onPress={verifylogin}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text>{error}</Text>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
