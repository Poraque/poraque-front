import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { IconGps } from '../assets';

export default function SaveCardContainer({ imageSrc, title, location }) {
  return (
    <TouchableOpacity className="bg-[#edf0f3] flex px-6 py-4 mx-4 mb-6 rounded-xl">
        <Image
            source={imageSrc}
            className="w-full h-40 rounded-xl object-cover"
        />

        <Text className="text-[#393F4E] font-semibold text-[16px] my-4">{title}</Text>

        <View className="flex-row items-center">
            <Image
                source={IconGps}
                className="h-4 rounded-md object-cover"
            />
            <Text
                className="text-[#393F4E] font-semibold text-[10px]">
                    {location?.length > 50 ? `${location.slice(0, 50)}...` : location}
            </Text>
        </View>
    </TouchableOpacity>
  )
}