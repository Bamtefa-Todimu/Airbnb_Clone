import { View, Text, SafeAreaView, StyleSheet, Platform } from 'react-native'
import { Link, Stack } from 'expo-router'
import React, { useMemo, useState } from 'react'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '../../components/Listings'
import listings from '@/airbnb-listings.json'

const index = () => {

  const items =useMemo(():any => listings,[])

  const [activeCategory,setActiveCategory] = useState<string>()

  const handleCategoryChange = (category:string):void => {
    setActiveCategory(category)
    
  }
  return (
    <View style={{flex:1,marginTop: Platform.OS === "ios" ? 97 : 136,}}>
      <Stack.Screen
        options={{
          header:() => (<ExploreHeader setCategoryChange={handleCategoryChange}/>)
        }}
      />
        <Listings listings={items} activeCategory={activeCategory!}/>
    </View>
  )
}


const styles = StyleSheet.create(
  {
    container:{
      flex:1,
      // paddingTop:Platform.select({android:300})
    }
  }
)

export default index