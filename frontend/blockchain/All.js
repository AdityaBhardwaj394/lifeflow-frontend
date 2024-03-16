import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 15, // Adjust padding for content
    marginBottom: 10,
    backgroundColor: '#fff', // White background
    borderRadius: 10,
    shadowColor: '#ccc', // Shadow color
    shadowOffset: { width: 3, height: 3 }, // Offset for subtle 3D effect
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Blur radius for softer shadow
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  bloodGroup: {
    color: 'red',
  },
  underline: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});

const All = ({ navigation }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://192.168.163.190:8001/bchain/all')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePress = () => {
    console.log('Pressed ...');
  };

  return (
    <>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Recent Transactions:
      </Text>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        {data &&
          data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              {item.donor !== null && (
                <Pressable onPress={() => { /* Add navigation logic here */ }}>
                  <Text style={styles.text}>
                    Donor: {' '}
                    <Text style={[styles.underline, styles.text]}>
                      {item.donor.name} {item.donor.id}
                    </Text>{' '}
                    <Text style={styles.bloodGroup}>{item.donor.blood_group}</Text>
                  </Text>
                </Pressable>
              )}
              {item.receiver !== null && (
                <Pressable onPress={() => { /* Add navigation logic here */ }}>
                  <Text style={styles.text}>
                    Receiver: {' '}
                    <Text style={[styles.underline, styles.text]}>
                      {item.receiver.name} {item.receiver?.id}
                    </Text>{' '}
                    <Text style={styles.bloodGroup}>{item.receiver.blood_group}</Text>
                  </Text>
                </Pressable>
              )}
              {item.volume !== null && (
                <Text style={styles.text}>Volume: {item.volume}</Text>
              )}
              {item.entity !== null && (
                <Pressable onPress={() => { /* Add navigation logic here */ }}>
                  <Text style={styles.text}>
                    Via{' '}
                    <Text style={[styles.underline, styles.text]}>
                      {item.entity.name} {item.entity.id}
                    </Text>
                  </Text>
                </Pressable>
              )}
            </View>
          ))}
      </ScrollView>
    </>
  );
};

export default All;
