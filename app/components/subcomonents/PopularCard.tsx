import {View, Image, Text} from 'react-native';
import {IAnimeEntry, addToFav, colors, tw} from '../../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {AiFillHeart, AiFillPlayCircle} from 'rn-icons/ai';
export default function PopularCard({item}: {item: IAnimeEntry}) {
  let navigation = useNavigation<any>();
  return (
    <View style={tw('  rounded-b-xl  w-full relative ')}>
      <View
        style={tw(
          'absolute h-full l  w-full bg-black z-2 bg-opacity-30',
        )}></View>
      <Image
        source={{uri: item.image}}
        style={{...tw(' h-full rounded-b-xl w-full ')}}></Image>

      <LinearGradient
        colors={['transparent', colors.neutral[900]]}
        style={tw('absolute bottom-0 rounded-b-xl w-full py-4 px-2 z-3')}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={tw(' font-black text-2xl text-white ')}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={tw(' text-white mb-2')}>
          {String(item.releaseDate)}
        </Text>
        <View style={tw('flex-row  items-center gap-2')}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InfoScreen', {
                item: item,
                id: item.id,
              });
            }}
            style={tw(
              'gap-2 p-2 bg-emerald-400 rounded-md self-start flex-row items-center',
            )}>
            <Text style={tw('text-black font-semibold')}>Watch Now</Text>
            <AiFillPlayCircle size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              addToFav(item);
            }}
            style={tw(
              'gap-2 p-2 bg-amber-400 rounded-md self-start flex-row items-center',
            )}>
            {/* <Text style={tw('text-black font-semibold')}>Watch Now</Text> */}
            <AiFillHeart size={18} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
