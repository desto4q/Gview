import {createDrawerNavigator} from '@react-navigation/drawer';
import {} from 'react-native';
import RStack from './RStack';

let Drawer = createDrawerNavigator();
export default function RDrawer() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false,freezeOnBlur:true}}>
      <Drawer.Screen name="StackScreen" component={RStack} />
    </Drawer.Navigator>
  );
}
