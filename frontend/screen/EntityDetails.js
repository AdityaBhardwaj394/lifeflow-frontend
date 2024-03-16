import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const EntityDetails = ({navigatoin,route}) => {
    console.log(route.params);
    const [totalDonors,setTotalDonors]=useState(0);
    const [totalVolume,setTotalVolume]=useState(0);
    const bg=useSelector(state=>state.profile.BloodGroup);
    const id=route.params.id;
    
    useEffect(()=>{
        try{
            axios
            .get(`http://192.168.163.190:8001/donors/bloodgroup/${id}?bg=A-`)
              .then((result) => {
                setTotalDonors(result.data.length);
              });
              
            }
            catch(err){
              console.log(err)
            }
            try{
              axios
              .get(`http://192.168.163.190:8001/total_volume/${id}`)
                .then((result) => {
                  setTotalVolume(result.data);
                  
                });
                
              }
              catch(err){
                console.log(err)
              }
    })
  return (
    <View>
      <Text>EntityDetails</Text>
      <Text>Your match:{totalDonors}</Text>
      {/* <Text>Total available blood {totalVolume}</Text> */}
      <Text>{JSON.stringify(totalVolume)}</Text>
    </View>
  )
}

export default EntityDetails