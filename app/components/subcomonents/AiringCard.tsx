import {View, Image, Text} from 'react-native';
import {IAnimeEntry, tw} from '../../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function AiringCard({item}: {item: IAnimeEntry}) {
  return (
    <View style={tw('  rounded-xl w-60')}>
      <TouchableOpacity style={tw('gap-2')} onPress={()=>{
        console.log(item)
      }}>
        <Image
          source={{uri: item.image}}
          style={{...tw('rounded-xl h-38  w-full')}}></Image>
        <Text numberOfLines={2} style={tw('h-[2rem]')}>
          {item.title}
        </Text>
        <Text
          style={tw(
            'bg-emerald-500 rounded-md p-2  self-start text-black text-xs',
          )}
          numberOfLines={2}>
          {' '}
          EP: {item.episodeNumber}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
