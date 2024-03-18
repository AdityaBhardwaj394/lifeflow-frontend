import { View, Text,FlatList,TouchableOpacity,StyleSheet } from 'react-native'
import { useState,useEffect } from 'react';
import React from 'react'
import api from '../api'
import { useSelector } from 'react-redux';
import axios from "axios";
import ModalBB from './ModalBB';

const RecieverBB = ({navigation,route}) => {
  const [id,setId] = useState(null);
  const [isLoading,setIsLoading]= useState(null);
  const [res,setRes]=useState([]);
  const emailBB = useSelector(state=>state.user.email);
  const [err,setErr] = useState(null);
  const [list,setList] =useState([]);
  const [visible,setVisible]=useState(false);
  const [selectedItem,setSelectedItem] =useState(null);
  const [canrecieve, setCanrecieve] = useState(true);
  const [donoruser, setDonoruser] =useState([]);
  useEffect(()=>{
    setIsLoading(true);
    const getData= async()=>{
      try{
        const response = await api.get(`entity/email/${emailBB}`);
        // console.log(response.data);

        setRes(response.data);

        const recieverlist = await api.get(`/waitlist/${response.data.id}`);
        // const recieverlist = await api.get(`/waitlist/1`);
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
    const CanDonate = JSON.parse(TransDetails.request._response).donorsThatCanDonate;
    const users = CanDonate.map(donor => donor.donor.user_info);
    console.log("Transdetails" ,CanDonate);
    setCanrecieve(CanDonate);
    setVisible(true);
    setSelectedItem(item);
    setDonoruser(users);
    }
    catch(err)
    {
      console.log(err);
      setErr(err);
    }

  }

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Receivers</Text>
       <FlatList
        data={list}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => initTrans(item)}>
        <View  style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemBloodGroup}>Blood Group: {item.blood_group} </Text>
        
        <Text style={styles.itemVolume} >Volume: {item.volumeRequiredWhileReceiving}</Text>
        </View>
        </TouchableOpacity>
        }/>

        {selectedItem && (
          <ModalBB 
            navigation={navigation}
            route={route}
            item={selectedItem}
            visible={visible}
            setVisible={setVisible}
            canrecieve={canrecieve}
            res={res}
            donoruser={donoruser}
          />
        )}
        </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 8,
    borderBottomColor: "red",
    borderBottomWidth:2,
  },
  itemContainer: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 13,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemBloodGroup: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemVolume: {
    fontSize: 14,
  },
});

export default RecieverBB;
