import {useState} from 'react';
import {View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {IAnimePage, tw} from '../exports/exports';
import {fetchTop} from '../utils/utils';
import {ScrollView} from 'react-native-gesture-handler';
import {LiaTruckLoadingSolid} from 'rn-icons/lia';
import Card from './subcomonents/Card';
import Reload from './Reload';
import RouteTItle from './subcomonents/RouteTItle';
export default function TopAiring() {
  let [pid, setPid] = useState(1);
  let {data, isFetching, refetch, isError} = useQuery<IAnimePage>({
    queryKey: [pid, 'TopAiring'],
    queryFn: () => {
      return fetchTop({page: pid});
    },
  });

  return (
    <View style={tw('mt-2 px-2')}>
      <RouteTItle string="Top Airing " path="TopScreen" />
      <ScrollView horizontal style={tw('py-2 pl-4')}>
        <View style={tw('flex-1  flex-row gap-3   ')}>
          {!isError ? (
            isFetching ? (
              <LiaTruckLoadingSolid />
            ) : (
              data?.results.map(item => {
                return <Card key={item.id} item={item} />;
              })
            )
          ) : (
            <Reload reload={refetch} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
