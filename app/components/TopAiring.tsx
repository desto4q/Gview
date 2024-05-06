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
      <View>
        <Text style={tw("text-xl py-1")}>Top Airing</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={tw('gap-2')}
        style={tw('p-2 py-4')}>
        {airing?.results.map(item => {
          return <AiringCard key={item.id} item={item}></AiringCard>;
        })}
      </ScrollView>
    </View>
  );
}
