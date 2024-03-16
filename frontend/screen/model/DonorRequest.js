import axios from "axios";
import React, { useEffect, useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
const DonorRequest = ({ navigation, route, hospital, visible, setVisible }) => {
    const [volume, setVolume] = useState('');
    const userEmail = useSelector(state=>state.user.email);
   const [id1,setid1]=useState(null)
   useEffect(()=>{
    try{
      console.log(hospital.id);
      axios.get(`http://192.168.163.190:8001/entity/tomtom/${hospital.id}`).then((res)=>{
        setid1(res.data.data.id)
        console.log("got data"+res.data.data.id)
      })
    }catch(err){
      console.log(err)
    }
   },[])
    const handleYesPress =  () => {
        // setVisible(false);
        console.log("hii")
        console.log(hospital.id);
        console.log("id is"+id1);
        const resp =  axios.post(`http://192.168.163.190:8001/donate/${id1}/?vol=${parseInt(volume)}`,{
            "email": userEmail
        }).then((resp)=>{
          console.log(resp.data)
          setVisible(false)
        })

        // console.log(resp.data);
    };

    return (
        <View style={styles.centeredView}>
            <Modal animationType="slide" transparent={true} visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Donate Blood</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Volume"
                            keyboardType="numeric"
                            value={volume}
                            onChangeText={text => setVolume(text)}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose2]}
                            onPress={handleYesPress}>
                            <View>
                                <Text style={styles.textStyle}>
                                    Donate 
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default DonorRequest;
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      height: '60%',
      width: '80%',
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      margin: 3,
      padding: 15,
    },
    buttonClose: {
      backgroundColor: 'red',
    },
    buttonClose2: {
      backgroundColor: 'red',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    textArea: {
      height: 100,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      marginVertical: 10,
      width: '100%',
    },
  });