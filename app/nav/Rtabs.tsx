import {} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {
  AiFillFolder,
  AiFillHeart,
  AiFillHome,
  AiOutlineMenuFold,
  AiOutlineSearch,
} from 'rn-icons/ai';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {colors, tw} from '../exports/exports';
import {useEffect} from 'react';
import SearchScreen from '../screens/SearchScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import SavedScreen from '../screens/SavedScreen';
import GenrelistScreen from '../screens/GenrelistScreen';
import {LiaTableSolid} from 'rn-icons/lia';
let Tab = createBottomTabNavigator();
export default function Rtabs() {
  // let navigation = useNavigation();
  // useEffect(() => {
  //   console.log(colors);
  // }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {...tw('absolute m-2  h-14 mb-1 rounded-lg')},
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AiFillHome
                fill={focused ? colors.emerald[400] : colors.neutral[400]}
                size={22}
              />
            );
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="SearchScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AiOutlineSearch
                fill={focused ? colors.emerald[400] : colors.neutral[400]}
                size={22}
              />
            );
          },
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="SavedScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AiFillHeart
                fill={focused ? colors.emerald[400] : colors.neutral[400]}
                size={22}
              />
            );
          },
        }}
        component={SavedScreen}
      />
      {/* <Tab.Screen
        name="DownloadsScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AiFillFolder
                fill={focused ? colors.emerald[400] : colors.neutral[400]}
                size={22}
              />
            );
          },
        }}
        component={DownloadsScreen}
      /> */}
      <Tab.Screen
        name="GenreListScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <LiaTableSolid
                fill={focused ? colors.emerald[400] : colors.neutral[400]}
                size={22}
              />
            );
          },
        }}
        component={GenrelistScreen}
      />
    </Tab.Navigator>
  );
}
