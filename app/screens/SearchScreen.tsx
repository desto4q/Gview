import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {IAnimePage, colors, tw} from '../exports/exports';
import {queryAnime} from '../utils/utils';
import Card from '../components/subcomonents/Card';
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineArrowLeft,
  AiOutlineSearch,
} from 'rn-icons/ai';
import SearchCard from '../components/subcomonents/SearchCard';
import Loading from '../components/Loading';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import Pager from '../components/subcomonents/Pager';
import {useNavigation} from '@react-navigation/native';

export default function SearchScreen() {
  let [searchQuery, setSearchQuery] = useState<string>('naruto');
  let [searchTerm, setSearchTerm] = useState<string>('');
  let [pid, setPid] = useState<number>(1);
  let {data: AnimeList, isFetching} = useQuery<IAnimePage>(
    [pid, searchTerm],
    () => {
      return queryAnime({
        pid: pid,
        query: searchTerm.length > 1 ? searchTerm : 'naruto',
      });
    },
  );
  let navigate = useNavigation();

  return (
    <View style={tw('flex-1 gap-4 ')}>
      <View style={tw('h-12 items-center flex-row px-2')}>
        {/* <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}
          style={tw(' items-center h-full justify-center px-2')}>
          <AiOutlineArrowLeft size={24} fill={colors.amber[400]} />
        </TouchableOpacity> */}
        <Text>Search Anime</Text>
        <Pager pid={pid} setPid={setPid} />
      </View>
      <View style={tw('h-14justify-center')}>
        <View style={tw('pl-2 bg bg-neutral-800 items-center flex-row')}>
          <TextInput
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="searchhere..."
            style={tw('w-90%')}
            onSubmitEditing={e => {
              setSearchTerm(searchQuery);
            }}></TextInput>
          <TouchableOpacity
            style={tw(
              'ml-auto bg-neutral-900  h-14 px-3 items-center justify-center',
            )}
            onPress={() => {
              setSearchTerm(searchQuery);
            }}>
            <AiOutlineSearch size={24} fill={colors.amber[400]} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw('p-2')}>
        <Text style={tw('text-xl')}>
          Search: {searchTerm ? searchTerm : 'Naruto'}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={tw('flex-row gap-2 flex-wrap justify-center')}>
        {isFetching ? (
          <Loading />
        ) : (
          AnimeList?.results.map(item => {
            return <SearchCard key={item.id} item={item} />;
          })
        )}
        <View style={tw('h-16  w-full')}></View>
      </ScrollView>
    </View>
  );
}
