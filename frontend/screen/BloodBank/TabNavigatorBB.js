import { View, Text } from 'react-native'
import React from 'react'
import DonorBB from './DonorBB'
import RecieverBB from './RecieverBB'
import HomeBB from './HomeBB'

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