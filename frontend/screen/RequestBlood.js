import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Pressable, StyleSheet, TextInput, Modal } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RequestModal from './model/Request_modal';

const RequestBlood = ({ navigation }) => {
  const [res, setRes] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [visible, setVisible] = useState(false);
  const lat = useSelector((state) => state.user.location.latitude);
  const lon = useSelector((state) => state.user.location.longitude);

  useEffect(() => {
    axios
      .get(`http://192.168.1.127:8001/locations?lat=${lat.toString()}&lon=${lon.toString()}&radius=10000`)
      .then((result) => {
        setRes(result.data);
      });
  }, []);

  const handleRequest = (item) => {
    setSelectedHospital(item);
    setVisible(true);
  };

  return (
    <View>
      <FlatList
        data={res}
        renderItem={({ item }) => (
          <View style={{ borderRadius: 10, borderColor: 'black', borderWidth: 1 }}>
            <Text style={{ padding: 10, fontSize: 18 }}>{item.poi.name}</Text>
            <Text>available donors: {}</Text>
            <Text>{item.poi.id}</Text>
            <Button title="Request" onPress={() => handleRequest(item)} />
          </View>
        )}
      />

      {selectedHospital && (
        <RequestModal
          navigation={navigation}
          hospital={selectedHospital}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </View>
  );
};

export default RequestBlood;
