import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { socket } from '../chat/config';

const ChatHospital = ({ route }) => {

  const emailBB = useSelector(state=>state.user.email);

  const location = useSelector((state) => state.user.location);
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const username=route.params.username;
  const useremail=route.params.email;
console.log(username);
console.log(route.params);
  useEffect(() => {
    if (socket) {
      socket.emit('register', emailBB); // Replace with the actual user's email
      socket.on('personal', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, []);

  const sendMessage = () => {
    if (socket) {
      const newMessage = {
        senderEmail,
        message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit the message to the server
      socket.emit('sendToUser', {
        recipientEmail:`${useremail}` , // Replace with the actual recipient's email
        message,
      });

      setMessage('');
      setSenderEmail('');
    }
  };

  return (
    <ImageBackground source={require('../chat/final.png')} style={styles.backgroundImage}>
      <View style={styles.chatContainer}>
        <Text style={styles.hospitalHeading}>{username}</Text>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.sender}>{item.senderEmail}</Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder='Enter message'
            value={message}
            onChangeText={setMessage}
          />
          {/* <TextInput
            style={styles.senderInput}
            placeholder='Email (Optional)'
            value={senderEmail}
            onChangeText={setSenderEmail}
          /> */}
          <Button title='Send' onPress={sendMessage} color='#4CAF50' />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)', // Semi-transparent white background
  },
  hospitalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#fff', // White background for the heading
    color: 'black', // Black text color for the heading
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 10,
    // backgroundColor:'grey'
  },
  sender: {
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black', // Black text color for sender name
  },
  messageText: {
    backgroundColor: 'rgba(0,0,0,0.1)', // Semi-transparent black background for message text
    padding: 10,
    borderRadius: 10,
    color:'black',
    fontWeight:'bold',
    fontSize: 26,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff', // White background for input area
  },
  messageInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  senderInput: {
    width: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default ChatHospital;
