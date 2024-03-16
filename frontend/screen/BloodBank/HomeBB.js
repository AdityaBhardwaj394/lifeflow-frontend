import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { View, Text,ActivityIndicator,StyleSheet,Image,TouchableOpacity,Alert} from 'react-native'
import { Card } from 'react-native-paper'
import {launchImageLibrary} from 'react-native-image-picker';
import { useSelector } from 'react-redux'
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import api from '../api'

const HomeBB = ({navigation}) => {
  const [isLoading, setIsloading] =useState(true);
  const [err,setErr] =useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const emailBB = useSelector(state=>state.user.email);
  const [hosDetails,setHosDetails] = useState([]);
  const [photourl,setPhotoUrl]=useState('');
  const [entitydata,setEntitydata] = useState([]);
  useEffect(()=>{
    const getData=async()=>{
      try{
        const hosDetails = await api.get(`/entity/email/${emailBB}`);
        // console.log(hosDetails.data);
        const entitydata = await api.get(`/entity/${hosDetails.data.id}`)
        setHosDetails(hosDetails);
        console.log("id",hosDetails.data.photo_url);
        const uri = hosDetails.data.photo_url;
        
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        console.log(filename);
        // console.log("entity data",entitydata.data);
        const photourl = await storage().ref(filename).getDownloadURL();
        console.log("photo url",photourl);
        setPhotoUrl(photourl);
        setEntitydata(entitydata.data)
      }
      catch(err)
      {
        console.log(err);
        setErr(err);
      }
      finally{
        // console.log("hos",hosDetails);
        setIsloading(false);
      }
    }
    getData();
      
  },[isLoading])

  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });

    try {
      await task;
      console.log(photourl);
      const data={
        ...entitydata,
        "photo_url": `${photourl}`,
        "primary_email": `${emailBB}`,
      }
      console.log(hosDetails.data.id);
      await api.patch(`entity/${hosDetails.data.id}`,data);
      setIsloading(true);
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage(null);
  };

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      console.log("response" ,response.assets[0].uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log("source",source);
        setImage(source);
      }
    });
  }

  const logout =async()=>{
    await auth().signOut().then(()=>{
      console.log('user logged out successfully')
      navigation.navigate('DashBoard')
    })
  }
  return (
    <View>
    {isLoading ? <ActivityIndicator size="large" color="#0000ff"/>:
    hosDetails!='' ? (
      <View>
       <Card style ={styles.card}>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.text}>Welcome Back, {hosDetails.data.name}</Text>
            <Text style={styles.text}>{hosDetails.data.primary_email}</Text>
            <Text style={styles.text}>
              Registration ID: {hosDetails.data.reg_number}
            </Text>
            <Button title="Logout" onPress={logout} />
          </View>
        <Image
            source={photourl!=''?({uri:photourl}):require('../app-logo.jpeg')}
            style={styles.image}
          />
          
          {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <View>
          <Button title="Upload Photo" onPress={handleChoosePhoto}/>
          <Button title="Submit Photo" onPress={uploadImage}/>
          </View>
        )}

          </Card>
        </View>
        ):(
          <View>
      <Text>Error fetching data...</Text>
      </View>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '95%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 8,
    alignSelf:'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeBB;