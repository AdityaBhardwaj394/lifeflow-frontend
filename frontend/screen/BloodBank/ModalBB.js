import { View, Text,Modal,StyleSheet,TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import api from '../api';
const ModalBB = ({navigation,route,item,visible,setVisible,canrecieve,res,donoruser}) => {

    const Proceed=async()=>{
        try{
            const data ={
                user_id: item.id,
                entity_id: 1,
            }
            console.log("item.id",item.id);
            await api.post(`/completeTransaction/${item.id}?entity_id=1`, {
                user_id: item.id,
                entity_id: "1",
            });
        }
        catch(err)
        {
            console.log(err);
        }
        finally{
          ToastAndroid.show('Transaction has successfully completed', ToastAndroid.LONG);
          setVisible(false);
        }
    }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {canrecieve?<Text style ={styles.modalText}>Yeah this transaction can be completed</Text>:<Text style ={styles.modalText}>Sorry,this transaction can not be completed</Text>}
          <Text style={styles.modalText}>Name: {item.name}</Text>
          <Text style ={styles.modalText}>Blood group: {item.blood_group}</Text>
          <View>
          <Text>Available Donors:</Text>
          {donoruser && donoruser.map((donor, index) => (
          <Text key={index}>{donor.name}  {donor.blood_group}</Text>
          // Add more Text components to display other donor information if needed
          ))}
          </View>
          <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={Proceed}
              >
                <Text style={styles.textStyle}>Proceed</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setVisible(false)}}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

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
        height:'60%',
        width:'80%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
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
});

export default ModalBB;