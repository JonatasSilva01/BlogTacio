import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

import { useNavigation } from '@react-navigation/native';

const style = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 4,
        marginBottom: 14,
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header:{
        marginHorizontal: 8,
    },
    cover:{
        width: 120,
        height: 90,
        borderRadius: 4,
    },
    body: {
        width: '70%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    desc: {
        fontSize: 12,
        lineHeight: 16,
    },
});

export default function PostsItem({ data }){
    const navigation = useNavigation()

    function handleNavigation(){
        navigation.navigate("Detalhes", { id: data?.id })
    }

    return(
        <TouchableOpacity
            style={style.container}
            onPress={handleNavigation}
        >
            <View style={style.header}>
                <Image 
                    style={style.cover}
                    source={{ uri: `http://10.0.0.107:1337${data?.attributes?.cover?.data?.attributes?.url}` }}
                />
            </View>
            <View style={style.body}>
                <Text style={style.title} numberOfLines={1}>{data.attributes.title}</Text>
                <Text style={style.desc} numberOfLines={2}>{data.attributes.description}</Text>
            </View>
        </TouchableOpacity>
    )
}