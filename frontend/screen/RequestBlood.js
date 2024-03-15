import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RequestModal from './model/Request_modal';

const RequestBlood = ({ navigation, route }) => {
  const [res, setRes] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [visible, setVisible] = useState(false);
  const [radius, setRadius] = useState(10000); // Default radius
  const [searchText, setSearchText] = useState('');
  const lat = useSelector((state) => state.user.location.latitude);
  const lon = useSelector((state) => state.user.location.longitude);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const result = await axios.get(
          `http://192.168.1.85:8001/locations?lat=${lat}&lon=${lon}&radius=${radius}`
          // `http://192.168.1.85:8001/search?lat=${lat.toString()}&lon=${lon.toString()}&radius=10000&q=${searchText}`
        );
        setRes(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [radius, lat, lon, searchText]);

  const handleRequest = async (item) => {
    try {
      const result = await axios.get(`http://192.168.1.85:8001/entity/tomtom/${item.id}`);
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
        onChangeText={(text) => setRadius(parseInt(text) || 0)}
        keyboardType="numeric"
        placeholder="Search Radius (meters)"
      />
      <FlatList
        data={res}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleRequest(item)}
            style={({ pressed }) => [
              { backgroundColor: pressed ? 'lightgray' : 'white' },
              styles.hospitalCard,
            ]}
          >
            <View>
              <Text style={styles.hospitalName}>{item.poi.name}</Text>
              <Text style={styles.donorText}>Available Donors: —</Text>
              <Button title="Request" onPress={() => handleRequest(item)} style={styles.requestButton} />
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
