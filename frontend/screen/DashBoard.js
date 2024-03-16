import React from 'react'
import Background from '../components/Background'
// import Logo from '../components/Logo'
// import Header from '../components/Header'
import Button from '../components/Button'
// import Paragraph from '../components/Paragraph'

export default function DashBoard({navigation}) {

  return (
    <Background>
      {/* <Logo /> */}
      {/* <Header>CAS Venger</Header> */}
      {/* <Paragraph>
        Tetrahedron
      </Paragraph> */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('login')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('register')}
      >
        Sign Up
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('all')}
      >
        View Transactions
      </Button>

    </Background>
  )
}