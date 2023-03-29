import { View, Text, SafeAreaView, Image, TextInput, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { IconSearch } from '../assets';
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
            <View className="relative flex-row items-center rounded-lg justify-center mt-10 mx-4 mb-4 bg-[#EEEFF0]">
                <Image
                    source={IconSearch}
                    className="
                    w-4 h-4 rounded-md 
                    object-cover ml-4"
                />
                <TextInput
                    className="
                    w-60
                    flex-1 items-center py-1 px-4
                    px4 shadow-xl"
                    placeholder='Pesquisar'
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