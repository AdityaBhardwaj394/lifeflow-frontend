import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { socket } from './config';

const Chatuser = () => {
  const location = useSelector((state) => state.user.location);
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messages, setMessages] = useState([]);
//  console.log(message);
  useEffect(() => {
    socket.on('personal', (data) => {
      console.log(data);

      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = () => {
    if (socket) {
      const newMessage = {
        senderEmail,
        message,
      };
      // Update the state to include the new message
      // setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      // // Emit the new message to the server
      socket.emit('personal', newMessage);
      
      // Clear the message input fields
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
