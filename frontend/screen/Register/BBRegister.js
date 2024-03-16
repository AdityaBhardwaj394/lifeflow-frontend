import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Background from '../../components/Background';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const BBRegister = ({ route, navigation }) => {
  const { hospital_name,hospital_id} = route.params;

  // console.log(route.params)
  console.log(hospital_id, hospital_name);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhone] = useState('');
  const [reg_no, setRegno] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  console.log("hospital id is",hospital_id);
  const register = async () => {
    try {
      // Create user with email and password
      // await auth().createUserWithEmailAndPassword(email, password);
      
      // Dispatch Redux actions
      
      // Post data to the backend
      axios.post(`http://192.168.163.190:8001/entity/create?tomtom_id=${hospital_id}`, {
        primary_email: email,
        primary_ph_no: phone_number,
        reg_number: reg_no,
        name: hospital_name,
      });
      
      // dispatch(setBBNameRedux(hospital_name));
      // dispatch(setBBPhoneno(phone_number));
      // dispatch(setBBemailRedux(email));
      // dispatch(setBBreg_no(reg_no));
      // Navigate to login screen
      navigation.navigate('login');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(err);
    }
  };

  return (
    <Background>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        label="Phone Number"
        returnKeyType="done"
        value={phone_number}
        onChangeText={setPhone}
      />
      <TextInput
        label="Hospital Name"
        returnKeyType="done"
        value={hospital_name}
        editable={false} // Prevent editing
      />
      <TextInput
        label="Registration Number"
        returnKeyType="done"
        value={reg_no}
        onChangeText={setRegno}
      />
      <Button loading={loading} mode="contained" onPress={register}>
        Register
      </Button>
    </Background>
  );
};

export default BBRegister;
