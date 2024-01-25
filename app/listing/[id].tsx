import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { useLocalSearchParams } from 'expo-router'
import { listing } from '@/types/listings'
import listings from '@/airbnb-listings.json'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'


const {width} = Dimensions.get("window")

const Listing = () => {

   const {id} = useLocalSearchParams<{id:string}>() 
   const selectedListing = (listings as listing[]).find((lt) => lt.id === id)


  return (
    <View style={{flex:1}}>

    <Animated.ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Animated.View>
        <Animated.Image source={{uri:selectedListing?.xl_picture_url}} resizeMode={'cover'} style={styles.image} />
      </Animated.View>

      <View style={{padding:16}}>
        <Text style={{fontFamily:'mon-sb',fontSize:26,marginBottom:10}}>{selectedListing?.name}</Text>
        <View style={{flexDirection:'row',alignItems:'center',gap:2,marginBottom:5}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialIcons name="star" size={16} color={"#000"} />
            <Text style={{fontFamily:'mon'}}>{(selectedListing?.review_scores_rating)!/20} •</Text>
          </View>
          <Text style={{textDecorationLine:'underline',fontFamily:'mon-sb'}}>{selectedListing?.number_of_reviews} reviews</Text>
        </View>
        <Text style={{fontFamily:'mon',marginBottom:20}}>{selectedListing?.host_location}</Text>

        <View style={{flex:1,flexDirection:'row',gap:10,justifyContent:'space-between',paddingVertical:24,borderTopWidth:StyleSheet.hairlineWidth}}>
          <View style={{flexShrink:1,gap:4}}>
              <Text style={{fontSize:24,fontFamily:'mon-sb'}}>{selectedListing?.room_type} hosted by {selectedListing?.host_name}</Text>
              <Text style={{fontFamily:'mon',fontSize:16,}}>{selectedListing?.guests_included} guests · {selectedListing?.bedrooms} bedrooms · {selectedListing?.beds} bed ·{' '}
            {selectedListing?.bathrooms} bathrooms</Text>
          </View>
          <Image style={{width:50,height:50,borderRadius:50,backgroundColor:Colors.grey}} source={{uri:selectedListing?.host_picture_url}} resizeMode='contain' />
        </View>

        <Text style={{marginVertical:20,fontFamily:'mon',lineHeight:22}}>{selectedListing?.description}</Text>
      </View>

    </Animated.ScrollView>

      <Animated.View entering={SlideInDown.delay(200)} style={{flexDirection:'row',justifyContent:'space-between',borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:Colors.grey,width:'100%',height:100,position:'absolute',bottom:0,left:0,right:0,backgroundColor:'#fff',paddingTop:16,paddingHorizontal:25}}>
        <Text style={{fontFamily:'mon-sb',fontSize:16,marginTop:15}}>€{selectedListing?.price} <Text style={{fontFamily:'mon'}}>night</Text></Text>
        <TouchableOpacity style={[defaultStyles.btn,{width:160}]}>
          <Text style={defaultStyles.btnText}>Reserve</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>

  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  image:{
    height:300,
    width,
  }

})

export default Listing