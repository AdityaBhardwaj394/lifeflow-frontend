import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  bloodGroup: {
    color: 'red',
  },
  underline: {
    //textDecorationLine: 'underline',
    color: 'blue',
  },
});

const AllUser = ({route, navigation}) => {
  const [data, setData] = useState(null);
  const {id} = route.params;

  useEffect(() => {
    console.log(id)
    axios
      .get(`http://192.168.163.190:8001/bchain/user/${parseInt(id)}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
      Recent Transactions:
      </Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        {data &&
          data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              {item.donor !== null && (
                <Pressable>
                  <Text style={styles.text}>
                    Donor:{' '}
                    <Text style={[styles.underline, styles.text]}>
                      {item.donor.name}
                    </Text>{' '}
                    <Text style={styles.bloodGroup}>
                      {item.donor.blood_group}
                    </Text>
                  </Text>
                </Pressable>
              )}
              {item.receiver !== null && (
                <Pressable>
                  <Text style={styles.text}>
                    Receiver:{' '}
                    <Text style={[styles.underline, styles.text]}>
                      {item.receiver.name}
                    </Text>{' '}
                    <Text style={styles.bloodGroup}>
                      {item.receiver.blood_group}
                    </Text>
                  </Text>
                </Pressable>
              )}
              {item.volume !== null && (
                <Text style={styles.text}>Volume: {item.volume}</Text>
              )}
              {item.entity !== null && (
                <Pressable>
                  <Text style={styles.text}>
                    Via{' '}
                    <Text style={[styles.underline, styles.text]}>
                      {item.entity.name}
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

export default AllUser;
