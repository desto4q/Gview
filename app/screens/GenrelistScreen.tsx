import {View, Text, RefreshControl} from 'react-native';
import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {tw} from '../exports/exports';
import {fetchgenreList} from '../utils/utils';
import {ScrollView} from 'react-native-gesture-handler';
import GenreListCard from '../components/subcomonents/GenreListCard';

interface IGenreList {
  id: string;
  title: string;
}
export default function GenrelistScreen() {
  let {data, refetch, isFetching} = useQuery<IGenreList[]>({
    queryKey: ['Genrelist'],
    queryFn: fetchgenreList,
  });
  //   useEffect(() => {
  //     console.log(data);
  //   }, []);
  return (
    <View style={tw('flex-1 gap-4')}>
      <View style={tw('px-2 h-10 justify-center')}>
        <Text style={tw('text-xl')}>Genres</Text>
      </View>
      <ScrollView
        contentContainerStyle={tw('flex-wrap  flex-row gap-2 justify-center')}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }>
        {data?.map(({title, id}) => {
          return <GenreListCard title={title} id={id} />;
        })}
      </ScrollView>
    </View>
  );
}
