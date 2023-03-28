import { View, Text, TextInput, Image, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { IconSearch, Local1, Local6, Local3, Local4, Local5 } from '../assets';
import SaveCardContainer from '../components/SaveCardContainer';

export default function SaveScreen() {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
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

        <Text className="text-[#393F4E] font-semibold text-[35px] ml-4 my-6">Salvos</Text>

        <ScrollView>
            <SaveCardContainer
            imageSrc={Local1}
            title={'Mirante do Gavião'}
            location={'Rua Beco Francisco Cardoso Nossa Senhora Auxiliadora, Novo Airão'}/>
            <SaveCardContainer
            imageSrc={Local6}
            title={'Mirante do Gavião'}
            location={'Rua Beco Francisco Cardoso Nossa Senhora Auxiliadora, Novo Airão'}/>
            <SaveCardContainer
            imageSrc={Local3}
            title={'Mirante do Gavião'}
            location={'Rua Beco Francisco Cardoso Nossa Senhora Auxiliadora, Novo Airão'}/>
            <SaveCardContainer
            imageSrc={Local4}
            title={'Mirante do Gavião'}
            location={'Rua Beco Francisco Cardoso Nossa Senhora Auxiliadora, Novo Airão'}/>
            <SaveCardContainer
            imageSrc={Local5}
            title={'Mirante do Gavião'}
            location={'Rua Beco Francisco Cardoso Nossa Senhora Auxiliadora, Novo Airão'}/>
        </ScrollView>
    </SafeAreaView>
  )
}