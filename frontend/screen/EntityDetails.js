import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const EntityDetails = ({ navigation, route }) => {
  console.log(route.params);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const bg = useSelector((state) => state.profile.BloodGroup);
  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://192.168.163.190:8001/donors/bloodgroup/${id}?bg=A-`);
        setTotalDonors(response1.data.length);
      } catch (err) {
        console.log(err);
      }
      try {
        const response2 = await axios.get(`http://192.168.163.190:8001/total_volume/${id}`);
        setTotalVolume(response2.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <View>
      <Text>EntityDetails</Text>
      <Text>Your match: {totalDonors}</Text>
      <Text>Total available blood: {totalVolume}</Text>
    </View>
  );
};

export default EntityDetails;
