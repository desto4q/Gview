import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IAnimeEntry, IAnimePage, tw} from '../exports/exports';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {fetchGenre} from '../utils/utils';
import Pager from '../components/subcomonents/Pager';
import {ScrollView} from 'react-native-gesture-handler';
import Reload from '../components/Reload';
import Loading from '../components/Loading';
import Card from '../components/subcomonents/Card';

const GenreScreen = ({route}: {route: any}) => {
  const {title, id} = route.params;
  let [pid, Setpid] = useState<number>(1);
  let navigation = useNavigation();
  //   useEffect(() => {
  //     console.log(id, title);
  //   }, []);
  let {data, isFetching, refetch, isError} = useQuery<IAnimePage>({
    queryKey: [pid, title],
    queryFn: () => {
      return fetchGenre({page: pid});
    },
  });
  return (
    <View>
      <View style={tw('h-10 flex-row items-center ')}>
        <Text style={tw('text-xl')}>{title}</Text>
        <Pager pid={pid} setPid={Setpid} />
      </View>

      <ScrollView>
        {!isError ? (
          isFetching ? (
            <Loading />
          ) : (
            data?.results.map(item => {
              return <Card key={item.id} item={item} />;
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
