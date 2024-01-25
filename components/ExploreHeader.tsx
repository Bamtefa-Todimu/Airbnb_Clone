import { View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {Link } from 'expo-router'
import React, { useState, useRef, useEffect } from 'react'
import * as Haptics from 'expo-haptics'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const categories = [
  {
    name: 'Tiny homes',
    icon: 'home',
  },
  {
    name: 'Cabins',
    icon: 'cabin',
  },
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'City',
    icon: 'apartment',
  },
  {
    name: 'Beachfront',
    icon: 'beach-access',
  },
  {
    name: 'Countryside',
    icon: 'nature-people',
  },
];

interface Props{
    setCategoryChange: (category:string) => void
}

const ExploreHeader = ({setCategoryChange}:Props) => {

    const scrollRef = useRef<ScrollView>(null)
    const categoryRef = useRef<Array<TouchableOpacity>>([])
    const [activeIndex,setActiveIndex] = useState(0)


    useEffect(() => {
        categoryRef.current[activeIndex].measure((x) => {

            scrollRef.current?.scrollTo({x:x - 16,y:0,animated:true})
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setCategoryChange(categories[activeIndex].name)
    },[activeIndex])


  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#ffffff"}}>
        <View style={[styles.container,Platform.select({android:{
            
        }})]}>
            <View style={styles.exploreActions}>
                <Link href='/(modals)/booking' asChild>
                    <TouchableOpacity>
                        <View style={styles.bookingsSearch}>
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text style={{fontFamily:'mon-b'}}>Where to?</Text>
                                <Text style={{ color: Colors.grey, fontFamily: 'mon' }}>Anywhere · Any week</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name="options-outline" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView 
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
                {
                    alignItems:'center',
                    gap:30,
                    paddingHorizontal:16

                }
            }
            >
                {
                    categories && categories.map((cat,index) => (
                        <TouchableOpacity ref={(el) => (categoryRef.current[index] = el!)} key={index} onPress={() => setActiveIndex(index)} style={activeIndex === index ? styles.catContainerActive:styles.catContainer} >
                            <MaterialIcons name={cat.icon as any} size={24} color={activeIndex === index ? "#000": Colors.grey } />
                            <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        height: Platform.OS === "ios"?130:137,
        backgroundColor:'#fff',
        paddingHorizontal:16
    },
    exploreActions:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    bookingsSearch:{
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        width: 280,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
        width: 1,
        height: 1,
        },
    },
    filterBtn:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 24,
        padding:10,
    },
    categoryTextActive:{
        color:"#000",
    },
    categoryText:{
        color:Colors.grey,
        alignItems:'center',
        justifyContent:'center'
    },
    catContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    catContainerActive:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        borderBottomWidth:2,
        borderBottomColor:"#000"
    },
    
})

export default ExploreHeader