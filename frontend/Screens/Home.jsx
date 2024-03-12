import React from "react";
import { View, Text, Button, Image } from 'react-native';

const home =() =>{
    return (
        <View style={{ flex: 1 }}>
          {/* Hero Section */}
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Image source={require('./app-logo.jpeg')} style={{ width: 100, height: 100 }} />
            <Text style={{ fontSize: 20, marginTop: 10 }}>Welcome back, John Doe!</Text>
          </View>
    
          {/* Quick Actions Section */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
            <Button title="Schedule Donation" onPress={() => navigation.navigate('ScheduleDonation')} />
            <Button title="Track Upcoming Donation" disabled={true} /> {/* Replace with logic to check upcoming donation */}
          </View>
    
          {/* Information Section */}
          <View style={{ padding: 10 }}>
            <Text>Blood Type: O+</Text>
            <Text>Last Donation: 2024-02-14</Text>
            {/* Cards can go here */}
          </View>
        </View>
      );
}