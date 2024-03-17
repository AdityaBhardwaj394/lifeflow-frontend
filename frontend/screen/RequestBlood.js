import React, { useEffect, useState } from 'react';
import { Button, FlatList, Pressable,TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import RegisterModal from './RegisterModal';
import api from './api';
import RequestModal from './model/Request_modal';
import axios from 'axios';
// import { FontAwesome } from 'react-native-vector-icons/';
import Icon from 'react-native-vector-icons/FontAwesome';
const RequestBlood = ({ navigation, route }) => {
  const [res, setRes] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [visible, setVisible] = useState(false);
  const [radius, setRadius] = useState(10000); // Default radius
  const [verified, setVerified] = useState(false);
  const lat = useSelector(state => state.user.location.latitude);
  const lon = useSelector(state => state.user.location.longitude);
  const email = useSelector(state => state.user.email);
  const [uid, setUid] = useState('');
  const [searchText, setSearchText] = useState('');
  const [hReg, setHReg] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://192.168.163.190:8001/locations?lat=${lat}&lon=${lon}&radius=${radius}`;
        const result = await axios.get(url);
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
        setRes(result.data);
        const res = await api.get(`/user/email/${email}`);
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
        setRes(result.data);
        const res = await api.get(`/user/email/${email}`);
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
        if (!verified) {
          setVisible(true);
          setSelectedHospital(item);
        } else {
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
        setHReg(true);
        setRegisterModalVisible(true);
        console.log('Hospital is not available');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigation = async item => {
    try {
      const result = await axios.get(
        `http://192.168.163.190:8001/entity/tomtom/${item.id}`,
      );
      if (result.data.status === 'false') {
        navigation.navigate('EntityDetails', {id: result.data.data.id});
      } else {
        console.log('Hospital is not available');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    value={searchText}
    onChangeText={setSearchText}
    placeholder="Search Hospital..."
  />
  <Icon name="search" size={24} color="black" />
</View>
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
        renderItem={({ item }) => (
          // <Pressable
          //   onPress={() => handleNavigation(item)}
          //   style={({ pressed }) => [
          //     {
          //       backgroundColor: pressed ? 'lightgray' : 'white',
          //     },
          //     styles.hospitalCard,
          //   ]}>
          //   <View>
          //     <Text style={styles.hospitalName}>{item.poi.name}</Text>
             
          //     <Button
          //       title="Request"
          //       onPress={() => handleRequest(item)}
          //       style={styles.requestButton}
          //       color="tomato"
          //     />
          //   </View>
          // </Pressable>
          <Pressable style={styles.hospitalCard} onPress={()=>{
            handleNavigation(item)
          }}>
            <Text style={styles.hospitalName}>{item.poi.name}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{
                paddingLeft: '15%',
              }}>
               
             
              </TouchableOpacity>
              <View style={{
                paddingLeft: '15%',
                width:'50%',
                marginLeft:'15%'

              }}>
                <Button title="Request" onPress={() => handleRequest(item)} color="tomato" />
                <Text></Text>
              </View>
            </View>
           
          
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row', // Make the input and icon align horizontally
    alignItems: 'center', // Center the icon vertically
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
    borderColor: 'blue',
    borderWidth: 1,
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  donorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
  },
  requestButton: {
marginTop: 10,
backgroundColor: 'red',
borderRadius: 5,
},
});

export default RequestBlood;
