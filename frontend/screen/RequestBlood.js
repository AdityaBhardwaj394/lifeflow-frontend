import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import RegisterModal from './RegisterModal';
import api from './api';
import RequestModal from './model/Request_modal';

const RequestBlood = ({navigation, route}) => {
  const [res, setRes] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [visible, setVisible] = useState(false);
  const [radius, setRadius] = useState(10000); // Default radius
  const [verified, setVerified] = useState(false);
  const lat = useSelector(state => state.user.location.latitude);
  const lon = useSelector(state => state.user.location.longitude);
  const email = useSelector(state => state.user.email);
  const [uid, setUid] = useState('');
  const [searchText,setSearchText]=useState('');
  const [hReg, setHReg] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://192.168.163.190:8001/locations?lat=${lat}&lon=${lon}&radius=${radius}`;
        
        const result = await axios.get(url);
        // console.log(result.data);
        setRes(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [radius]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://192.168.163.190:8001/search?lat=${lat.toString()}&lon=${lon.toString()}&radius=10000&q=${searchText}`;
       
        const result = await axios.get(url);
        // console.log(result.data);
        setRes(result.data);
        const res = await api.get(`/user/email/${email}`);
        //console.log(res.data);
        setVerified(res.data.verified);
        setUid(res.data.id.toString());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [searchText]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://192.168.163.190:8001/search?lat=${lat.toString()}&lon=${lon.toString()}&radius=10000`;
       
        const result = await axios.get(url);
        // console.log(result.data);
        setRes(result.data);
        const res = await api.get(`/user/email/${email}`);
        //console.log(res.data);
        setVerified(res.data.verified);
        setUid(res.data.id.toString());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  

  const handleRequest = async item => {
    try {
      const result = await axios.get(
        `http://192.168.163.190:8001/entity/tomtom/${item.id}`,
      );
      if (result.data.status === 'true') {
        console.log('eid: ', result.data.data.id);
        if (!verified) {
          setVisible(true);
          setSelectedHospital(item);
        } else {
          //show toast
          const stat1 = await axios.get(
            `http://192.168.163.190:8001/isReceiver/${
              result.data.data.id
            }?user_id=${parseInt(uid)}`,
          );
          if (stat1.data === true) {
            Toast.show({
              type: 'error',
              text1: 'You already requested this hospital',
            });
          } else {
            axios
              .post(
                `http://192.168.163.190:8001/request/${result.data.data.id}`,
                {
                  email: email,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then(d => {
                Toast.show({
                  type: 'success',
                  text1: 'Your request was successfully sent',
                });
              });
          }
        }
      } else {
        //3) modal asking to register
        setHReg(true);
        setRegisterModalVisible(true);
        console.log('Hospital is not available000');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleNavigation = async item => {
    // console.log(item);
    try {
      const result = await axios.get(
        `http://192.168.163.190:8001/entity/tomtom/${item.id}`,
      );
      if (result.data.status === 'true') {
        // navigation.navigate('EntityDetails', {id: result.data.data.id});
      } else {
        // console.log()
        console.log('Hospital is not available');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search Hospital..."
      />
      <TextInput
        style={styles.input}
        value={radius.toString()}
        onChangeText={text => setRadius(parseInt(text) || 0)}
        keyboardType="numeric"
        placeholder="Search Radius (meters)"
      />
      <Toast />
      <FlatList
        data={res}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handleNavigation(item)}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'lightgray' : 'white',
              },
              {borderRadius: 10, borderColor: 'black', borderWidth: 1},
            ]}>
            <View>
              <Text style={styles.hospitalName}>{item.poi.name}</Text>
              <Text style={styles.donorText}>Available Donors: —</Text>
              <Button title="Request" onPress={() => handleRequest(item)} style={styles.requestButton} />
            </View>
          </Pressable>
        )}
      />

      {!verified && (
        <RequestModal
          navigation={navigation}
          route={route}
          hospital={selectedHospital}
          visible={visible}
          setVisible={setVisible}
        />
      )}

      {hReg && (
        <RegisterModal
          navigation={navigation}
          route={route}
          hospital={selectedHospital}
          visible={registerModalVisible}
          setVisible={setRegisterModalVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  hospitalCard: {
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  donorText: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  requestButton: {
    marginTop: 10,
    backgroundColor: '#E74C3C',
    borderRadius: 5,
  },
});

export default RequestBlood;
