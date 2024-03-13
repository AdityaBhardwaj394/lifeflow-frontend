import { View, Text, FlatList, Button } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux";
const RequestBlood = ({navigation}) => {
   const  [res,setRes]=useState([]);
   console.log(res);
   const lat = useSelector((state) => state.user.location.latitude)
   const lon = useSelector((state) => state.user.location.longitude)
   
  useMemo(() => {

    axios
    .get(
      `http://192.168.1.47:8001/locations?lat=${lat.toString()}&lon=${lon.toString()}&radius=10000`,
      // http://${IP}:8001/search?lat=17.5054036&lon=78.4937645&radius=2000&q=ho
    )
    .then(result => {
      //console.log(result.data);
      setRes(result.data);
    });
  }, [])
  return (
    <View>
      <FlatList
        data={res}
        renderItem={({item}) => 

        <View  style={{
         
          borderRadius:10,
          borderColor:'black',
          borderWidth:1,
        }}>
        <Text style={{
          padding: 10,
          fontSize: 18,
        
        }}>{item.poi.name}</Text>
         <Text>availabe donors:{}</Text>
        <Button title="Request" onPress={()=>{
          
        }}/>
        </View>
  }/>
    </View>
  )
}

export default RequestBlood