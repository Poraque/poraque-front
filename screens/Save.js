import React, {useLayoutEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import SaveScreen from './SaveScreen';
import EventDetails from './EventDetails';

const Stack = createNativeStackNavigator();

export default function Save({ route }) {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        });
    }, []);

    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Save" component={SaveScreen}/>
          <Stack.Screen name="SaveDetails" component={EventDetails} initialParams={route.params}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}