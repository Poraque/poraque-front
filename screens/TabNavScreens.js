import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Agencies from './Agencies';
import Home from './Home';
import SaveScreen from './SaveScreen';

const TabNavScreens = ({route}) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })
    }, [])

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if(route.name == 'Home') {
                        iconName = 'home'
                    } else if(route.name == 'Salvos') {
                        iconName = 'heart';
                    } else if(route.name == 'Agencias') {
                        iconName = 'briefcase';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FF9547',
                tabBarInactiveTintColor: '#4E73A5',
            })}
        >
            <Tab.Screen name="Home" component={Home} initialParams={route.params} />
            <Tab.Screen name="Salvos" component={SaveScreen} />
            <Tab.Screen name="Agencias" component={Agencies} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavScreens;