import { View, Text,FlatList} from 'react-native'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../api';
import React from 'react'

import Icon from 'react-native-vector-icons/Entypo';
const DonorBB = ({navigation}) => {
  const [isLoading, setIsLoading] = useState('');
  const [id,setId] = useState(null);
  const [res,setRes]= useState('');
  const [err,setErr] = useState(null);
  const [list,setList] = useState([]);
  const [userlist,setUserlist]= useState([]);

  const emailBB = useSelector(state=>state.user.email);
  // console.log(emailBB);
  useEffect(()=>{
    setIsLoading(true);
    const getData= async()=>{
      try{
        const response = await api.get(`/entity/email/${emailBB}`);
        console.log("response id" ,response.data.id);
        setRes(response.data);
        setId(response.data.id);

        const donorlist = await api.get(`/donors/1`);
        // const donorlist = await api.get(`/donors/${id}`);
        setList(donorlist.data);
        console.log("donor list",donorlist.data);
        for(let i=0;i<donorlist.data.length;i++){
        const userid = donorlist.data[i].user_id;
        if(list.length<donorlist.data.length)
        {
          const getuserData=async()=>{
          const udata = await api.get(`/user/${userid}`);
          console.log(udata.data);
          setUserlist(prevList => [...prevList, udata.data]);
        }
        getuserData();
      }};

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

  return (
    <View>
  <FlatList
  data={list.length > userlist.length ? list : userlist} 
  renderItem={({ item, index }) => (
    <View style={{
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 1,
      padding:15,
      marginBottom: 10, 
    }}>
      {list[index] && <Text>{list[index].name}</Text>}
      {userlist[index] && <Text>User: {userlist[index].name}  <Text>Blood group: {userlist[index].blood_group}</Text></Text>}
      {list[index] && <Text>Available quantity: {list[index].available_vol}</Text>}
      <Icon name="chat" size={30} color="blue" onPress={()=>navigation.navigate('chathospital',{
                  username: userlist[index].name,
                  useremail:userlist[index].email,
                  
                })}/>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()} 
/>
        </View>
        
  )
}

export default DonorBB;