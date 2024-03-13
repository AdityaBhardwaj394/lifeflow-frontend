import { View, Text,StyleSheet,TextInput,Button } from 'react-native'
import { useState,useEffect } from 'react'
import React from 'react'
import api from './api.js';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(''); // Add other data fields as needed
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const getData = async() => {
      setError(null);
      try{
      const response = await api.get(`/user_e/${email}`);
      setName(response.data.name);
      setAge(response.data.dob)
    }
    catch (err) {
      console.error('Error submitting data:', err);
      setError('Failed to get data. Please refresh again.');
    }
    }

    getData(); 
  },[])  
  const updateData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await api.post(`/user_e/${email}`,data); 
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('Failed to submit data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      {/* Email Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Other Data Input Fields */}
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      {/* Add input fields for other data as needed */}

      {/* <Button title="Submit Data"  disabled={isLoading} /> */}
      {/* <Button title="Update Data" onPress={updateData} disabled={isLoading} /> */}
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
  },
});

export default Profile