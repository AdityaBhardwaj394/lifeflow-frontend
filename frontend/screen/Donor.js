import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import api from './api'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Donor = () => {
  const [isLoading, setIsLoading] = useState('')
  const userLocation = useSelector(state=>state.user.location);
  const latitude = userLocation.latitude;
  const longitude = userLocation.latitude;
  const radius = 2000;

  console.log("location",userLocation);

  useEffect(()=>{
    setIsLoading(true);

    const getData = async()=>{
      try{
        const response = await api.get(`/locations?${latitude}&${longitude}&${radius}`);
        console.log("response",response.data.map(entry=> entry.poi.name));
        console.log(response.data.poi.name)
      }
      catch(err){
        console.log("Error retrieving data, " ,err);
      }
      finally{
        setIsLoading(false);
      }
    }
    getData();
  },[]);

  return (
    <View>
      <Text>Donor</Text>
    </View>
  )
}

export default Donor