import { View, Text, Image } from 'react-native'
import React from 'react'
import { Pexe, IconGps, CoolEmoji, HeartEmoji } from '../assets';

const AgenciesCardContainer = () => {
  return (
    <View
        className="mt-4 h-16 bg-slate-100 mx-2 rounded-md flex-row justify-start"
    >
        <Image
        source={Pexe}
        className="w-10 h-10 rounded-full object-cover mt-3 ml-3"
        />
        <View className="mt-3 mx-3 flex-auto">
            <Text
            className="text-[#393F4E] font-semibold text-[16px]"
            >Amazon Turismo</Text>
            <View className="flex-row justify-between">
                <View className="flex-row">
                    <Image
                    source={IconGps}
                    className="w-5 h-5 rounded-full object-cover"
                    />
                    <Text className="text-[#A2A2A2] text-[16px]">Manaus</Text>
                </View>
                <View className="flex-row items-center">
                    <View className="p-[3px] mr-2 rounded-full bg-slate-300">
                        <Image
                        source={CoolEmoji}
                        className="w-4 h-4 rounded-full object-cover bg-slate-300"
                        />
                    </View>
                    <View className="p-[3px] mr-2 rounded-full bg-slate-300">
                        <Image
                        source={HeartEmoji}
                        className="w-4 h-4 rounded-full object-cover"
                        />
                    </View>
                    <View className="p-[1px] rounded-full bg-slate-300">
                        <Text className="px-1">
                            +2mil
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
  )
}

export default AgenciesCardContainer;