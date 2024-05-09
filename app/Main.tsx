import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import RStack from './nav/RStack';
import {useEffect} from 'react';
import {Storage} from './storage/storage';
let client = new QueryClient();

export default function Main() {
  useEffect(() => {
    if (Storage.contains('favorites')) {
    } else {
      Storage.set('favorites', JSON.stringify([]));
    }
  }, []);
  return (
    <NavigationContainer theme={DarkTheme}>
      <QueryClientProvider client={client}>
        <RStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
