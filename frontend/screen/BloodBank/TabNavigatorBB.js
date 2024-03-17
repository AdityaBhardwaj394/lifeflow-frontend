import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import DonorBB from './DonorBB';
import HomeBB from './HomeBB';
import RecieverBB from './RecieverBB';
import Icon from 'react-native-vector-icons/Ionicons'; 
const Tab = createBottomTabNavigator();


const TabNavigatorBB = () => {
  return (
    <Tab.Navigator initialRouteName='HomeBB' 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Donor') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Reciever') {
            iconName = focused ? 'water' : 'water-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
    <Tab.Screen name="Home" component={HomeBB} />
    <Tab.Screen name="Reciever" component={RecieverBB}/>
    <Tab.Screen name="Donor" component={DonorBB}/>
  </Tab.Navigator>
  )
}

export default TabNavigatorBB;