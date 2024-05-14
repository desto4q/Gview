import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from 'react-query';
import {IAnimePage, colors, tw} from '../exports/exports';
import {fetchTop} from '../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {LiaTruckLoadingSolid} from 'rn-icons/lia';
import Card from './subcomonents/Card';
import Reload from './Reload';
import {BsArrowRightCircleFill} from 'rn-icons/bs';
export default function TopAiring() {
  let [pid, setPid] = useState();
  let {data, isFetching, refetch, isError} = useQuery<IAnimePage>([pid], () => {
    return fetchTop({page: pid});
  });
  let navigation: any = useNavigation();
  return (
    <View style={tw('mt-2 px-2')}>
      <View style={tw('py-2 flex-row items-center')}>
        <Text style={tw('text-xl')}>Top Airing</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TopScreen');
          }}
          style={tw(
            'ml-auto flex-row items-center bg-emerald-400 rounded-md h-full px-2 gap-2 justify-center',
          )}>
          <Text style={tw(' text-black')}>See More</Text>
          <BsArrowRightCircleFill size={14} fill={colors.neutral[900]} />
        </TouchableOpacity>
      </View>
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
