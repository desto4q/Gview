import {Text, TouchableOpacity, View,ScrollView}from 'react-native';
import {colors, tw} from '../exports/exports';


import RecentEpisodes from '../components/RecentEpisodes';
import {AiOutlineSearch} from 'rn-icons/ai';
import LinearGradient from 'react-native-linear-gradient';
import Popular from '../components/Popular';
import TopAiring from '../components/TopAiring';

export default function HomeScreen() {
  return (
    <View style={tw('flex-1')}>
      <ScrollView>
        <LinearGradient
          colors={[colors.neutral[900], 'transparent']}
          style={tw('h-12 items-center px-2  absolute w-full flex-row z-10')}>
          <Text style={tw('text-lg  ')}>Home</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('clicke');
            }}
            style={tw('ml-auto h-full items-center px-2')}>
            <AiOutlineSearch
              fill={colors.neutral[200]}
              size={24}
              style={tw('m-auto')}
            />
          </TouchableOpacity>
        </LinearGradient>

        <Popular />
        <TopAiring />
        <RecentEpisodes />
        <View style={tw('h-14')}></View>
      </ScrollView>
    </View>
  );
}
