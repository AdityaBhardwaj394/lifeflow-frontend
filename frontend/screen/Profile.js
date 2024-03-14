import { View, Text,StyleSheet,TextInput,Button,Image,ActivityIndicator } from 'react-native'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import api from './api.js';
import {launchImageLibrary} from 'react-native-image-picker';
import { setBloodGroupRedux, setNameRedux } from '../store/profileSlice.js';

const Profile = () => {
  const dispatch=useDispatch();
  const userEmail = useSelector(state=>state.user.email);
  const userLocation = useSelector(state=>state.user.location);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [id,setId] = useState('');
  const [dob, setAge] = useState(''); 
  const [phone_number,setPhone]=useState('')
  const [blood_group,setBg] = useState('')
  const [sex,setSex] = useState('')
  const [profile_url,setProfileurl] = useState('');
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // const url = require('./app-logo-jpeg');
  // setProfileurl(url);
  // console.log(userEmail);
  useEffect(()=>{

    setEmail(userEmail);
    setLocation(userLocation);
    console.log("location",location);
    console.log("email",email);

    const getData = async() => {
      setError(null);
      try{
        const response = await api.get(`/user_e/${userEmail}`);
        setName(response.data.name);
        setAge(response.data.dob);
        setId(response.data.id);
        setBg(response.data.blood_group);
        setSex(response.data.sex);
        setProfileurl(response.data.profilePhoto);
        setPhone(response.data.phone_number);
        setLocation(response.data.location);
        dispatch(setNameRedux(response.data.name));
        dispatch(setBloodGroupRedux(response.data.blood_group));
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
      const data={
        email,
        name,
        dob,
        phone_number,
        blood_group,
        sex ,
        profile_url,
        location,
      }
      console.log(data.profile_url);

      await api.patch(`/user/${id}`,data); 
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('Failed to submit data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0].uri;
        console.log("source",response.assets[0].uri);
        setProfileurl(source);
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.profilePhotoContainer}>
        <Image
          source={profile_url ? ({uri: profile_url}):require('./app-logo.jpeg')}
          style={styles.profilePhoto}
          resizeMode="cover"
        />
        <Button title="Upload Photo" onPress={handleChoosePhoto} />
      </View>

      
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Blood group"
        value={blood_group}
        onChangeText={setBg}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Sex"
        value={sex}
        onChangeText={setSex}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Age"
        keyboardType="numeric"
        value={dob}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Phone Number"
        keyboardType="numeric"
        value={phone_number}
        onChangeText={setPhone}
      />

      {/* Add input fields for other data as needed */}

      {/* <Button title="Submit Data"  disabled={isLoading} /> */}
      <Button title="Update Data" onPress={updateData} disabled={isLoading} />
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
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
});

export default Profile