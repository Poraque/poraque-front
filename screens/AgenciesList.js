import { View, Text, SafeAreaView, Image, TextInput, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { LogoUser } from '../assets';
import AgenciesCardContainer from '../components/AgenciesCardContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AgenciesList = () => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false );

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className=" bg-white flex-1">
            <View className=" flex-row items-center justify-center mt-10 mb-2">
                <Image
                source={LogoUser}
                className="w-6 h-6 object-cover"
                />
                <TextInput
                    className="
                        w-60
                        flex-row items-center
                        bg-[#EEEFF0] mx-4
                        rounded-xl py-1
                        px4 shadow-lg"        
                />
            </View>
    
            {/* Menu container */}
            {isLoading ? 
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#406d87" />
            </View>
            : 
            <ScrollView>
                <View className="flex-row justify-between mx-4">
                    <Text
                    className ="text-[#393F4E] font-semibold text-[20px] mt-6"
                    >Agências de Turismo</Text>
                </View>
    
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AgencyDetails')
                }}>
                    <AgenciesCardContainer/>
                </TouchableOpacity>
    
            </ScrollView>
            }
            
        </SafeAreaView>
    )
}

export default AgenciesList;