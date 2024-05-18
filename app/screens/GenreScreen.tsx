import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IAnimeEntry, IAnimePage, colors, tw} from '../exports/exports';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {fetchGenre} from '../utils/utils';
import Pager from '../components/subcomonents/Pager';
import {ScrollView} from 'react-native-gesture-handler';
import Reload from '../components/Reload';
import Loading from '../components/Loading';
import Card from '../components/subcomonents/Card';
import GenreCard, {IGenreCard} from './GenreCard';
import {AiOutlineArrowLeft} from 'rn-icons/ai';

const GenreScreen = ({route}: {route: any}) => {
  const {title, id} = route.params;
  let [pid, Setpid] = useState<number>(1);
  let navigation = useNavigation();
  interface IGenreList {
    currentPage: string;
    hasNextPage: boolean;
    results: IGenreCard[];
  }
  let {data, isFetching, refetch, isError} = useQuery<IGenreList>({
    queryKey: [pid, title],
    queryFn: () => {
      return fetchGenre({page: pid});
    },
  });
  return (
    <View>
      <View style={tw('h-10 flex-row items-center ')}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={tw('h-full px-2  items-center justify-center')}>
          <AiOutlineArrowLeft size={24} fill={colors.amber[400]} />
        </TouchableOpacity>
        <Text style={tw('text-xl')}>{title}</Text>
        <Pager pid={pid} setPid={Setpid} />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        style={tw('mt-4')}
        contentContainerStyle={tw(
          'flex-row flex-wrap gap-3 justify-center pb-14',
        )}>
        {!isError ? (
          isFetching ? (
            <Loading />
          ) : (
            data?.results.map(item => {
              return <GenreCard key={item.id} item={item} />;
            })
          )
        ) : (
          <Reload reload={refetch} />
        )}
      </ScrollView>
    </View>
  );
};

export default GenreScreen;
