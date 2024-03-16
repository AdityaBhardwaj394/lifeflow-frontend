import auth from '@react-native-firebase/auth';
import axios from 'axios'; // Import axios for making HTTP requests
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../theme/theme';

const Register = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await axios.post('http://192.168.1.85:8001/user/create', { email: email });
      navigation.navigate('login');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('That email address is already in use!');
      } else if (err.code === 'auth/invalid-email') {
        setError('That email address is invalid!');
      } else {
        setError('An error occurred. Please try again later.');
        console.error(err);
      }
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
      <Button loading={loading} mode="contained" onPress={register}>
        Register
      </Button>
      <View style={styles.row}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Register as a Hospital? </Text>
        <TouchableOpacity onPress={() => navigation.replace('BBRegisterSearch')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text>{error}</Text>
    </Background>
  );
};

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
