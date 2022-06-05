import React from 'react';
import { StatusBar } from 'react-native';
import Home from './src/Page/Home/Home';
import Root from './src/routes/routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#232630" barStyle='light-content' />
      <Root />
    </NavigationContainer>  
  );
}