import {View, Text, Image} from 'react-native';
import React from 'react';
import {IAnimeEntry, addToFav, deleteFromFav, tw} from '../../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import { AiFillDelete } from 'rn-icons/ai';
export let SavedCards = ({
  item,
  updateState,
}: {
  item: IAnimeEntry;
  updateState: () => void;
}) => {
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
        <Text style={tw('h-[1rem]')} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await deleteFromFav(item).then(resp => updateState());
        }}
        style={tw('p-2 rounded-md bg-red-500  self-start  mt-4 ')}>
        <AiFillDelete />
      </TouchableOpacity>
    </View>
  );
};
