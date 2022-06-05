import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from '@expo/vector-icons';

import { WebView } from 'react-native-webview'

const style = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#232630',
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 8
    },
})

export default function LinkWeb({ link, title, closeModal }){
    return(
        <>
            <TouchableOpacity onPress={closeModal} style={style.button}>
                <Feather name="x" size={25} color="#FFF" />
                <Text style={style.title}>{title}</Text>
            </TouchableOpacity>
            <WebView 
                source={{ uri: link }}
            />
        </>
    )
}