import { View, Text, Image, TouchableOpacity } from 'react-native'
import { IconStar, IconGps } from '../assets';
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const ItemCardContainer = ({ id, imageSrc, title, stars, location }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={({ item }) => { navigation.navigate('EventDetails', { item }) }}
            className="rounded-md space-y-2 px-3 py-3 mx-1"
        >
            <View className="w-[141px] h-[116]">
                <Image
                    source={imageSrc}
                    className="w-36 h-32 rounded-md object-cover"
                />
            </View>
            <View className="flex-row justify-between items-baseline">
                <Text className="text-[11px] font-semibold">{title?.length > 20 ? `${title.slice(0, 20)}...` : title}</Text>
                <Text className="text-[8px]">{stars}</Text>
            </View>
            <View className="flex-row justify-between">
                <View className="flex-row justify-start">
                    <Image
                        source={IconGps}
                        className="w-[10px] h-[10px] object-cover"
                    />
                    <Text className="text-[8px]">{location?.length > 28 ? `${location.slice(0, 28)}...` : location}</Text>
                </View>
                <Image
                    source={IconStar}
                    className="w-[12px] h-[12px] object-cover"
                />
            </View>
        </TouchableOpacity>
    )
}

export default ItemCardContainer;