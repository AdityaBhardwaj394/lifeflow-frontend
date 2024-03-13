import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screen/Home'
import DashBoard from './screen/DashBoard'
import Login from './screen/Login'
import Register from './screen/Register'
import Splash from './screen/Splash'
import UserRegister from './screen/Register/UserRegister'
import BBRegister from './screen/Register/BBRegister'
import { NavigationContainer } from '@react-navigation/native';
import Chatuser from './screen/chat/Chatuser'
import { Provider } from 'react-redux'
import store from './store/store'
const Stack=createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="Splash">
      <Stack.Screen name="chat" component={Chatuser}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="DashBoard" component={DashBoard}/>
      <Stack.Screen name="BBRegister" component={BBRegister}/>
      <Stack.Screen name="UserRegister" component={UserRegister}/>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="register" component={Register}/>
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;