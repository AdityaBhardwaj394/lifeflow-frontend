import { View, Text, FlatList, ToastAndroid, Button, StyleSheet, TouchableOpacity,Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from './api';
import { useSelector } from 'react-redux';

import RegisterModal from './RegisterModal';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import RequestModal from './model/Request_modal';
import DonorRequest from './model/DonorRequest';
const Donor = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [visible, setVisible] = useState(false);
  const userLocation = useSelector(state => state.user.location);
  const latitude = userLocation.latitude;

  const longitude = userLocation.longitude;
  const radius = 100000;
  const [registerModalVisible, setRegisterModalVisible] = useState(false); 
  const [hReg, setHReg] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      try {
        const response = await api.get(`/locations/?lat=${latitude.toString()}&lon=${longitude.toString()}&radius=${radius}`);
        setData(response.data);
        // console.log(respn)
      } catch (err) {
        console.log("Error retrieving data, ", err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleDonate = (item) => {
    try {
      const res = axios.get(`http://192.168.163.190:8001/entity/tomtom/${item.id}`).then((res) => {
        console.log(res.data);
        if (res.data.status == 'true') {
          setSelectedHospital(item);
          setVisible(true);
        } else {
          setHReg(true);
          setRegisterModalVisible(true);
          console.log('Hospital is not available000');

        }

      })

    } catch (err) {
      console.log(err);
    }
    
  };

  const handlenavigate = (item) => {

    try {
      const res = axios.get(`http://192.168.163.190:8001/entity/tomtom/${item.id}`).then((res) => {
       
        if (res.data.status == 'true') {
          navigation.navigate('chat', {
            selectedHospital: item.poi,
            email: res.data.data.primary_email
          });
        } else {
          setHReg(true);
          setRegisterModalVisible(true);
          console.log('Hospital is not available000');

        }

      })

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Hospitals</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading Hospitals...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable style={styles.hospitalCard} onPress={()=>{
              console.log("hello world")
            }}>
              <Text style={styles.hospitalName}>{item.poi.name}</Text>
              <Text style={styles.donorText}>Available Receiver Match: —</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={{
                  paddingLeft: '15%',
                }}>
                  <Icon name="chat" size={30} color="blue" onPress={() => handlenavigate(item)} />
                  <Text
                  >Chat</Text>
                </TouchableOpacity>
                <View style={{
                  paddingLeft: '35%',

                }}>
                  <Button title="Donate" onPress={() => handleDonate(item)} color="red" />
                  <Text></Text>
                </View>
              </View>
             
            
            </Pressable>
          )}
          keyExtractor={item => item.id}
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
       {selectedHospital && (
        <DonorRequest
          navigation={navigation}
          route={route}
          hospital={selectedHospital}
          visible={visible}
          setVisible={setVisible}
        />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  hospitalCard: {
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    padding: 15,
    marginBottom: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  donorText: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Donor;
