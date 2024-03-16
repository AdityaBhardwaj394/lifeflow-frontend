import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Home from './Home';
import Donor from './Donor';
import RequestBlood from './RequestBlood';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Donate') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'RequestBlood') {
            iconName = focused ? 'water' : 'water-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Donate" component={Donor} />
      <Tab.Screen name="RequestBlood" component={RequestBlood} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
