import 'react-native-gesture-handler';
import Main from './app/Main';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { vexo } from 'vexo-analytics';
import Toast from 'react-native-toast-message';
import { updateChecker } from './app/exports/exports';
import EmptyScreen from './app/screens/EmptyScreen';
import { useEffect, useLayoutEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';

if (!__DEV__) {
  vexo("d9c9b63c-80dd-41b4-84d6-8325a62de15b");
}

export default function App() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);
  const checkForUpdate = async () => {
    try {
      const updateAvailable = await updateChecker().then((resp) => {
        console.log(resp, "app")
        setIsUpdateAvailable(resp)
      });
    }
    catch (err) {
      return err
    }
  };
  useLayoutEffect(() => {


    checkForUpdate();
  }, []);

  if (isUpdateAvailable) {
    return <EmptyScreen refresh={checkForUpdate} />;
  }

  return (
    <GestureHandlerRootView>
      <Main />
      <Toast />
    </GestureHandlerRootView>
  );
}