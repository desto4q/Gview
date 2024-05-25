import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimeInfo } from '../utils/utils';
import { ScrollView } from 'react-native-gesture-handler';
import { IAnimeInfo, tw } from '../exports/exports';
import Reload from './Reload';
import Loading from './Loading';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import { useNavigation } from '@react-navigation/native';
import { useBottomSheet } from './MyBottomSheet';


const SheetInfoData = ({ data }: { data?: IAnimeInfo }) => {
  const navigation = useNavigation<any>();
  let { closeSheet } = useBottomSheet()
  let Closer = async () => {
    try {
      closeSheet()
      return "close"
    }
    catch (err) { return err }
  }

  return (
    <View style={tw("h-full gap-2 bg-neutral-900 w-full rounded-md p-2 pb-20")}>
      <View style={tw("w-full")}>
        <Image source={{ uri: data?.image }} style={tw("h-100 w-4/5 self-center rounded-md")} />
      </View>
      <View style={tw("justify-center w-4/5 gap-2 self-center")}>
        <Text style={tw("text-xl text-center")}>
          {data?.title}
        </Text>
        <View style={tw("flex-row gap-2 items-center self-center")}>
          <Text>{data?.releaseDate}</Text>
          <Text>Episodes: {data?.totalEpisodes}</Text>
          <Text style={tw(data?.status === "Ongoing" ? "text-amber-400" : "text-emerald-400")}>
            {data?.status}
          </Text>
          <Text style={tw("px-2 py-1 text-black bg-emerald-400 rounded-md")}>
            {data?.subOrDub}
          </Text>
        </View>
        <View style={tw("flex-row gap-2 flex-wrap items-center self-center")}>
          {data?.genres.slice(0, 4).map((item) => (
            <Text style={tw("text-emerald-400 border border-emerald-400 p-1 px-2 rounded-md")} key={item}>
              {item}
            </Text>
          ))}
        </View>
        <Text style={tw("mt-2 bg-neutral-800 p-2 rounded-md")}>
          {data?.description}
        </Text>
        <View style={tw("flex-row flex-wrap gap-2 mt-3")}>

          <Text>Episodes:</Text>
          {data?.episodes.slice(-10).reverse().map((episode, index) => {
           

            return <TouchableOpacity onPress={async () => {
              try {

                navigation.navigate('WatchScreen', {
                  item: data,
                  episode_id: episode.id,
                  episode_num: episode.number,
                })
              }
              catch (err) {
                console.log(err)
              }
            }} style={tw("self-start px-2 py-1 bg-emerald-400 rounded-md")}>
              <Text style={tw('text-black')}> {episode.number}</Text>
            </TouchableOpacity>
          })}

        </View>
        <View>

        </View>
      </View>
    </View>
  );
};

export default function SheetInfo({ id }: { id?: string }) {
  const { data, isError, isFetching, refetch } = useQuery<IAnimeInfo>({
    queryFn: () => fetchAnimeInfo({ id: id || "naruto" }),
    queryKey: [id, "SheetInfo"],
  });

  return (
    <>
      {isError ? <Reload reload={refetch} /> : isFetching ? <Loading /> : <SheetInfoData data={data} />}
    </>
  );
}
