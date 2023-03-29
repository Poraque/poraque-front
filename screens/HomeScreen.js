import { View, ActivityIndicator, Text, ScrollView, StyleSheet, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect, useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { BackIcon, IconSearch, Local1 } from '../assets';
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
                <ScrollView className="pb-6" nestedScrollEnabled={true}>
                    {/* -------------------- Pontos Turísticos ------------------------- */}
                    <View className="mt-6">
                        <View className="flex-row justify-between mx-4">
                            <Text
                                className="text-[#393F4E] font-semibold text-lg"
                            >
                                Pontos Turísticos
                            </Text>
                            <TouchableOpacity 
                            onPress={() => searchTypeEvents("Turistico", 0)}
                            >
                                <Text
                                    className="text-[#277AFF]">
                                    {'Ver mais >'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap"
                        >
                            <FlatList
                                className="-mx-4"
                                nestedScrollEnabled={true}
                                contentContainerStyle={styles.flatlistCards}
                                data={data.filter((event) => {
                                    return event.event_type === "Turistico";
                                })}
                                numColumns={2}
                                keyExtractor={(item) => String(item._id)}
                                renderItem={({ item }) => {
                                    return <View
                                        style={styles.shadow}>
                                        <ItemCardContainer
                                            key={item._id} id={item._id} imageSrc={item.event_img} title={item.event_title} stars={item.event_stars} location={item.event_local} />
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
                                className="text-[#393F4E] font-semibold text-lg">
                                    Hotéis
                            </Text>
                            <TouchableOpacity                            
                            
                                onPress={() => searchTypeEvents("Hotel", 0)}>
                                <Text
                                    className="text-[#277AFF]"
                                >
                                    {'Ver mais >'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap"
                        >
                            <FlatList
                                className="-mx-4"
                                nestedScrollEnabled={true}
                                contentContainerStyle={styles.flatlistCards}
                                data={data.filter((event) => {
                                    return event.event_type === "Hotel";
                                })}
                                numColumns={2}
                                keyExtractor={(item) => String(item._id)}
                                renderItem={({ item }) => {
                                    return <View
                                        style={styles.shadow}>
                                        <ItemCardContainer
                                            key={item._id} id={item._id} imageSrc={item.event_img} title={item.event_title} stars={item.event_stars} location={item.event_local} />
                                    </View>
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>

                    {/* -------------------- Locais para comer ------------------------- */}
                    <View className="mt-6">
                        <View className="flex-row justify-between mx-4">
                            <Text
                                className="font-semibold text-lg"
                            >
                                Locais para comer
                            </Text>
                            <TouchableOpacity
                            onPress={() => searchTypeEvents("Feira", 0)}
                            >
                                <Text
                                    className="text-[#277AFF]"
                                >
                                    {'Ver mais >'}
                                </Text>
                                
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FlatList
                                className="mt-6 mx-2"
                                nestedScrollEnabled={true}
                                contentContainerStyle={styles.flatlistCards}
                                data={data.filter((event) => {
                                    return event.event_type === "Feira";
                                })}
                                numColumns={2}
                                keyExtractor={(item) => String(item._id)}
                                renderItem={({ item }) => {
                                    return <View>
                                        <ItemCardContainer
                                            key={item._id} imageSrc={item.event_img} title={item.event_title} stars={item.event_stars} location={item.event_local} />
                                    </View>
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>
                </ScrollView>
            }
 {searchText || searchType ? <View className="mt-6" style={{ minHeight:800}}>
                <View className="flex-row mx-4">
                <TouchableOpacity onPress={() => setSearchType(false)}>
                <Image
                    source={BackIcon}
                    className="w-5 h-5 object-cover" style={styles.iconBack}
                />
                </TouchableOpacity>
                    <Text
                    className ="text-[#393F4E] font-semibold text-lg"
                    >Busca por {searchText || (searchType == "Feira" ? "Locais para comer" : searchType)}</Text>
                </View>
                {searchLoading ? <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#406d87" />
        </View>: <View
                    className="px-4 mt-4 items-center justify-evenly"
                    style={{marginBottom:10}}
                    >
                    <FlatList
                    className="-mx-4"
                    numColumns={2}
                    columnWrapperStyle={{justifyContent: 'space-between', marginLeft: 10, marginRight: 10}}
                        data={filter}
                        keyExtractor={(item) => String(item._id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                            return <View
                            style={styleFilter.shadow}>
                                    <ItemCardContainerFilter
                                    key={item._id} id={item._id} imageSrc={item.event_img} title={item.event_title} stars={item.event_stars} location={item.event_local}/>
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
    },
    flatlistCards: {
        alignItems: 'flex-start'
    },
    iconBack: {
        margin: 5
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