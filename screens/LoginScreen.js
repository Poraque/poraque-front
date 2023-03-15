import { View, Text, Button, TextInput, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackHandler } from '@react-native-community/hooks';
import { LoginLockIcon, LoginUserIcon, LoginEyeIcon, TuristsImage } from '../assets';

const LoginScreen = ({route}) => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useBackHandler(() => {
        return true;
    });

    return(
        <SafeAreaView className="flex-1">
            <Text  className="text-center text-[#393F4E] text-[36px] my-[80px]">Login</Text>
            <View className="mx-[60px] mb-5 flex">
                <View className="flex-row border-b-2 mb-[50px]">
                    <Image
                        source={LoginUserIcon}
                        className="w-6 h-6 object-cover"
                    />
                    <TextInput
                        placeholder="Email"
                        className="text-[#393F4E] text-[16px] font-bold ml-2 flex-auto"
                    />
                </View>
                <View className="flex-row justify-between border-b-2 mb-[50px]">
                    <Image
                        source={LoginLockIcon}
                        className="w-6 h-6 object-cover"
                    />
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={true}
                        className="text-[#393F4E] text-[16px] font-bold ml-2 flex-auto"
                    />
                    <TouchableOpacity>
                        <Image
                            source={LoginEyeIcon}
                            className="w-6 h-6 object-cover"
                        />
                    </TouchableOpacity>
                </View>
                <Pressable style={styles.button}
                    onPress={() => {navigation.navigate('TabNavigation',{
                        eventsHome: route.params.eventsHome,
                    })}}
                >
                    <Text style={styles.text}>ENTRAR</Text>
                </Pressable>
            </View>
            <View className="flex-1 flex flex-col justify-between">
                <View className="flex-row justify-center">
                    <Text className="text-[15px]">Não tem uma conta?</Text>
                    <TouchableOpacity>
                        <Text className="text-[#393F4E] text-[15px] font-bold"> Criar uma conta</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={TuristsImage}
                    className="object-cover"
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 15,
      backgroundColor: '#FF9547',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

export default LoginScreen;