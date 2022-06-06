import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Rota from "../../rota";

const { width: WIDTH } = Dimensions.get('window');

const style =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginRight: 8,
        borderRadius: 8,
    },

    cover:{
        borderRadius: 4,
        width: WIDTH - 60,
        height: 100,
        justifyContent: 'flex-end',
        backgroundColor: '#232630'
    },
    title: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        paddingVertical: 8,
        paddingHorizontal: 12,
        textShadowColor: '#121212',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 8,
    }
})

export default function FavoritePost({ data }){
    const navigation = useNavigation();

    function handleNavigate(){
        navigation.navigate("Detalhes", {id: data?.id})
    }

    return(
        <TouchableOpacity style={style.container} onPress={handleNavigate}>
            <ImageBackground
                source={{ uri: `${Rota}${data?.attributes?.cover?.data?.attributes?.url}` }}
                style={style.cover}
                resizeMode="cover"
                blurRadius={3}
                imageStyle={{ borderRadius: 6, opacity: 0.4 }}
            >
                <Text numberOfLines={1} style={style.title}>{data?.attributes?.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

