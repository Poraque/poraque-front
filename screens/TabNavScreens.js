import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import Agencies from './Agencies';
import Home from './Home';

const TabNavScreens = ({route}) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })
    }, [])

    function Noticias() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notícias</Text>
        </View>
    );
    }

    function Criar() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Criar</Text>
        </View>
    );
    }

    function Salvos() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Salvos</Text>
        </View>
    );
    }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if(route.name == 'Home') {
                        iconName = 'home'
                    } else if(route.name == 'Noticias') {
                        iconName = 'md-calendar';
                    } else if(route.name == 'Criar') {
                        iconName = 'add-circle';
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
            <Tab.Screen name="Noticias" component={Noticias} />
            <Tab.Screen name="Criar" component={Criar} />
            <Tab.Screen name="Salvos" component={Salvos} />
            <Tab.Screen name="Agencias" component={Agencies} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavScreens;