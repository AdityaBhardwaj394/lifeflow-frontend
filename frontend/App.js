import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider } from 'react-redux';
import All from './blockchain/All';
import AllEntity from './blockchain/AllEntity';
import AllUser from './blockchain/AllUser';
import TabNavigatorBB from './screen/BloodBank/TabNavigatorBB';
import DashBoard from './screen/DashBoard';
import EntityDetails from './screen/EntityDetails';
import Home from './screen/Home';
import Login from './screen/Login';
import Profile from './screen/Profile';
import Register from './screen/Register';
import BBRegister from './screen/Register/BBRegister';
import BBRegisterSearch from './screen/Register/BBRegisterSearch';
import UserRegister from './screen/Register/UserRegister';
import Splash from './screen/Splash';
import TabNavigator from './screen/TabNavigator';
import Chatuser from './screen/chat/Chatuser';
import store from './store/store';

const Stack=createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chat" component={Chatuser}/>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="DashBoard" component={DashBoard}/>
      <Stack.Screen name="BBRegister" component={BBRegister}/>
      <Stack.Screen name="UserRegister" component={UserRegister}/>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="register" component={Register}/>
      {/* <Stack.Screen name="TabNavigatorBB" component={TabNavigatorBB}/> */}
      <Stack.Screen name="TabNavigator" component={TabNavigator}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="BBRegisterSearch" component={BBRegisterSearch}/>
      <Stack.Screen name="EntityDetails" component={EntityDetails}/>
      <Stack.Screen name="all" component={All} />
      <Stack.Screen name="allUser" component={AllUser}/>
      <Stack.Screen name="allEntity" component={AllEntity}/>
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;