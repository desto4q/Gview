import {View, Text, TouchableOpacity, RefreshControl} from 'react-native';
import {useState} from 'react';
import Pager from '../components/subcomonents/Pager';
import {fetchRecentEpisodes} from '../utils/utils';
import {useQuery} from 'react-query';
import {IAnimePage, colors, tw} from '../exports/exports';
import {AiOutlineArrowLeft} from 'rn-icons/ai';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Loading from '../components/Loading';
import Card from '../components/subcomonents/Card';
import Reload from '../components/Reload';

export default function RecentScreen() {
  let [page, setPage] = useState<number | string>(1);
  let navigation = useNavigation();
  let {data, isFetching, refetch, isError} = useQuery<IAnimePage>(
    [page],
    () => {
      return fetchRecentEpisodes({page: page});
    },
  );
  return (
    <View style={tw('flex-1')}>
      <View style={tw('h-14 mb-4 flex-row items-center gap-2 px-2')}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AiOutlineArrowLeft size={24} fill={colors.amber[200]} />
        </TouchableOpacity>
        <Text style={tw('text-xl')}>Recents</Text>
        <Pager pid={Number(page)} setPid={setPage} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        contentContainerStyle={tw(
          'flex-row justify-center  items-center gap-4 flex-wrap pb-20',
        )}
        style={tw('  flex-1')}>
        {!isError ? (
          isFetching ? (
            <Loading />
          ) : (
            data?.results.map(item => {
              return <Card key={item.id} item={item} />;
            })
          )
        ) : (
          <Reload />
        )}
      </ScrollView>
    </View>
  );
}
