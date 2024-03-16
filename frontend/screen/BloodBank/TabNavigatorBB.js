import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import DonorBB from './DonorBB';
import HomeBB from './HomeBB';
import RecieverBB from './RecieverBB';
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