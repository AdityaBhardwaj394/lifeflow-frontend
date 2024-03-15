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
      let res = await auth().signInWithEmailAndPassword(email, password);
      if (res && res.user) {
        dispatch(setUserEmailRedux(res.user.email));
        dispatch(setUserUIDRedux(res.user.uid));

        console.log('user logged in');
        navigation.navigate('TabNavigatorBB');
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
