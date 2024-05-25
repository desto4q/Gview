import {useState} from 'react';
import {View, Text} from 'react-native';
import {tw} from '../exports/exports';
export default function DownloadsScreen() {
  let [prog, setProg] = useState<number | string>(0);

  return (
    <View style={tw('flex-1')}>
      {/* <Text>DownloadsScreen</Text> */}
    
      <View style={tw('self-center my-auto')}>
        <Text style={tw('text-4xl')}>wip </Text>
      </View>
    </View>
  );
}
