import 'react-native-gesture-handler';
import Main from './app/Main';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// if (!__DEV__) { vexo("d9c9b63c-80dd-41b4-84d6-8325a62de15b") }


export default function App() {
  return (
    <GestureHandlerRootView>
      <Main />
    </GestureHandlerRootView>
  );
}
// import { View, Text } from 'react-native'

// export default function App() {
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }