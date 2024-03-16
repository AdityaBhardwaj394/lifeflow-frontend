import auth from '@react-native-firebase/auth';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { setUserEmailRedux, setUserUIDRedux } from '../store/userSlice';
import { theme } from '../theme/theme';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const verifylogin = async () => {
    try {
      setLoading(true);
      let res = await auth().signInWithEmailAndPassword(email, password);
      if (res && res.user) {
        dispatch(setUserEmailRedux(res.user.email));
        dispatch(setUserUIDRedux(res.user.uid));
        //console.log('user logged in');
        let status = 'none';
        axios
          .get(`http://192.168.1.85:8001/user/email/${res.user.email}`)

          .then(res => {
            status = 'user';
            console.log(res.data);
          })
          .catch(err => {
            console.log(err.response.detail);
          })
          .finally(() =>
            axios
              .get(`http://192.168.1.85:8001/entity/email/${res.user.email}`)
              .then(res => {
                status = 'entity';
              })
              .catch(err => {
                console.log(err.response.detail);
              })
              .finally(() => {
                console.log('status: ' + status);
                EncryptedStorage.setItem('status',status).then(() => {
                  if (status === 'user') {
                    navigation.navigate('TabNavigator');
                  } else if (status === 'entity') {
                    navigation.navigate('TabNavigatorBB');
                  }
                });
              }),
          );
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
