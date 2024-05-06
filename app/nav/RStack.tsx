import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Rtabs from './Rtabs';
import InfoScreen from '../screens/InfoScreen';
import WatchScreen from '../screens/WatchScreen';
let Stack = createStackNavigator();
export default function RStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, freezeOnBlur: true}}>
      <Stack.Screen name="TabScreen" component={Rtabs} />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="WatchScreen" component={WatchScreen} />
    </Stack.Navigator>
  );
}
