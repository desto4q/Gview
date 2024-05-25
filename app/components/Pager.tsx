import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {tw} from '../exports/exports';
export default function Pager({data}: {data: any | []}) {
  let [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.episodes.slice(startIndex, endIndex);
  return (
    <View>
      {paginatedData?.map((episode: any) => (
        <View key={episode.id}>
          <TouchableOpacity style={tw('bg-amber-400 p-1 px-2 rounded-md')}>
            <Text style={tw('text-xs text-black')}>{episode.number}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
