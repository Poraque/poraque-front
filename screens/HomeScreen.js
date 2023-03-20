import { View, ActivityIndicator, Text, ScrollView, StyleSheet, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect, useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { LogoUser, IconFilter, IconBrilho, IconUser, IconMala, Local1 } from '../assets';
import MenuContainer from '../components/MenuContainer';
import ItemCardContainer from '../components/ItemCardContainer';
import ItemCardContainerFilter from '../components/ItemCardContainerFilter';
import { API } from '../api/api';

import { useBackHandler } from '@react-native-community/hooks';
import _ from 'lodash';
import anav from "../assets/local_images/card-igreja.png"

const HomeScreen = ({route}) => {
    const api = new API()
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('');

    const [searchLoading, setSearchLoading] = useState(false);
    const [actualPage, setActualPage] = useState(0)

    const [hasMoreData, setHasMoreData] = useState(true);
    const [moreEventsLoading, setMoreEventsLoading] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    const delaySearch = _.debounce( async (text)=>{
        if(searchText){
            const events = await api.searchEvents(searchText, actualPage);
            
            setFilter(events);
            setSearchLoading(false);        
            console.log(searchText);
        }
    }, 100);

    const loadMore = async ()=>{
        if(filter.length >= 10 && hasMoreData){
            const newActualPage = actualPage + 1
            setActualPage(newActualPage);
            

            if(actualPage != 0){
                setMoreEventsLoading(true);
                console.log(actualPage);
                let events = false;
                if(searchType){
                    events = await api.searchTypeEvents(searchType, actualPage)
                }
                if(searchText){            
                    events = await api.searchEvents(searchText, actualPage);
                }
                events ? setMoreEventsLoading(false) : null; 
                if(events.length > 0){
                    let newFilter = filter.concat(events)
                    console.log(newFilter);
                    setFilter(newFilter);
                }else{
                    setHasMoreData(false);
                }
            }
        }
    
    }

    const handleSearchTextChange = (text) =>{
        setActualPage(0);
        setSearchText(text);
        setSearchType('');
        setSearchLoading(true);
        setMoreEventsLoading(false);
        setHasMoreData(true);
        delaySearch();
        
    }
    
    useEffect(() => {
        if (route.params) {
            setData(route.params.eventsHome);
        }
    }, [])

    const searchTypeEvents = async (type, start) =>{
        setSearchType(type);
        setSearchLoading(true);        
        setHasMoreData(true);
        
        const events = await api.searchTypeEvents(type, start)
        
        setFilter(events)
        setSearchLoading(false);

    }

/*
    useEffect(() => {
        setIsLoading(true);
        getData().then(() => {
            setIsLoading(false);
        });
    }, []);
*/
    useBackHandler(() => {
        if(filter){
            setFilter([]);
            setActualPage(0);
            setSearchText('');
            setSearchType('');
            setSearchLoading(false);
            setMoreEventsLoading(false);
            setHasMoreData(true);
            return true;    
        }else{
            BackHandler.exitApp()
            return false;
        }
    });

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
                    onChangeText={(text)=>handleSearchTextChange(text)}
                    value={searchText}
                />
                <Image
                    source={IconFilter}
                    className="w-4 h-4 object-cover"
                />
            </View>

            {/* Menu container */}
            {isLoading ?
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#406d87" />
                </View>
                :
                <ScrollView>
                    <View className="flex-row items-center justify-around mt-4">
                        <MenuContainer
                            key={"sugestao"}
                            title="Sugestão"
                            imageSrc={IconBrilho}
                            type={type}
                            setType={setType}
                        />
                        <MenuContainer
                            key={"popular"}
                            title="Popular"
                            imageSrc={IconUser}
                            type={type}
                            setType={setType}
                        />
                        <MenuContainer
                            key={"agencias"}
                            title="Agências"
                            imageSrc={IconMala}
                            type={type}
                            setType={setType}
                        />
                    </View>

                    {/* -------------------- Pontos Turísticos ------------------------- */}
                    <View className="mt-6">
                        <View className="flex-row justify-between mx-4">
                            <Text
                                className="text-[#393F4E] font-semibold text-lg"
                            >Pontos Turísticos</Text>
                            <TouchableOpacity 
                    onPress={() => searchTypeEvents("Turistico", 0)}
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
                                            key={item._id} id={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local} />
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
                            
                    onPress={() => searchTypeEvents("Hotel", 0)}>
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
                                            key={item._id} id={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local} />
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
                            <TouchableOpacity
                    onPress={() => searchTypeEvents("Festival", 0)}>
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
                                            key={item._id} id={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local} />
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
                    className ="text-[#393F4E] font-semibold text-lg"
                    >Feiras</Text>
                    <TouchableOpacity
                    onPress={() => searchTypeEvents("Feira", 0)}>
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
                        data={data.filter((event)=>{
                            return  event.event_type === "Feira";
                        })}
                        keyExtractor={(item) => String(item._id)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({item}) => {
                            return <View 
                                    style={styles.shadow}>
                                    <ItemCardContainer
                                    key={item._id} id={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local}/>
                                </View>
                        }}
                    >
                    </FlatList>
                </View>
            </View>
            
        </ScrollView>
        }
    {searchText || searchType ? <View className="mt-6" style={{ minHeight:800}}>
                <View className="flex-row justify-between mx-4">
                    <Text
                    className ="text-[#393F4E] font-semibold text-lg"
                    >Busca por {searchText || searchType}</Text>
                </View>
                {searchLoading ? <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#406d87" />
        </View>: <View
                    className="px-4 mt-4 items-center justify-evenly"
                    style={{marginBottom:170}}
                    >
                    <FlatList
                    className="-mx-4"
                        data={filter}
                        keyExtractor={(item) => String(item._id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                            return <View
                            style={styleFilter.shadow}>
                                    <ItemCardContainerFilter
                                    key={item._id} id={item._id} imageSrc={Local1} title={item.event_title} stars={item.event_stars} location={item.event_local}/>
                                </View>
                        }}
                        onEndReached={()=>{loadMore()}}
                        onEndReachedThreshold={0.1}
                    >
                    </FlatList>
                    {moreEventsLoading &&
                    <ActivityIndicator style={{ marginTop: 10 }} size="large" color="#406d87" />}
                </View>
            }
            </View>    
     : null}
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

const styleFilter = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})

export default HomeScreen;