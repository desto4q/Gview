import { View, Text, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import RStack from './nav/RStack'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Storage } from './storage/storage'
import { ExternalStorageDirectoryPath, exists, mkdir } from '@dr.pogodin/react-native-fs'
import { BottomSheetProvider } from './components/MyBottomSheet'

export default function Main() {
  let client = new QueryClient()

  async function requestExternalStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'External Storage Permission',
          message: 'App needs access to your external storage to read files.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Read external storage permission granted');
        // You can now proceed with reading files from external storage
      } else {
        console.log('Read external storage permission denied');
        // Handle permission denial
      }
    } catch (err) {
      console.warn('Error requesting external storage permission:', err);
    }
  }
  useEffect(() => {
    requestExternalStoragePermission();
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
        <BottomSheetProvider>
          <RStack />
        </BottomSheetProvider>
      </QueryClientProvider>
    </NavigationContainer>
  )
}