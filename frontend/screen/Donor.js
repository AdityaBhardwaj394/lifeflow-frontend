import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from './api';
import { useSelector } from 'react-redux';
import RequestModal from './model/Request_modal';
import Icon from 'react-native-vector-icons/Entypo';

const Donor = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [visible, setVisible] = useState(false);
  const userLocation = useSelector(state => state.user.location);
  const latitude = userLocation.latitude;
  const longitude = userLocation.longitude;
  const radius = 2000;

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      try {
        const response = await api.get(`/locations?${latitude.toString()}&${longitude.toString()}&${radius}`);
        setData(response.data);
      } catch (err) {
        console.log("Error retrieving data, ", err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleDonate = (item) => {
    setSelectedHospital(item);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Available Hospitals</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading Hospitals...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.hospitalCard}>
              <Text style={styles.hospitalName}>{item.poi.name}</Text>
              <Text style={styles.donorText}>Available Receiver Match: —</Text>
              <View style={styles.buttonContainer}>
              <View style={{
                  paddingLeft: '15%',
                }}>
                <Icon name="chat" size={30} color="blue" onPress={()=>navigation.navigate('chat',{
                  selectedHospital: item.poi
                })}/>
                <Text
                >Chat</Text>
                </View>
                <View style={{
                  paddingLeft: '35%',

                }}>
                <Button title="Donate" onPress={() => handleDonate(item)} color="red" />
                <Text></Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}

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
    color:'black'
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
