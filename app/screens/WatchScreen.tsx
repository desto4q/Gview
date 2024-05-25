import { Text, View } from 'react-native';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EpisodeData, IAnimeInfo, eventEmitter, hp, tw } from '../exports/exports';
import { fetchAnimeInfo, fetchEpisode } from '../utils/utils';
import { useNavigation } from '@react-navigation/native';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import MyAccordian from '../components/subcomonents/MyAccordian';
import Toast from 'react-native-toast-message';
type IQuality = '360p' | '480p' | '720p';
let Aquality = ['360p', '480p', '720p'];
export default function WatchScreen({ route }: any) {
  let { item, episode_id, episode_num } = route.params;
  let [id, setId] = useState<number | string>(String(item.id));
  let navigation = useNavigation<any>();
  let [mQuality, setQuality] = useState<IQuality | any>('360p');
  let { data: AnimeInfo } = useQuery<IAnimeInfo>({
    queryKey: [id],
    queryFn: async () => {
      if (id) {
        return await fetchAnimeInfo({ id: id });
      }
    },
  });
  let { data: episode, isFetching: isEpisodeRefetching } = useQuery<EpisodeData>({
    queryKey: [episode_id],
    queryFn: async () => {
      return fetchEpisode({ id: episode_id });
    },
  });
  let [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = AnimeInfo?.episodes.slice(startIndex, endIndex);
  // console.log(episode);
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
      visibilityTime: 1000
    });
  }
  return (
    <View style={tw('flex-1 p-2')}>
      <View style={tw('h-14  justify-center')}>
        <Text style={tw('text-lg')}>{AnimeInfo?.title}</Text>
      </View>
      <TouchableOpacity style={tw("p-2 self-start bg-neutral-400 rounded-md ")} onPress={() => {
        eventEmitter.emit("openSheet")
      }}>
        <Text style={tw("text-black")}>show toast</Text>
      </TouchableOpacity>
      <View
        style={{
          ...tw('w-full bg-neutral-600 bg-opacity-20 h-1/2 '),
          height: hp(40),
        }}>
        <Video
          style={tw('w-full h-full')}
          paused
          controls
          // controlsStyles={}
          poster={AnimeInfo?.image}
          posterResizeMode="contain"
          source={{
            uri: episode?.sources.find(({ quality }) => quality === mQuality)
              ?.url,
          }}></Video>
      </View>
      <ScrollView style={tw('mt-2')} contentContainerStyle={tw('gap-4')}>
        <View style={tw(' gap-2 flex-row flex-wrap items-center')}>
          <Text style={tw('')}>Quality:</Text>
          {Aquality.map(item => {
            return (
              <TouchableOpacity
                key={item}
                style={tw(
                  `p-2 ${item == mQuality ? 'bg-amber-500' : 'bg-emerald-400'}`,
                )}
                onPress={() => {
                  setQuality(item);
                }}>
                <Text style={tw('text-xs text-black')}> {item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={tw(' gap-2')}>
          <View style={tw('flex-row items-center gap-2 flex-wrap')}>
            <Text style={tw('text-lg')}>Episodes:</Text>
            {paginatedData?.map(episode => {
              if (episode.number == 0) {
                return null;
              }
              return (
                <View key={episode.id}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('WatchScreen', {
                        item: item,
                        episode_id: episode.id,
                        episode_num: episode.number,
                      });
                    }}
                    style={tw(
                      `${episode_num == episode.number
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                      } p-1 px-2 rounded-md`,
                    )}>
                    <Text style={tw('text-xs text-black')}>
                      {episode.number}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View>
            <MyAccordian data={AnimeInfo} />
          </View>
        </View>
        {AnimeInfo && (
          <Pagination
            showLastPagesButtons
            btnStyle={tw(' p-1 px-2 rounded-md')}
            textStyle={tw('text-lg')}
            totalItems={Number(AnimeInfo.episodes.length)}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </ScrollView>
    </View>
  );
}
