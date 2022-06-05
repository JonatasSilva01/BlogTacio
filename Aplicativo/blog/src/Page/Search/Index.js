import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Keyboard } from "react-native";
import { Feather } from '@expo/vector-icons'

import api from "../../service/api";
import PostsItem from "../../components/PostsItem/index"

const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
        padding: 18,
    },
    containerInput: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        width: '85%',
        backgroundColor: '#C4C4C4',
        height: 45,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        padding: 8,
        fontSize: 16,
    },
    searchButton: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
        height: 45,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        marginLeft: -1,
    },
    emptyText: {
        textAlign: 'center',
    },  
})

export default function Search(){
    const [input, setInput] = useState('');

    const [posts, setPosts] = useState([]);

    const [empty, setEmpty] = useState(false);

    async function handleSearchPost(){
        if(input === ''){
            alert("Digite alguma coisa")
            return;
        }

        const response = await api.get(`api/posts?filters[title][$containsi]=${input}&populate=cover`)
        
        if(response.data?.data.length === 0){
            setEmpty(true);
            setPosts([]);
            return;
        }
        
        setPosts(response.data?.data);
        setEmpty(false);
        setInput('');

        Keyboard.dismiss();
    }

    return(
        <View style={style.container}>
            
            <View style={style.containerInput}>
                <TextInput 
                    value={input}
                    onChangeText={ (text) => setInput(text)}
                    style={style.input}
                    placeholder="Digite aqui"
                />

                <TouchableOpacity style={style.searchButton} onPress={handleSearchPost}> 
                    <Feather name="search" size={24} color='#232630'/>
                </TouchableOpacity>
            </View>

            {empty && (
                <View>
                    <Text style={style.emptyText}>Ops não encontramos nenhum post...</Text>
                </View>
            )}

            <FlatList 
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={posts}
                keyExtractor={(item) => String(item.id)}
                renderItem={ ({ item }) => <PostsItem data={item}/>}
            />

        </View>
    )
}