import {Text, View} from 'react-native';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {fetchRecentEpisodes} from '../utils/utils';
import {IAnimePage, colors, tw} from '../exports/exports';
import Card from './subcomonents/Card';
import {useNavigation} from '@react-navigation/native';
import Loading from './Loading';
import Reload from './Reload';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BsArrowRightCircleFill} from 'rn-icons/bs';

export default function RecentEpisodes() {
  let [pid, setPid] = useState();
  let {data, isFetching, refetch, isError} = useQuery<IAnimePage>([pid], () => {
    return fetchRecentEpisodes({page: pid});
  });
  let navigation: any = useNavigation();
  return (
    <View style={tw('px-2')}>
      <View style={tw('mt-2 flex-row  items-center justify-between')}>
        <Text style={tw('text-xl')}>Recent Release</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RecentScreen');
          }}
          style={tw(
            'ml-auto flex-row items-center bg-emerald-400 rounded-md h-7 px-2 gap-2 justify-center',
          )}>
          <Text style={tw(' text-black')}>See More</Text>
          <BsArrowRightCircleFill size={14} fill={colors.neutral[900]} />
        </TouchableOpacity>
      </View>
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
