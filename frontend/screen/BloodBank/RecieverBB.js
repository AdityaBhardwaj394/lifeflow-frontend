import { View, Text,FlatList,TouchableOpacity } from 'react-native'
import { useState,useEffect } from 'react';
import React from 'react'
<<<<<<< HEAD
import api from '../api'
import { useSelector } from 'react-redux';
import axios from "axios";
import ModalBB from './ModalBB';

const RecieverBB = ({navigation}) => {
  const [id,setId] = useState(null);
  const [isLoading,setIsLoading]= useState(null);
  const [res,setRes]=useState([]);
  const emailBB = useSelector(state=>state.user.email);
  const [err,setErr] = useState(null);
  const [list,setList] =useState([]);
  const [isVisible,setIsVisible]=useState(false);
  const [selectedItem,setSelectedItem] =useState(null);
  
  useEffect(()=>{
    setIsLoading(true);
    const getData= async()=>{
      try{
        const response = await api.get(`entity/email/${emailBB}`);
        // console.log(response.data);
=======

const RecieverBB = () => {
  return (
    <View>
      <Text>RecieverBB</Text>
    </View>
  )
}
>>>>>>> 09bcc9ae9e3f8878845b0a87c36bb2bff8828cd3

        setRes(response.data);

        // const recieverlist = await api.get(`/waitlist/${response.data.id}`);
        const recieverlist = await api.get(`/waitlist/1`);
        setList(recieverlist.data);
        // console.log("reciever list",recieverlist.data);

      }
      catch(err)
      {
        console.log("Error:",err);
        setErr(err);
      }
      finally{
        setIsLoading(false);
      }
    }
    getData();
    // console.log(res);
  },[])

  const initTrans=async(item)=>{
    // console.log(item);
    try{
    const TransDetails = await api.get(`/initialiseTransaction/${item.id}?entity_id=1`);
    console.log("Transdetails" ,TransDetails.request._response.donorsThatCanDonate);
    setIsVisible(true);
    setSelectedItem(item);
    }
    catch(err)
    {
      console.log(err);
      setErr(err);
    }

  }

  return (
    <View>
       <FlatList
        data={list}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => initTrans(item)}>
        <View  style={{
          borderRadius: 10,
          borderColor: 'black',
          borderWidth: 1,
          padding:15,
          marginBottom: 10,
        }}>
        <Text>{item.name}  {item.blood_group}</Text>
        
        <Text>{item.volumeRequiredWhileReceiving}</Text>
        </View>
        </TouchableOpacity>
        }/>

        {selectedItem && (
          <ModalBB 
            navigation={navigation}
            item={selectedItem}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            res={res}
          />
        )}
        </View>
  )
};

export default RecieverBB;