import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

const index = () => {
  return (
    <View>
      <Link href={'/(modals)/login'}>Login</Link>
      <Link href={'/(modals)/booking'}>Booking</Link>
      <Link href={'/listing/1234'}>listing</Link>
    </View>
  )
}

export default index