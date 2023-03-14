import { SafeAreaView } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import EventDetails from './EventDetails';

const Stack = createNativeStackNavigator();

const Home = ({ route }) => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        });
    }, []);

    return (
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} initialParams={route.params}/>
            <Stack.Screen name="EventDetails" component={EventDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  
}

export default Home;