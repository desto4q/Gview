import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import RStack from './nav/RStack';
import {useEffect} from 'react';
import {Storage} from './storage/storage';
import {
  ExternalStorageDirectoryPath,
  exists,
  mkdir,
} from '@dr.pogodin/react-native-fs';
let client = new QueryClient();

export default function Main() {
  useEffect(() => {
    const initializeStorage = async () => {
      if (!(await exists(ExternalStorageDirectoryPath + '/Gview/'))) {
        mkdir(ExternalStorageDirectoryPath + '/Gview/');
      }

      if (!Storage.contains('downloads')) {
        Storage.set('downloads', JSON.stringify([]));
      }

      if (!Storage.contains('favorites')) {
        Storage.set('favorites', JSON.stringify([]));
      }
    };

    const cleanup = () => {
      initializeStorage();
    };

    cleanup();

    return () => {
      // Cleanup function
      // You can add cleanup logic here if needed
    };
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <QueryClientProvider client={client}>
        <RStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
