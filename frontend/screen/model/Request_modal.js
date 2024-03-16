import storage from '@react-native-firebase/storage';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import api from '../api';

const RequestModal = ({navigation, route, hospital, visible, setVisible}) => {
  const userEmail = useSelector(state => state.user.email);
  const userName = useSelector(state => state.profile.name);
  const lat = useSelector(state => state.user.location.latitude);
  const lon = useSelector(state => state.user.location.longitude);
  const userbg = useSelector(state => state.profile.BloodGroup);
  const [message, setMessage] = useState('');
  const [isDonating, setIsDonating] = useState(0);
  const [selectedFile, setSelectedFile] = useState({});
  const [res, setRes] = useState([]);
  const [err, setErr] = useState(null);
  const [vol1,setVol1] = useState("");
  const [url, setUrl] = useState('');
  const [ver,setVer] = useState(false);

  useEffect(() => {
    if (route.name === 'Donate') {
      setIsDonating(true);
    }
    console.log('navigation', route.name);
    console.log(isDonating);

    const getDonorData = async () => {
      const response = await api.get(`/user/email/${userEmail}`);
      console.log('hhh', response.data);
      setRes(response);
    };

    getDonorData();
  }, []);

  const sendDonorData = async () => {
    try {
      const data = {
        userEmail,
      };
      await api.post(`/donate/${hospital.id}?${vol.toString()}`, data);
    } catch (err) {
      console.log('Error submitting request', err);
      setErr('Unable to submit');
    } finally {
      setErr(null);
    }
  };

  const handleYesPress = () => {
    setVisible(false);
    // Add your logic for handling the request here
  };

  const pickFile = async () => {
    try {
      const fileDetails = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      console.log(fileDetails);
      setSelectedFile(fileDetails);
    } catch (err) {
      setSelectedFile({});
      console.log(err);
    }
  };
  const uploadImages = async () => {
    try {
      const reference = storage().ref(`${selectedFile.name}`);
      const task = reference.putFile(
        selectedFile.fileCopyUri.replace('file://', ''),
      );
      // task.on('state_changed',taskSnapshot=>{
      //   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      // });
      task.then(async () => {
        const url1 = await reference.getDownloadURL();
        setUrl(url1);
        const num = parseInt(vol1)
        console.log(lon," : " ,lat)
        const resp =await  axios.post(`http://192.168.163.190:8001/initial-request/${num}/?url=${url}`,{
          email: userEmail,
          lat: lat.toString(), 
          lon: lon.toString(), 
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        setVer("You will receive mail with more information shortly...")
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Verification</Text>
            {ver && <Text>Thanks for verifying...we will get back to you shortly</Text>}
            {!isDonating ? (
              <View>
                {/* <TextInput
              style={styles.textArea}
              placeholder="Enter your message..."
              multiline={true}
              value={message}
              onChangeText={setMessage}
            /> */}
                <TextInput
                  // style={styles.textArea}
                  placeholder="Volume Required (ml)"
                  value ={vol1}
                  onChangeText={(text) => setVol1(text)}
                />
                <Button title="Upload Proof" onPress={pickFile} />
                {selectedFile ? (
                  <Text>Selected File: {selectedFile.name}</Text>
                ) : null}
              </View>
            ) : null}

            {isDonating ? (
              <View>
                <TextInput
                  // style={styles.textArea}
                  placeholder="Name"
                  value={userName}
                />



                <TextInput
                  // style={styles.textArea}
                  placeholder="Blood group"
                  value={userbg}
                />
              </View>
            ) : null}

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setVisible(false);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>

              {isDonating ? (
                <Pressable
                  style={[styles.button, styles.buttonClose2]}
                  onPress={sendDonorData}>
                  <View>
                    <Text style={styles.textStyle} onPress={sendDonorData}>
                      {' '}
                      Send
                    </Text>
                  </View>
                </Pressable>
              ) : null}

              {!isDonating ? (
                <Pressable
                  style={[styles.button, styles.buttonClose2]}
                  onPress={handleYesPress}>
                  <View>
                    <Text style={styles.textStyle} onPress={uploadImages}>
                      Send
                    </Text>
                  </View>
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: '60%',
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 3,
    padding: 15,
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  buttonClose2: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    width: '100%',
  },
});

export default RequestModal;
