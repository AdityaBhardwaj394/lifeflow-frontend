import axios from 'axios';
import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from "react-redux";

const BBRegisterSearch = ({ navigation }) => {
  const [value, onChangeText] = React.useState('');
  const [res, setRes] = React.useState([]);
  const lat = useSelector((state) => state.user.location.latitude);
  const lon = useSelector((state) => state.user.location.longitude);
  
  const handleChange = text => {
    onChangeText(text);
    console.log(lat, lon);
    console.log(text);
    try {
      axios
        .get(`http://192.168.163.190:8001/search?lat=${lat.toString()}&lon=${lon.toString()}&radius=10000&q=${text}`)
        .then(result => {
          // console.log(result.data);
          setRes(result.data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Search For Hospitals</Text>
      <View
        style={{
          backgroundColor: value,
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
        }}>
        <TextInput
          editable
          onChangeText={text => handleChange(text)}
          value={value}
          style={{ padding: 10 }}
        />
      </View>
      
      <FlatList
        data={res}
        keyExtractor={(item, index) => index.toString()} // Add a keyExtractor
        renderItem={({ item }) => 
          <Text style={styles.item} onPress={() => navigation.navigate('BBRegister', {
            hospital_name: item.poi.name,
            hospital_id: item.id,
            
          })}>{item.poi.name}</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default BBRegisterSearch;
