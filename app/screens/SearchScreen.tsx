import {View, TouchableOpacity, RefreshControl,ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {TextInput} from 'react-native-gesture-handler';
import {IAnimePage, colors, tw} from '../exports/exports';
import {queryAnime} from '../utils/utils';
// import Card from '../components/subcomonents/Card';
import {AiOutlineSearch} from 'rn-icons/ai';
import SearchCard from '../components/subcomonents/SearchCard';
import Loading from '../components/Loading';
// import Pagination from '@cherry-soft/react-native-basic-pagination';
import Pager from '../components/subcomonents/Pager';
import Reload from '../components/Reload';

export default function SearchScreen() {
  let [searchQuery, setSearchQuery] = useState<string>('naruto');
  let [searchTerm, setSearchTerm] = useState<string>('');
  let [pid, setPid] = useState<number>(1);
  let {
    data: AnimeList,
    isFetching,
    isError,
    refetch,
  } = useQuery<IAnimePage>([pid, searchTerm], () => {
    return queryAnime({
      pid: pid,
      query: searchTerm.length > 0 ? searchTerm : 'naruto',
    });
  });
  useEffect(() => {
    // console.log(AnimeList);
  }, [AnimeList]);

  return (
    <View style={tw('flex-1 gap-4 ')}>
      <View style={tw('h-14 justify-center px-2')}>
        <View
          style={tw('pl-2  bg-neutral-800 rounded-md items-center flex-row ')}>
          <TextInput
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="searchhere..."
            style={tw('w-90%')}
            onSubmitEditing={e => {
              setSearchTerm(searchQuery);
            }}
          />

          <TouchableOpacity
            style={tw(
              'ml-auto bg-neutral-900  rounded-r-md h-14 px-3 items-center justify-center',
            )}
            onPress={() => {
              setSearchTerm(searchQuery);
            }}>
            <AiOutlineSearch size={24} fill={colors.amber[400]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={tw('p-2')}>
        <Text style={tw('text-xl')}>
          Search: {searchTerm ? searchTerm : 'Naruto'}
        </Text>
      </View> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        contentContainerStyle={tw('flex-row gap-4 flex-wrap justify-center')}>
        {!isError ? (
          isFetching ? (
            <Loading />
          ) : (
            AnimeList?.results.map(item => {
              return <SearchCard key={item.id} item={item} />;
            })
          )
        ) : (
          <Reload reload={refetch} />
        )}
        {!isFetching ? (
          <View style={tw('h-12 items-center flex-row px-2')}>
            <Pager pid={pid} setPid={setPid} />
          </View>
        ) : null}
        <View style={tw('h-16  w-full')}></View>
      </ScrollView>
    </View>
  );
}
