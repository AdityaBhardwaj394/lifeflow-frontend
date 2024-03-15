import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import DonorBB from './DonorBB';
import HomeBB from './HomeBB';
import RecieverBB from './RecieverBB';
const Tab = createBottomTabNavigator();

const TabNavigatorBB = () => {
  return (
    <Tab.Navigator initialRouteName='Donor' 
    screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeBB} />
    <Tab.Screen name="Reciever" component={RecieverBB} />
    <Tab.Screen name="Donor" component={DonorBB} />
  </Tab.Navigator>
  )
}

export default TabNavigatorBB;