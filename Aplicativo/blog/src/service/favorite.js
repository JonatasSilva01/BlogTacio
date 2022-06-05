import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";


// Buscar categoria favoritada
export async function getFavorite(){
    const data = await AsyncStorage.getItem('@favCategoria');

    if(data !== null){
        const response = await api.get(`api/categorias/${data}?fileds=name&populate=posts,posts.cover`);
        return response.data?.data?.attributes?.posts?.data;
    }else{
        return []
    }
}

// Salvar uma categoria
export async function setFavorite(categoria){
    await AsyncStorage.setItem('@favCategoria', String(categoria))
    
    const response = getFavorite();

    return response;
}