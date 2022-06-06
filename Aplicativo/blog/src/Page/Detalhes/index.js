import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView, Share, Modal } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import api from '../../service/api';

import LinkWeb from '../../components/LinkWeb/index'
import Rota from '../../rota';

const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    cover:{
      width: '100%',
      height: 230,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 14,
      marginTop: 18,
      textAlign: 'center',
    },
    content: {
      paddingHorizontal: 12,
    },
    desc: {
      lineHeight: 20
    },
    linkButton:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    subTitle:{
      fontWeight: 'bold',
      marginTop: 14,
      fontSize: 18,
      marginBottom: 6,
    },
    linkName: {
      color: '#1e4687',
      fontSize: 16,
      marginLeft: 6,
      fontWeight: 'bold',
    },
})

export default function Detalhes() {
  const route = useRoute();
  const navigation = useNavigation();

  const [post, setPost] = useState({});
  const [links, setLinks] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [openLink, setOpenLink] = useState({});

  useEffect(()=>{
    async function getPosts(){
      const response = await api.get(`/api/posts/${route.params?.id}?populate=cover,categoria,Opcoes`);
      setPost(response.data.data);
      setLinks(response.data?.data?.attributes?.Opcoes)
    }
    getPosts();
  },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShere}>
          <Entypo name='share' size={25} color="#FFF" />
        </TouchableOpacity>
      )
    })
  }, [navigation, post])

  async function handleShere(){
    try {
      const result = await Share.share({
        message: `
          Confere esse post ${post?.attributes?.title}

          ${post?.attributes?.description}

          Eu Vi lá no blogTacioDev
        `
      })

      if(result.action === Share.sharedAction){
        if(result.activityType){
          console.log("ACTIVIY TYPE")
        } else {
          console.log("COMPARTILHADO COM SUCESSO!!")
        }
      }else if(result.action === dismissedAction){
        console.log("MODAL FECHADO")
      }
    }catch(error){
      console.log("ERROR")
    }
  }

  function handleOpenLink(link){
    setModalVisible(true);
    setOpenLink(link);
  }

  return (
    <SafeAreaView style={style.container}>
      <Image 
        style={style.cover}
        source={{ uri: `${Rota}${post?.attributes?.cover?.data?.attributes?.url}` }}
        resizeMode='cover'
      />
      <Text style={style.title}>{post?.attributes?.title}</Text>
      <ScrollView style={style.content} showsVerticalScrollIndicator={false}>       
          <Text style={style.desc}>{post?.attributes?.description}</Text>
          {links.length > 0 ? <Text style={style.subTitle}>links</Text> : null}
          {links.map( link => (
            <TouchableOpacity style={style.linkButton} key={link.id} onPress={ () => handleOpenLink(link) }>
              <Feather name='link' color="#1e4687" size={20}/>
              <Text style={style.linkName}>{link.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Modal animationType='slide' visible={modalVisible} transparent={true}>
        <LinkWeb link={openLink?.url} title={openLink?.name} closeModal={() => setModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  )
}