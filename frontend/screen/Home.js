import { View, Text, Image,Button } from 'react-native'
import React from 'react'
import Header from './Header';
const Home = ({navigation}) => {
  return (
    <View>
        <Header navigation ={navigation}/>

       <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <Button title="Schedule Donation" onPress={() => navigation.navigate('ScheduleDonation')} />
         <Button title="Track Upcoming Donation" disabled={true} /> 
       </View>

       <View style={{ padding: 10 }}>
         <Text>Blood Type: O+</Text>
         <Text>Last Donation: 2024-02-14</Text>
      </View>

    </View>
 
  )
};

export default Home;