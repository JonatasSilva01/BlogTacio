import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, FlatList, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import api from '../../service/api';
import CategoriasItem from "../../components/CategoriasItem";
import {getFavorite, setFavorite} from '../../service/favorite';
import FavoritePost from "../../components/FavoritePosts";
import PostsItem from "../../components/PostsItem";
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#232630',
      flex: 1,
    },
    text: {
      color: '#fff',
      fontSize: 24,
    },
    header: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 24,
    },
    name: {
        fontSize: 28,
        color: '#FFF',
        fontWeight: 'bold',
    },
    icon:{
        
    },
    categoria:{
        maxHeight: 115,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9,
    },
    main: {
        backgroundColor: '#FFF',
        flex: 1,
        marginTop: -30,
    }, 
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        paddingHorizontal: 18,
        marginBottom: 14,
        color: '#162133'
    }
});

const FlatListAnimation = Animatable.createAnimatableComponent(FlatList);

export default function Home(){

    const navigation = useNavigation();
    const [categorias, setCategorias] = useState([]);
    const [favCategoria, setFavCategorias] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(()=>{


        async function loadData(){

            await getListPosts();

            const categoria = await api.get('/api/categorias?populate=icon');
            setCategorias(categoria.data.data);
        }
        loadData();

    },[])

    useEffect(() => {
        async function favorite(){
            const response = await getFavorite()
            setFavCategorias(response);
        }
        favorite();
    },[])


    //Favoritando uma categoria
    async function handleFavorite(id){
        const response = await setFavorite(id);

        setFavCategorias(response)
    }

    async function getListPosts(){
        setLoading(true);

        const response = await api.get("api/posts?populate=cover&sort=createdAt:desc")
        setPosts(response.data.data)

        setLoading(false);
    }


    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Animatable.Text style={styles.name} animation="fadeInLeft">BlogTacioDev</Animatable.Text>
                
                <TouchableOpacity style={styles.botton} onPress={()=>navigation.navigate("Search")}>
                    <Feather name="search" size={24} color="#FFF" style={styles.icon}/>
                </TouchableOpacity>
            </View>

            <FlatListAnimation
                animation="flipInX"
                delay={500}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 12, }}
                horizontal={true}
                style={styles.categoria}
                data={categorias}
                keyExtractor={(item) => String(item.id)}
                renderItem={ ({ item }) => (
                    <CategoriasItem 
                        data={item}
                        favorite={() => handleFavorite(item.id) }
                    />
                )}
            />

            <View style={styles.main}>

                {favCategoria.length !== 0 && (
                    <FlatList 
                        style={{ marginTop: 50, maxHeight: 100, paddingStart: 18, }}
                        contentContainerStyle={{ paddingEnd: 18,  }}
                        data={favCategoria}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={ ({ item }) => <FavoritePost data={item} /> }
                    />
                )}

                <Text
                    style={[styles.title, {marginTop: favCategoria.length > 0 ? 14 : 46}]}
                    >Conteudos em Alta</Text>

                <FlatList 
                    style={{ flex: 1, paddingHorizontal: 18 }}
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    keyExtractor={ (item) => String(item.id) }
                    refreshing={loading}
                    onRefresh={ () => getListPosts() }
                    renderItem={ ({item}) => <PostsItem data={item} />}
                />
            </View>

        </SafeAreaView>
    )
}



  