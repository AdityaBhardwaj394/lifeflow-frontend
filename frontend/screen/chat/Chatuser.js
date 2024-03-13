import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client';

const Chatuser = () => {
  const location=useSelector(state=>state.user.location)
 console.log(location)
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  // console.log(socket);
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('message', (msg) => {
      console.log('Received message:', msg);
    }); 
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', {
        senderEmail,
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
    </View>
  );
};

export default Chatuser;
