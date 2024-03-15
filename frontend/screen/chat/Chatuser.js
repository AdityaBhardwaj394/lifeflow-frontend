import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { socket } from './config';

const Chatuser = () => {
  const email = useSelector((state) => state.user.email);
  const location = useSelector((state) => state.user.location);
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messages, setMessages] = useState([]);
//  console.log(message);
  useEffect(() => {
    if (socket) {
      socket.emit('register', email); // Replace with the actual user's email
    }
    socket.on('personal', (data) => {
      console.log("receivedmessage"+data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
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
        recipientEmail: 'aditya@gmail.com', // Replace with the actual recipient's email
        message,
      });

      setMessage('');
      setSenderEmail('');
    }
  };
  

  return (
    <View>
      <TextInput placeholder='Enter message' value={message} onChangeText={setMessage} />
      <TextInput placeholder='Email' value={senderEmail} onChangeText={setSenderEmail} />
      <Button title='Send' onPress={sendMessage} />
      {messages.map((msg, index) => (
        <Text key={index} style={{ borderColor: 'black', borderWidth: 1 }}>
          {msg.senderEmail}: {msg.message}
        </Text>
      ))}
    </View>
  );
};

export default Chatuser;
