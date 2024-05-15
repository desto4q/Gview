import {Text, View} from 'react-native';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchRecentEpisodes} from '../utils/utils';
import {IAnimePage, tw} from '../exports/exports';
import Card from './subcomonents/Card';
import {useNavigation} from '@react-navigation/native';
import Loading from './Loading';
import Reload from './Reload';

import RouteTItle from './subcomonents/RouteTItle';

export default function RecentEpisodes() {
  let [pid, setPid] = useState(1);
  let {data, isFetching, refetch, isError} = useQuery<IAnimePage>({
    queryKey: [pid, 'RecentEpisodes'],
    queryFn: () => {
      return fetchRecentEpisodes({page: pid});
    },
  });
  let navigation: any = useNavigation();
  return (
    <View style={tw('px-2')}>
      <RouteTItle string="Recent Release " path="RecentScreen" />
      <View style={tw(' flex-row gap-3 mt-4 flex-wrap justify-center ')}>
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
      </View>
    </View>
  );
}
