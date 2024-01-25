import { View, Text, TouchableOpacity, ListRenderItem, FlatList, Image, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import Animated , {FadeInRight,FadeOutLeft} from 'react-native-reanimated'
import {listing} from '@/types/listings'

interface Props{
  listings:listing[],
  activeCategory:string
}

const Listings = ({listings,activeCategory}:Props) => {

  const [loading,setLoading] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false),200)
  },[activeCategory])

  const RenderListing:ListRenderItem<any> = ({item}) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity >
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft} >
          <Image
            source={{uri:item.xl_picture_url}}
            resizeMode='cover'
            style={styles.image}
          />
          <TouchableOpacity style={{position:'absolute',right:30,top:30}}>
            <Ionicons name='heart-outline' size={24} color={'#000'} /> 
          </TouchableOpacity>

          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{fontSize:16,fontFamily:'mon-sb'}}>{item.name}</Text>
            <View  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Ionicons name='star' size={16} color={'#000'} />
              <Text style={{fontFamily:'mon-sb'}}>{item.review_scores_rating/20}</Text>
            </View>
          </View>

          <Text style={{fontFamily:'mon'}}>{item.room_type}</Text>

          <View style={{flexDirection:'row',gap:4}}>
            <Text style={{fontFamily:'mon-sb'}} >€{item.price}</Text>
            <Text style={{fontFamily:'mon'}}>night</Text>
          </View>
        
        </Animated.View>
        
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={defaultStyles.container}>
      
      <FlatList
        data={loading?[]:listings}
        renderItem={RenderListing}
        keyExtractor={item => item.id}
      />
    
    </View>
  )
}

const styles = StyleSheet.create({

  listing:{
    padding:16,
    marginVertical:16,
    gap:10
  },
 
  image:{
    width:'100%',
    height:300,
    borderRadius:8,
  }
})

export default Listings