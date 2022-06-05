import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Page/Home/Home";
import Detalhes from "../Page/Detalhes";
import Categoria from "../Page/categoyPost";
import Search from "../Page/Search/Index";

const { Navigator, Screen, Group } = createNativeStackNavigator();

const Root = () =>{
    return(
        <Navigator
            screenOptions={{
                headerStyle:{backgroundColor:'#232630'},
                headerTintColor:'#FFF',
            }}
        >
            <Screen options={{headerShown: false,
                headerStyle:{backgroundColor: '#FFF'},
                headerTintColor: '#000' }} name="Home" component={Home} />
            <Screen options={{title: "DETALHES"}} name="Detalhes" component={Detalhes} />
            <Screen options={{title: "CATEGORIA"}} name="Categoria" component={Categoria} />
            <Screen options={{title: "FERRAMENTAS"}} name="Search" component={Search} />
        </Navigator>
    )
}

export default Root;
