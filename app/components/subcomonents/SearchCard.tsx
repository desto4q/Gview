import {View, Text, Image} from 'react-native';
import React from 'react';
import {IAnimeEntry, tw} from '../../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Loading';

interface ISearchEntry extends IAnimeEntry {
  subOrDub?: 'sub' | 'dub';
  releaseDate?: string;
}
export default function SearchCard({item}: {item: ISearchEntry}) {
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
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={tw('w-full h-50 rounded-lg')}
          />
        ) : (
          <Loading />
        )}
        <Text style={tw('h-[2rem]')} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={tw('flex-row items-center gap-2')}>
          <Text
            style={tw(
              'p-2 capitalize bg-emerald-600 text-xs text-black rounded-lg self-start',
            )}>
            Type: {item.subOrDub}
          </Text>
          <Text>{String(item?.releaseDate).replace('Released: ', '')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
