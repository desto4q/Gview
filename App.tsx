import 'react-native-gesture-handler';
import Main from './app/Main';
import crypto from "crypto"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { vexo } from 'vexo-analytics';
// if (!__DEV__) { vexo("d9c9b63c-80dd-41b4-84d6-8325a62de15b") }


export default function App() {
  return (
    <GestureHandlerRootView>
      <Main />
    </GestureHandlerRootView>
  );
}
