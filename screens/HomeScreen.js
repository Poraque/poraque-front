import { View, ActivityIndicator, Text, ScrollView, StyleSheet, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { IconSearch, IconBrilho, IconUser, IconMala, Local1 } from '../assets';
import MenuContainer from '../components/MenuContainer';
import ItemCardContainer from '../components/ItemCardContainer';

const HomeScreen = ({ route }) => {

    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
        if (route.params) {
            setData(route.params.eventsHome);
        }
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
                <ScrollView className="pb-6">
                    {/* -------------------- Pontos Turísticos ------------------------- */}
                    <View className="mt-6">
                        <View className="flex-row justify-between mx-4">
                            <Text
                                className="text-[#393F4E] font-semibold text-lg"
                            >Pontos Turísticos</Text>
                            <TouchableOpacity>
                                <Text
                                    className="text-[#277AFF]"
                                >{'Ver mais >'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap"
                        >
                            <FlatList
                                className="-mx-4"
                                data={data.filter((event) => {
                                    return event.event_type === "Hotel";
                                })}
                                keyExtractor={(item) => String(item._id)}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                renderItem={({ item }) => {
                                    return <View
                                        style={styles.shadow}>
                                        <ItemCardContainer
                                            key={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local} />
                                    </View>
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>

                    {/* -------------------- Hotéis ------------------------- */}
                    <View className="mt-6">
                        <View className="flex-row justify-between mx-4">
                            <Text
                                className="text-[#393F4E] font-semibold text-lg"
                            >Hotéis</Text>
                            <TouchableOpacity                            
                            >
                                <Text
                                    className="text-[#277AFF]"
                                >{'Ver mais >'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap"
                        >
                            <FlatList
                                className="-mx-4"
                                data={data.filter((event) => {
                                    return event.event_type === "Hotel";
                                })}
                                keyExtractor={(item) => String(item._id)}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                renderItem={({ item }) => {
                                    return <View
                                        style={styles.shadow}>
                                        <ItemCardContainer
                                            key={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local} />
                                    </View>
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>

                    {/* -------------------- Festivais ------------------------- */}
                    <View className="mt-6">
                        <View className="flex-row justify-between mx-4">
                            <Text
                                className="text-[#393F4E] font-semibold text-lg"
                            >Festivais</Text>
                            <TouchableOpacity>
                                <Text
                                    className="text-[#277AFF]"
                                >{'Ver mais >'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap"
                        >
                            <FlatList
                                className="-mx-4"
                                data={data.filter((event) => {
                                    return event.event_type === "Festival";
                                })}
                                keyExtractor={(item) => String(item._id)}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                renderItem={({ item }) => {
                                    return <View
                                        style={styles.shadow}>
                                        <ItemCardContainer
                                            key={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local} />
                                    </View>
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>

                    {/* -------------------- Feiras ------------------------- */}
                    <View className="mt-6">
                        <View className="flex-row justify-between mx-4">
                            <Text
                                className="text-[#393F4E] font-semibold text-lg"
                            >Feiras</Text>
                            <TouchableOpacity>
                                <Text
                                    className="text-[#277AFF]"
                                >{'Ver mais >'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap"
                        >
                            <FlatList
                                className="-mx-4"
                                data={data.filter((event) => {
                                    return event.event_type === "Feira";
                                })}
                                keyExtractor={(item) => String(item._id)}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                renderItem={({ item }) => {
                                    return <View
                                        style={styles.shadow}>
                                        <ItemCardContainer
                                            key={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local} />
                                    </View>
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>
                </ScrollView>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})

export default HomeScreen;