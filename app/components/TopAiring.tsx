import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {IAnimePage, tw} from '../exports/exports';
import {fetchTop} from '../utils/utils';
import {ScrollView} from 'react-native-gesture-handler';
import AiringCard from './subcomonents/AiringCard';
import {useQuery} from 'react-query';

export default function TopAiring() {
  let [pid, setPid] = useState<number | string>(1);
  let {data: airing, refetch} = useQuery<IAnimePage>([pid], () => {
    return fetchTop({page: pid});
  });

  return (
    <View>
      <TouchableOpacity
        style={tw('bg-emerald-600 p-2 self-start')}
        onPress={() => {
          refetch();
        }}>
        <Text>TopAiring</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={tw('gap-2')}
        style={tw('p-2')}>
        {airing?.results.map(item => {
          return <AiringCard key={item.id} item={item}></AiringCard>;
        })}
      </ScrollView>
    </View>
  );
}
