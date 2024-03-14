import { View, Text ,FlatList,Button} from 'react-native'
import React, { useEffect } from 'react'
import api from './api'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Donor = () => {
  const [isLoading, setIsLoading] = useState('');
  const  [res,setRes]=useState([]);
  const userLocation = useSelector(state=>state.user.location);
  const latitude = userLocation.latitude;
  const longitude = userLocation.latitude;
  const radius = 2000;

  console.log("location",userLocation);

  useEffect(()=>{
    setIsLoading(true);

    const getData = async()=>{
      try{
        const response = await api.get(`/locations?${latitude.toString()}&${longitude.toString()}&${radius}`);
        setRes(response.data);
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
        <Button title="Donate" onPress={()=>{
          
        }}/>
        </View>
  }/>
    </View>
  )
}

export default Donor