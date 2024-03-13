import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Donor from './Donor';
import RequestBlood from './RequestBlood';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Home' 
    screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={Home}/>
    <Tab.Screen name="Donor" component={Donor} />
    <Tab.Screen name="RequestBlood" component={RequestBlood} />
  </Tab.Navigator>
  )
}

export default TabNavigator;