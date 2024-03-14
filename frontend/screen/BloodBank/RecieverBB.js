import { View, Text } from 'react-native'
import { useState } from 'react';
import React from 'react'
import api from '../api'
import { useSelector } from 'react-redux';

const RecieverBB = () => {
  const [id,setId] = useState(null);
  const [emailBB,setEmailBB] = useSelector
  useEffect(()=>{
    const getData=()=>{
      try{
        const response = await api.get(`/waitlist/${id}`);
      }
    }
  },[])
  return (

    <FlatList
        data={res}
        renderItem={({item}) => 

        <View>
          <Text>{item.poi.name}</Text>
        </View>

        }/>
    
  )
}

export default RecieverBB