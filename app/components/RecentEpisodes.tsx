import {View, Text} from 'react-native';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {fetchRecentEpisodes} from '../utils/utils';
import {IAnimePage, colors, tw} from '../exports/exports';
import Card from './subcomonents/Card';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {MdNavigation} from 'rn-icons/md';
import Loading from './Loading';
import Reload from './Reload';

export default function RecentEpisodes() {
  let [pid, setPid] = useState();
  let {data, isFetching, refetch, isError} = useQuery<IAnimePage>([pid], () => {
    return fetchRecentEpisodes({page: pid});
  });
  let navigation: any = useNavigation();
  return (
    <View style={tw('flex-1')}>
      <TouchableOpacity
        style={tw('h-14 mb-4 flex-row items-center gap-2 px-2')}
        onPress={() => {
          navigation.navigate('RecentScreen');
        }}>
        <Text style={tw('text-xl')}>Recent Epsiodes</Text>
        <MdNavigation fill={colors.amber[400]} size={20} />
      </TouchableOpacity>
      <View style={tw('flex-1  flex-row gap-3 mt-4 flex-wrap justify-center ')}>
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
