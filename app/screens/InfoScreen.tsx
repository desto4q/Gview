import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IAnimeEntry, IAnimeInfo, hp, tw} from '../exports/exports';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import {fetchAnimeInfo} from '../utils/utils';
import Pill from '../components/subcomonents/Pill';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import {useNavigation} from '@react-navigation/native';
// import PaginatedListView from 'react-native-paginated-listview';
export default function InfoScreen({route}: any) {
  let {item}: {item: IAnimeEntry; id: string | number} = route.params;
  let [id, setId] = useState<number | string>(String(item.id));
  let [page, setPage] = useState<number>(1);
  let navigation = useNavigation<any>();
  useEffect(() => {
    if (item.id) {
      setId(item.id);
    }
  }, [item.id]);
  let {data} = useQuery<IAnimeInfo>([id], async () => {
    if (id) {
      return await fetchAnimeInfo({id: id});
    }
  });
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.episodes.slice(startIndex, endIndex);
  return (
    <View style={tw('flex-1  ')}>
      <View style={tw('flex-1 gap-2 max-w-[90%] w-full self-center')}>
        <View
          style={tw(
            'h-12 items-center justify-center border-b border-emerald-800',
          )}>
          <Text style={tw('text-2xl  ')}>GView</Text>
        </View>
        <ScrollView
          style={tw('flex-1')}
          contentContainerStyle={tw('gap-2 px-2')}
          showsVerticalScrollIndicator={false}>
          <View style={{...tw('w-full self-center'), height: hp(60)}}>
            {data?.image && (
              <Image
                source={{uri: data?.image}}
                style={tw('w-full h-full rounded-2xl')}></Image>
            )}
          </View>
          <View style={tw('gap-2')}>
            <Text style={tw('text-2xl ')}>{data?.title} </Text>
            <View
              style={tw('flex-row gap-2 justify-start items-center flex-wrap')}>
              <Text
                style={tw(
                  'text-xs uppercase p-1 bg-amber-400 rounded-md px-2 text-black',
                )}>
                {data?.subOrDub}
              </Text>
              <Text style={tw('text-xs uppercase  rounded-md  ')}>
                Episodes: {data?.totalEpisodes}
              </Text>
              <Text style={tw('text-xs uppercase  rounded-md   ')}>
                Release Date: {data?.releaseDate}
              </Text>
              <Text style={tw('text-xs uppercase   rounded-md   ')}>
                Status: {data?.status}
              </Text>
            </View>
          </View>
          <View
            style={tw(
              'items-center mt-1 flex-row  gap-2 flex-wrap max-w-[80%]',
            )}>
            <Text>Genre:</Text>
            {data?.genres.map(item => {
              return <Pill title={item} />;
            })}
          </View>

          <Text>{data?.description}</Text>

          <View style={tw('flex-row items-center gap-2 flex-wrap')}>
            <Text style={tw('text-lg')}>Episodes:</Text>
            {paginatedData?.map(episode => (
              <View key={episode.id}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('WatchScreen', {
                      item: item,
                      episode_id: episode.id,
                      episode_num: episode.number,
                    });
                  }}
                  style={tw('bg-amber-400 p-1 px-2 rounded-md')}>
                  <Text style={tw('text-xs text-black')}>{episode.number}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {data && (
            <Pagination
              showLastPagesButtons
              btnStyle={tw(' px-2 p-1')}
              textStyle={tw('text-lg')}
              totalItems={Number(data.episodes.length)}
              pageSize={pageSize}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
}
