import { View, Text, Image, TouchableOpacity } from 'react-native'
import { IconStar, IconGps, Local1 } from '../assets';
import { useNavigation } from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import { Buffer } from 'buffer';


const ItemCardContainerFilter = ({id, imageSrc, title, stars, location}) => {
    const navigation = useNavigation();
    const [image, setImage] = useState(Local1);


    useEffect(()=>{
        const getImage = async () =>{
            if( typeof imageSrc != "object"){
                return
            }
            try{
              const base64 = Buffer.from(await imageSrc.data.data).toString('base64');
              setImage({uri:`data:image/jpeg;base64,${base64}`});
            }catch(err){
              setImage(Local1);
            }
          }
        getImage();
    },[])

  return (
    <TouchableOpacity
        onPress={()=>navigation.navigate('EventDetails', { eventId: id, })}
        className="rounded-md space-y-2 px-3 py-3 mx-1"    
    >
        <View> 
            <Image
                source={image}
                className="w-45 h-40 rounded-md object-cover"
            />
        </View>
        <View className="flex-row justify-between items-baseline">
            <Text className="text-[21px] font-semibold">{title?.length > 20 ? `${title.slice(0,20)}...` : title}</Text>
            <Text className="text-[10px]">{stars}</Text>
        </View>
        <View className="flex-row justify-between">
            <View className="flex-row justify-start">
                <Image
                    source={IconGps}
                    className="w-[15px] h-[15px] object-cover"
                />
                <Text className="text-[10px]">{location?.length > 28 ? `${location.slice(0,28)}...` : location}</Text>
            </View>
            <Image
                source={IconStar}
                className="w-[12px] h-[12px] object-cover"
            />
        </View>
    </TouchableOpacity>
  )
}

export default ItemCardContainerFilter;