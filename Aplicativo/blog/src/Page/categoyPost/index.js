import React, {useLayoutEffect, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../service/api"

import PostsItem from "../../components/PostsItem";

const style = StyleSheet.create({
    container:{
        flex: 1,
        padding: 18,
        backgroundColor: '#FFF',
    },
    warningContainer:{
        alignItems: 'center',
    },
    warning:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    backButton: {
        backgroundColor: '#162133',
        padding: 8,
        marginTop: 12,
        borderRadius: 4,
    },
    textButton:{
        color: '#FFF',
    }
})

export default function Categoria(){
    const navigation = useNavigation();
    const route = useRoute();

    const [posts, setPosts] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.title === '' ? 'Categorias' : route.params?.title
        })
    },[navigation])

    useEffect(() => {
        async function loadPost(){
            const response = await api.get(`api/categorias/${route.params?.id}?fields=name&populate=posts,posts.cover`)
            setPosts(response.data?.data?.attributes?.posts?.data)
        }
        

        loadPost();
    },[])

    function handleBack(){
        navigation.goBack();
    }

    return(
        <View style={style.container}>

            {posts.length === 0 && (
                <View style={style.warningContainer}>
                    <Text style={style.warning}>Nenhum post encontrado</Text>
                    <TouchableOpacity style={style.backButton} onPress={handleBack}>
                        <Text style={style.textButton}>Encontrar Posts</Text>
                    </TouchableOpacity>
                </View>
            )}

                <FlatList 
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}
                    data={posts}
                    keyExtractor={ (item) => String(item.id)}
                    renderItem = {({ item }) => <PostsItem data={item}/>}
                />
            
        </View>
    )
}