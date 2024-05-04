import {View, Text, Image} from 'react-native';
import React from 'react';
import {IAnimeEntry, tw} from '../../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function Card({item}: {item: IAnimeEntry}) {
  let navigation = useNavigation<any>();

  return (
    <View style={tw('w-1/2  max-w-38  rounded-lg')}>
      <TouchableOpacity
        style={tw('gap-2')}
        onPress={() => {
          navigation.navigate('InfoScreen', {
            item: item,
            id: item.id,
          });
        }}>
        <Image
          source={{uri: item.image}}
          style={tw('w-full h-50 rounded-lg')}
        />
        <Text style={tw('h-[2rem]')} numberOfLines={2}>
          {item.title}
        </Text>
        <Text
          style={tw(
            'p-2 bg-emerald-600 text-xs text-black rounded-lg self-start',
          )}>
          EP: {item.episodeNumber}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
