import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { useNavigation } from '@react-navigation/native';

const style = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginLeft: 8,
        marginVertical: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    icon: {
        width: 40,
        height: 40,
    },
    name: {

    }
})

export default function CategoriasItem({ data, favorite }){
    const navigation = useNavigation();

    function handleNavigate() {
        navigation.navigate("Categoria", {id: data.id, title: data?.attributes?.name})
    }

    return(
        <TouchableOpacity 
            style={style.container}
            activeOpacity={0.8}
            onPress={handleNavigate}
            onLongPress={favorite}
        >
            <Image 
                style={style.icon}
                source={{ uri: `http://10.0.0.107:1337${data?.attributes?.icon?.data?.attributes?.url}`}}
            />
            <Text style={style.name}>{data?.attributes?.name}</Text>
        </TouchableOpacity>
    )
}