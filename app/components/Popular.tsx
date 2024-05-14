import {useState} from 'react';
import {View} from 'react-native';
import {IAnimePage, hp, tw} from '../exports/exports';
import {fetchPopular} from '../utils/utils';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import PopularCard from './subcomonents/PopularCard';
export default function Popular() {
  const width = Dimensions.get('window').width;
  let [pid, setPid] = useState<number | string>(2);
  let {data: airing, refetch} = useQuery<IAnimePage>([pid], () => {
    return fetchPopular({page: pid});
  });
  let navigation: any = useNavigation();
  return (
    <View style={tw('rounded-b-xl')}>
      <Carousel
        width={width}
        windowSize={width*2}
        style={tw('rounded-b-xl')}
        height={hp(65)}
        data={airing?.results || []}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <PopularCard item={item} />
            </View>
          );
        }}></Carousel>
    </View>
  );
}
