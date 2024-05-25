import { View, Text, Image, TouchableOpacity } from 'react-native';
import { IAnimeEntry, addToFav, eventEmitter, tw } from '../../exports/exports';
import { useNavigation } from '@react-navigation/native';

import { AiFillHeart } from 'rn-icons/ai';
import Loading from '../Loading';
import SheetInfo from '../SheetInfo';
import { useBottomSheet } from '../MyBottomSheet';

export interface IGenreCard {
  id: string;
  title: string;
  image: string;
  released: string;
  url: string;
}
export default function GenreCard({ item }: { item: IGenreCard }) {
  let navigation: any = useNavigation();
  const { openSheet, closeSheet } = useBottomSheet();
  return (
    <View style={tw('w-1/2  max-w-38  rounded-lg')}>
      <TouchableOpacity
        style={tw('gap-2')}
        delayLongPress={200}
        onLongPress={() => {
         openSheet(<SheetInfo id={item.id}/>)
        }}
        
        onPress={() => {
          navigation.navigate('InfoScreen', {
            item: item,
            id: item.id,
          });
        }}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={tw('w-full h-60 rounded-lg')}
          />
        ) : (
          <Loading />
        )}
        <Text style={tw('self-center')} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <View style={tw('flex-row items-center gap-2')}>
          {/* <Text
            style={tw( 
              'p-2 capitalize bg-emerald-600 text-xs text-black rounded-lg self-start',
            )}>
            {item.subOrDub}
          </Text> */}
          <Text>{String(item?.released).replace('Released: ', '')}</Text>
          <TouchableOpacity
            onPress={() => {
              addToFav(item);
            }}
            style={tw(' bg-amber-400 p-2 ml-auto rounded-md self-end')}>
            <AiFillHeart />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
