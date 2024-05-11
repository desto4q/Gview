import {View, Text} from 'react-native';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {fetchRecentEpisodes} from '../utils/utils';
import {IAnimePage, tw} from '../exports/exports';
import Card from './subcomonents/Card';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function RecentEpisodes() {
  let [pid, setPid] = useState();
  let {data, isFetching, refetch} = useQuery<IAnimePage>([pid], () => {
    return fetchRecentEpisodes({page: pid});
  });
  let navigation: any = useNavigation();
  return (
    <View style={tw('flex-1')}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RecentScreen');
        }}>
        <Text style={tw('text-xl')}>Recent Epsiodes</Text>
      </TouchableOpacity>
      <View style={tw('flex-1  flex-row gap-3 mt-4 flex-wrap justify-center')}>
        {data?.results.map(item => {
          return <Card key={item.id} item={item} />;
        })}
      </View>
    </View>
  );
}
