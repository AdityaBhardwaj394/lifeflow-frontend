import { View, Text } from 'react-native'
import React from 'react'
import DonorBB from './DonorBB'
import RecieverBB from './RecieverBB'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeBB from './HomeBB'

const Tab = createBottomTabNavigator();

const TabNavigatorBB = () => {
  return (
    <Tab.Navigator initialRouteName='HomeBB' 
    screenOptions={{ headerShown: false }}>
    <Tab.Screen name="HomeBB" component={HomeBB} />
    <Tab.Screen name="RecieverBB" component={RecieverBB}/>
    <Tab.Screen name="DonorBB" component={DonorBB}/>
  </Tab.Navigator>
  )
}

export default TabNavigatorBB;