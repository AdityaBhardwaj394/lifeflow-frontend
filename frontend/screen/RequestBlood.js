import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Pressable } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RequestModal from './model/Request_modal';

const RequestBlood = ({ navigation, route }) => {
  const [res, setRes] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [visible, setVisible] = useState(false);
  const [radius, setRadius] = useState(10000); // Default radius
  const lat = useSelector((state) => state.user.location.latitude);
  const lon = useSelector((state) => state.user.location.longitude);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://192.168.1.137:8001/locations?lat=${lat}&lon=${lon}&radius=${radius}`);
        setRes(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [radius, lat, lon]);

  const handleRequest = async (item) => {
    try {
      const result = await axios.get(`http://192.168.1.137:8001/entity/tomtom/${item.id}`);
      if (result.data.status === 'true') {
        setVisible(true);
        setSelectedHospital(item);
      } else {
        console.log('Hospital is not available');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleNavigation = async (item) => {
    // console.log(item);
    try {
      const result = await axios.get(`http://192.168.1.137:8001/entity/tomtom/JOriSdh_3qBxjcz99xZSyw`);
      if (result.data.status === 'true') {
        navigation.navigate('EntityDetails', { id: result.data.data.id})
      } else {
        // console.log()
        console.log('Hospital is not available');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={radius.toString()}
        onChangeText={(text) => setRadius(parseInt(text) || 0)}
        keyboardType="numeric"
      />
      <FlatList
        data={res}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={()=>handleNavigation(item)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'lightgray' : 'white',
              },
              { borderRadius: 10, borderColor: 'black', borderWidth: 1 },
            ]}
          >
            <View>
              <Text style={{ padding: 10, fontSize: 18 }}>{item.poi.name}</Text>
              <Text>available donors: {}</Text>
              <Text>{item.id}</Text>
              <Button title="Request" onPress={() => handleRequest(item)} />
            </View>
          </Pressable>
        )}
      />

      {selectedHospital && (
        <RequestModal
          navigation={navigation}
          route={route}
          hospital={selectedHospital}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
});

export default RequestBlood;
