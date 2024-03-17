import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { View, Text,ActivityIndicator,StyleSheet,Image,TouchableOpacity,Alert,ScrollView} from 'react-native'
import { Card } from 'react-native-paper'
import {launchImageLibrary} from 'react-native-image-picker';
import { useSelector } from 'react-redux'
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import api from '../api'
import { FlatList } from 'react-native-gesture-handler'

const HomeBB = ({navigation}) => {
  const [isLoading, setIsloading] =useState(true);
  const [err,setErr] =useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const emailBB = useSelector(state=>state.user.email);
  const [hosDetails,setHosDetails] = useState([]);
  const [photourl,setPhotourl]=useState(null);
  const [entitydata,setEntitydata] = useState([]);
  const [totalvolume,setTotalvolume] = useState([]);
  useEffect(()=>{
    const getData=async()=>{
      try{
        const hosDetails = await api.get(`/entity/email/${emailBB}`);
        // console.log(hosDetails.data);
        const entitydata = await api.get(`/entity/${hosDetails.data.id}`)
        setHosDetails(hosDetails);
        const uri = hosDetails.data.photo_url;
        // console.log("entity data",entitydata.data);
        // const photouri = await storage().ref(filename).getDownloadURL();
        // console.log("photo url",photouri);
        setPhotourl(entitydata.data.photo_url);
        console.log("uri",uri);
        setEntitydata(entitydata.data)

        const totalvolume = await  api.get(`/total_volume/${hosDetails.data.id}`);
        setTotalvolume(totalvolume.data)
        // console.log("toatal volume",totalvolume.data);
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
    console.log("image",image);
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
      // console.log("photourl",photourl);
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
  <ScrollView style={styles.container}>
  <View>
    {isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : hosDetails !== '' ? (
      <View>
        <Card style={styles.card}>
          <View style={styles.detailsContainer}>
            <Text style={styles.text}><Text style = {styles.greeting}>Welcome Back </Text>, {hosDetails.data.name}</Text>
            <Text style={styles.text}>{hosDetails.data.primary_email}</Text>
            <Text style={styles.text}>
              Registration ID: {hosDetails.data.reg_number}
            </Text>
          </View>
          <Image
            source={image!==null ? ({ uri: photourl }) : require('../app-logo.jpeg')}
            style={styles.image}
            onError={(err)=>{
              console.log("err retriieving image",err);
            }}
          />
          {uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} color="#007bff" />
            </View>
          ) : (
            <View style={styles.buttons}>
              <Button title="Upload Photo" onPress={handleChoosePhoto} />
              <Button title="Submit Photo" onPress={uploadImage} />
            </View>
          )}
        </Card>

        <Card style={styles.card}>
          <Text style={styles.heading}>Total Available Blood</Text>
          {Object.entries(totalvolume).map(([bloodGroup, volume], index) => (
            <View key={index}>
              <Text style={styles.list}>{`${bloodGroup} : ${volume} units`}</Text>
            </View>
          ))}
        </Card>
          <Card style={styles.card}>
        <Button title="Logout" onPress={logout} />
        </Card>
      </View>
    ) : (
      <View>
        <Text>Error fetching data...</Text>
      </View>
    )}
  </View>
</ScrollView>
)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background color
  },
  card: {
    width: '95%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 8,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF', // White card background
  },
  buttons:{
    flexDirection:"row",
    justifyContent:'space-around',
    padding: 20,
  },
  greeting:{
    fontSize:24,
    fontWeight:"bold",
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10, // Rounded image corners
  },
  detailsContainer: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4A4B4D', // Text color
  },
  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#4A4B4D', // Text color
    textAlign: 'center',
    marginVertical: 10,
  },
  list: {
    padding: 10,
    fontSize: 20,
    color: '#4A4B4D', // Text color
  },
  progressBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default HomeBB;