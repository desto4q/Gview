import { View, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TextInput } from 'react-native-gesture-handler';
import { IAnimePage, colors, tw } from '../exports/exports';
import { queryAnime } from '../utils/utils';
import { AiOutlineSearch } from 'rn-icons/ai';
import SearchCard from '../components/subcomonents/SearchCard';
import Loading from '../components/Loading';
import Pager from '../components/subcomonents/Pager';
import Reload from '../components/Reload';
import { BsArrowLeft } from 'rn-icons/bs';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  let [searchQuery, setSearchQuery] = useState<string>('naruto');
  let [searchTerm, setSearchTerm] = useState<string>('');
  let [pid, setPid] = useState<number>(1);
  let navigation = useNavigation();
  let {
    data: AnimeList,
    isFetching,
    isError,
    isLoading,
    refetch,
  } = useQuery<IAnimePage>({
    queryKey: [pid, searchTerm],
    queryFn: () => {
      return queryAnime({
        pid: pid,
        query: searchTerm.length > 0 ? searchTerm : 'naruto',
      });
    },
  });
  useEffect(() => {
  }, [AnimeList]);

  return (
    <View style={tw('flex-1 gap-4 px-2 ')}>
      <View style={tw('h-14 flex-row justify-between px-2')}>
        <View
          style={tw(
            ' bg-neutral-800 w-full rounded-md items-center flex-row ',
          )}>
          <TextInput
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="searchhere..."
            style={tw('w-80 px-2')}
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
        {!isError ? (
          !isFetching ? (
            <View style={tw('h-12 items-center flex-row px-2')}>
              <Pager pid={pid} setPid={setPid} />
            </View>
          ) : null
        ) : null}
        <View style={tw('h-16  w-full')}></View>
      </ScrollView>
    </View>
  );
}
