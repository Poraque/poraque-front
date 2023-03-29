import { SafeAreaView, View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { BackIcon, FullHeartIcon, EmptyHeartIcon, AgenciaImg, StarIcon, ChatIcon, Local1 } from '../assets';
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { API } from '../api/api';
import { Buffer } from 'buffer';
import { insertDB, deleteEventSaved, checkExistsOnDB } from '../DBLocal/db';

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
    const [image, setImage] = useState(Local1);

    // const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
    
      const getEventDetails = async () =>{
          const event = await api.getEvent(route.params.eventId);
          setData(event);
          try{
            const base64 = Buffer.from(await event.event_img.data.data).toString('base64');
            setImage({uri:`data:image/jpeg;base64,${base64}`});
          }catch(err){
          
          }
        }

      if(checkExistsOnDB(route.params.eventId)){
        setLiked(true);
      }

        
      getEventDetails();    
    },[])

    const btLike = () =>{
      if(liked){
        deleteEventSaved(route.params.eventId)
        setLiked(false);
      }else{
        insertDB(route.params.eventId)
        setLiked(true);
      }

      checkExistsOnDB(route.params.eventId).then((exists) => console.log(`O id 1 ${exists ? "existe" : "não existe"} na tabela`))
      .catch((error) => console.error("Ocorreu um erro:", error));
    }
    return ( data ?
        <SafeAreaView className=" bg-white flex-1">
            <View className="flex-row justify-between pt-10 px-5">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={BackIcon}
                        className="w-5 h-5 object-cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => btLike()}>
                    <Image
                        source={`${liked ? FullHeartIcon : EmptyHeartIcon}`}
                        className="w-5 h-5 object-cover"
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Image style={styles.image} source={image} />
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