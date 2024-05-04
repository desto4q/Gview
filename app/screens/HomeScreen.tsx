import {Button, Text, TouchableOpacity, View} from 'react-native';
import {tw} from '../exports/exports';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import TopAiring from '../components/TopAiring';
import {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import RecentEpisodes from '../components/RecentEpisodes';

export default function HomeScreen() {
  return (
    <View style={tw('flex-1 p-2')}>
      <ScrollView>
        <TopAiring />
        <RecentEpisodes/>
      </ScrollView>
    </View>
  );
}
