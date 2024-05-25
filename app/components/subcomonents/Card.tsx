import { View, Text, Image } from 'react-native';
import React from 'react';
import { IAnimeEntry, addToFav, eventEmitter, tw } from '../../exports/exports';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AiFillHeart } from 'rn-icons/ai';
import SheetInfo from '../SheetInfo';

export default function Card({ item }: { item: IAnimeEntry }) {
  let navigation = useNavigation<any>();

  return (
    <View style={tw('w-1/2  max-w-38 mb-4  rounded-lg')}>
      <TouchableOpacity
        delayLongPress={200}
        onLongPress={() => {
          eventEmitter.emit("openSheet", { children: <SheetInfo id={item.id} /> })
        }}
        style={tw('gap-2')}
        onPress={() => {
          navigation.navigate('InfoScreen', {
            item: item,
            id: item.id,
          });
        }}>
        <Image
          source={{ uri: item.image }}
          style={tw('w-full h-50 rounded-lg')}
        />
        <Text style={tw('h-[1rem]')} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <View style={tw('flex-row  gap-2 justify-between  mt-2')}>
        <Text
          style={tw(
            'p-2 bg-emerald-600 text-xs text-black rounded-md self-start',
          )}>
          EP: {item.episodeNumber}
        </Text>
        <TouchableOpacity
          onPress={() => {
            addToFav(item);
          }}
          style={tw('p-2 self-start bg-amber-400   rounded-md ')}>
          <AiFillHeart />
        </TouchableOpacity>
      </View>
    </View>
  );
}
