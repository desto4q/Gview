import Rtabs from './Rtabs';
import InfoScreen from '../screens/InfoScreen';
import WatchScreen from '../screens/WatchScreen';
import RecentScreen from '../screens/RecentScreens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopAiringScreen from '../screens/TopAiringScreen';
import GenreScreen from '../screens/GenreScreen';
let Stack = createNativeStackNavigator();
export default function RStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, freezeOnBlur: true}}>
      <Stack.Screen name="TabScreen" component={Rtabs} />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="WatchScreen" component={WatchScreen} />
      <Stack.Screen
        name="RecentScreen"
        component={RecentScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="TopScreen"
        component={TopAiringScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="GenreScreen"
        component={GenreScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
