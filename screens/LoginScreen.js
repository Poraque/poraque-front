import { View, Text, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({route}) => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    return(
        <SafeAreaView className="flex-1">
            <Text  className="text-center">Login</Text>
            <Button
                onPress={() => {navigation.navigate('TabNavigation',{
                    eventsHome: route.params.eventsHome,
                  })}}
                title="ENTRAR"
            />
        </SafeAreaView>
    )
}

export default LoginScreen;