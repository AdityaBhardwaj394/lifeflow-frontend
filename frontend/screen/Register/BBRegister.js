import { View, Text } from 'react-native'
import React from 'react'

const BBRegister = () => {
  return (
    <View>
       <View>
      <TextInput placeholder="Email"value={email} onChangeText={setEmail} />
      <TextInput placeholder="password" value={password} onChangeText={setpassword}  />
      <Button title="Register" onPress={register} />
    </View>
    </View>
  )
}

export default BBRegister