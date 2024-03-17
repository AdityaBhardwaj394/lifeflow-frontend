import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EntityDetails = ({ navigation, route }) => {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const bg = useSelector((state) => state.profile.BloodGroup);
  const id = route.params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const donorsResponse = await axios.get(
          `http://192.168.163.190:8001/donors/bloodgroup/${id}?bg=A-`
        );
        setTotalDonors(donorsResponse.data.length);

        const volumeResponse = await axios.get(
          `http://192.168.163.190:8001/total_volume/${id}`
        );
        setTotalVolume(volumeResponse.data);
      } catch (err) {
        console.log(err);
        // Handle errors appropriately, e.g., display error messages
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FF5252" />
      ) : (
        <View style={styles.contentContainer}>
          {/* <Image
            source={require('./images/blood-drop-icon.png')} // Replace with your image
            style={styles.image}
          /> */}
          <Text style={styles.title}>Entity Details</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.label}>Your Matches:</Text>
            <Text style={styles.value}>{totalDonors}</Text>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.label}>Total Available Blood:</Text>
            <Text style={styles.value}>{totalVolume}</Text>
          </View>
        
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EntityDetails
