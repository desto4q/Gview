import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {IAnimePage, colors, tw} from '../exports/exports';
import {fetchTop} from '../utils/utils';
import {ScrollView} from 'react-native-gesture-handler';
import AiringCard from './subcomonents/AiringCard';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {MdNavigation} from 'rn-icons/md';

export default function TopAiring() {
  let [pid, setPid] = useState<number | string>(1);
  let {data: airing, refetch} = useQuery<IAnimePage>([pid], () => {
    return fetchTop({page: pid});
  });
  let navigation: any = useNavigation();
  return (
    <View>
      <View>
        <TouchableOpacity
          style={tw('flex-row gap-2 items-center')}
          onPress={() => {
            navigation.navigate('TopScreen');
          }}>
          <Text style={tw('text-xl py-1')}>Top Airing</Text>
          <MdNavigation fill={colors.amber[400]} size={20} />
        </TouchableOpacity>
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
