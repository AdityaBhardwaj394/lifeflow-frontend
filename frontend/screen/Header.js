import { View, Image, Text, TouchableOpacity,StyleSheet } from 'react-native';
import React from 'react'
import Profile from './Profile';
import { useSelector } from 'react-redux';

const Header = ({ navigation }) => {
   const userName = useSelector(state=>state.profile.name);
   console.log(userName);
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('./app-logo.jpeg')} style={styles.profilePic} />
        </TouchableOpacity>
        <Text style={styles.username}>{userName}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
      },
      username: {
        fontWeight: 'bold',
      },
  });

export default Header