import { SafeAreaView, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { BackIcon, FullHeartIcon, EmptyHeartIcon, AgenciaImg, StarIcon, ChatIcon, Local1 } from '../assets';
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const EventDetails = () => {

    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
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
                <Text style={styles.title}>Teatro Amazonas</Text>
                <Text style={styles.adress}>
                    Endereço: Largo de São Sebastião.
                    {'\n'}
                    Funcionamento: terça a sábado das 9h às 14h.
                </Text>
                <Text style={styles.know}>Conhecendo mais...</Text>
                <Text style={styles.text}>
                    Inaugurado em 1896, o Teatro Amazonas representa o ápice do ciclo econômico da borracha.
                    Sua grandiosidade reflete a riqueza que passou pela cidade, sendo que a maioria do material usado na
                    decoração foi trazida da Europa, ou seja, materiais caros e sofisticados. O Teatro Amazonas é o
                    maior patrimônio cultural e histórico da cidade.
                </Text>
            </View>
        </SafeAreaView>
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
      fontSize: 14,
      //fontFamily: 'Inter_400Regular'
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