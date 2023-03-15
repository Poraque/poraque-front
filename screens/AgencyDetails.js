import { SafeAreaView, View, Image, TouchableOpacity, Text } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { BackIcon, FullHeartIcon, EmptyHeartIcon, AgenciaImg, StarIcon, ChatIcon } from '../assets';
import { useNavigation } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AgencyDetails = () => {

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
            <View className="px-5 pt-10 flex-row justify-between items-center">
                <Image
                    source={AgenciaImg}
                    className="w-28 h-28 object-cover rounded"
                />
                <View className="flex-1 ml-2">
                    <View>
                        <Text className ="text-[#393F4E] font-semibold text-[20px] ml-1">
                            Amazon Destinations Turismo
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center mt-2">
                        <View className="flex-row justify-start">
                            <Image
                                source={StarIcon}
                                className="w-4 h-4 object-cover"
                            />
                            <Text className ="text-[#393F4E] font-semibold text-[10px] ml-1">4,5</Text>
                        </View>
                        <Image
                            source={ChatIcon}
                            className="w-6 h-6 object-cover"
                        />
                    </View>
                </View>
            </View>
            <View className="flex-1 mx-5 my-6">
                <Text className="text-justify text-[14px]">
                    {`\t\t\tO nosso objetivo é de poder proporcionar momentos e passeios inesquecíveis para aqueles que buscam os nossos serviços e que sonham conhecer a Amazônia a muito tempo.`}
                </Text>
                <Text className="text-justify font-bold text-[18px] mt-5">
                    Nossos Pacotes
                </Text>
                <Text className="text-justify font-bold text-[14px] ml-3 mt-3">
                    {`\u2022 Roteiros em Grupos;\n\u2022 Roteiros Privativos;\n\u2022 A terra das Cachoeiras;\n\u2022 Festival de Parintins;\n\u2022 Pacote Serra do Tepequém;\n\u2022 Passeios a Roraima.`}
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default AgencyDetails;