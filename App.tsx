import 'react-native-gesture-handler';
import Main from './app/Main';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
export default function App() {
  return (
    <GestureHandlerRootView>
      <Main />
    </GestureHandlerRootView>
  );
}
