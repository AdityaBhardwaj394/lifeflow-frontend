import auth from '@react-native-firebase/auth';
import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
const RequestModal = ({navigation, visible, setVisible}) => {
  const logout = async () => {
    await auth()
      .signOut()
      .then(() => {
        //console.log('user logged out successfully');
        navigation.navigate('DashBoard');
      });
  };
  const handleYesPress = () => {
    setVisible(false);
  };

  const uploadImages = async () => {
    await auth()
    .signOut()
    .then(() => {
      //console.log('user logged out successfully');
      navigation.navigate('BBRegisterSearch');
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hospital Not Registered With Lifeflow</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setVisible(false);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose2]}
                onPress={handleYesPress}>
                <View>
                  <Text style={styles.textStyle} onPress={uploadImages}>
                    Register Now
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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

export default RequestModal;
