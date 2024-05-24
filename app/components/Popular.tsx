import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { IAnimePage, hp, tw, wp } from '../exports/exports';
import { fetchPopular } from '../utils/utils';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import PopularCard from './subcomonents/PopularCard';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Reload from './Reload';
export default function Popular() {
  const width = Dimensions.get('window').width;
  let [pid, setPid] = useState<number | string>(1);
  let {
    data: airing,
    refetch,
    isError,
    isFetching,
  } = useQuery<IAnimePage>({
    queryKey: [pid, 'Popular'],
    queryFn: () => {
      return fetchPopular({ page: pid });
    },
  });

  let navigation: any = useNavigation();
  useEffect(() => {
  }, [isError]);
  return (
    <View style={tw('rounded-b-xl   ')}>
      {/* <Carousel
        loop={false}
        width={width}
        windowSize={3}
        style={tw('rounded-b-xl')}
        height={hp(65)}
        data={airing?.results || []}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <PopularCard item={item} />
            </View>
          );
        }}></Carousel> */}
      {/* {isFetching ? <Text>isFetching</Text> : null} */}
      {!isError ? (
        <SwiperFlatList
          style={{ ...tw('rounded-b-xl'), height: hp(70), overflow: 'hidden' }}
          data={airing?.results}
          renderItem={({ item }) => {
            return (
              <View
                key={item.id}
                style={{
                  ...tw('h-full rounded-b-xl bg-emerald-400'),
                  width: wp(100),
                }}>
                <PopularCard item={item} />
              </View>
            );
          }}
        />
      ) : (
        <View style={{ ...tw(' bg-neutral-800 rounded-lg '), height: hp(70) }}>
          <Reload reload={refetch} />
        </View>
      )}
    </View>
  );
}
