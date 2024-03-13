import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, Pressable, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const RequestModal = ({ navigation, hospital, visible, setVisible }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleYesPress = () => {
    setVisible(false);
    // Add your logic for handling the request here
  };

  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Handle other errors
        console.error(err);
      }
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{hospital.poi.name}</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter your message..."
              multiline={true}
              value={message}
              onChangeText={setMessage}
            />
            <Button title="Upload Proof" onPress={handleFileUpload} />
            {selectedFile && <Text>Selected File: {selectedFile.name}</Text>}
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose2]}
                onPress={handleYesPress}
              >
                <Text style={styles.textStyle}>Send</Text>
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
    height:'60%',
    width:'80%',
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
