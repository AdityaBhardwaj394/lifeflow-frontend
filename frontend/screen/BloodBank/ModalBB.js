import { View, Text,Modal,StyleSheet,TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import api from '../api';
const ModalBB = ({navigation,route,item,visible,setVisible,canrecieve,res,donoruser}) => {

    const Proceed=async()=>{
        try{
            console.log("item.id",item.id);
            await api.post(`/completeTransaction/${item.id}?entity_id=${res.id}`, {
                user_id: item.id,
                entity_id: res.id,
            });
            ToastAndroid.show('Transaction has successfully completed', ToastAndroid.LONG);
        }
        catch(err)
        {
            console.log(err);
            ToastAndroid.show('Transaction can not be successfully completed',ToastAndroid.LONG);
        }
        finally{
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
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={canrecieve!='' ? styles.modalTitleSuccess : styles.modalTitleFailure}>{canrecieve!='' ? 'Transaction Completion' : 'Transaction Unavailable'}</Text>
            {/* Add an icon here to visually indicate success or failure based on canrecieve */}
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Name: {item.name}</Text>
            <Text style={styles.modalText}>Blood Group: {item.blood_group}</Text>
            {canrecieve!='' && donoruser && (
              <View style={styles.donorList}>
                <Text style={styles.donorListLabel}>Available Donors:</Text>
                {donoruser.map((donor, index) => (
                  <View key={index} style={styles.donorListItem}>
                    <Text style={styles.donorName}>{donor.name}</Text>
                    <Text style={styles.donorBloodGroup}>{donor.blood_group}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.modalActions}>
            <TouchableOpacity style={[styles.button, styles.proceedButton]} onPress={Proceed}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitleSuccess: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ECC71', // Green for success
  },
  modalTitleFailure: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4136', // Red for failure
  },
  modalContent: {
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  donorList: {
    marginBottom: 15,
  },
  donorListLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  donorListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  donorName: {
    color: '#3',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  proceedButton: {
    backgroundColor: '#2ECC71', // Green for Proceed button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#FF4136', // Red for Cancel button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default ModalBB;