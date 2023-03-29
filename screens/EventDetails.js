import { SafeAreaView, View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { BackIcon, FullHeartIcon, EmptyHeartIcon, AgenciaImg, StarIcon, ChatIcon, Local1 } from '../assets';
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { API } from '../api/api';

const Stack = createNativeStackNavigator();

const EventDetails = ({route}) => {
    const api = new API();
    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


    const [data, setData] = useState(undefined);
    // const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
    
      const getEventDetails = async () =>{
          const event = await api.getEvent(route.params.eventId);
          setData(event);
      }
      getEventDetails();    
    },[])

    return ( data ?
        <SafeAreaView className=" bg-white flex-1">
            <View className="flex-row justify-between pt-10 px-5">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={BackIcon}
                        className="w-5 h-5 object-cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLiked(!liked)}>
                    <Image
                        source={`${liked ? FullHeartIcon : EmptyHeartIcon}`}
                        className="w-5 h-5 object-cover"
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Image style={styles.image} source={Local1}/>
                <Text style={styles.title}>{data ? data.event_title : null}</Text>
                <Text style={styles.adress}>
                    {data ? data.event_local: null}
                    {'\n'}
                    {data ? data.event_working_days : null}
                </Text>
                <Text style={styles.know}>Conhecendo mais...</Text>
                <Text style={styles.text}>
                    {data ? data.event_description: null}
                </Text>
            </View>
        </SafeAreaView> :
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#406d87" />
        </View> 
    )
}

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'Inter_500Medium',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 20,
    color: '#393F4E'
  },
  image: {
    height: 400,
    width: 400,
    marginTop: 15
  },
  text: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'justify',
    fontSize: 14
  },
  know: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    //fontFamily: 'Inter_500Medium',
    color: '#393F4E'
  },
  adress: {
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'left'
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 25,
    bottom: 120
  },
})

export default EventDetails;