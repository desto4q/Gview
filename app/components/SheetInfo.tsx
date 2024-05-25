import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchAnimeInfo } from '../utils/utils'
import { ScrollView } from 'react-native-gesture-handler'
import { IAnimeInfo, eventEmitter, tw } from '../exports/exports'
import Reload from './Reload'
import Loading from './Loading'
import Pagination from '@cherry-soft/react-native-basic-pagination'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'

let myEmitter = async () => {
    try {
        return eventEmitter.emit("closeSheet")
    }
    catch (err) { return err }
}

let SheetInfoData = ({ data }: { data?: IAnimeInfo }) => {
    let [page, setPage] = useState<number>(1);
    let navigation = useNavigation<any>()
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data?.episodes.slice(startIndex, endIndex);
    return (
        <View style={tw("h-full gap-2 bg-neutral-900 w-full rounded-md p-2 pb-10")}>
            <View style={tw("w-full")}>
                <Image source={{ uri: data?.image }} style={tw("h-100 w-4/5 self-center rounded-md")} />
            </View>
            <View style={tw("justify-center w-4/5 gap-2 self-center ")}>
                <Text style={tw("text-xl text-center ")}>
                    {data?.title}
                </Text>
                <View style={tw("flex-row gap-2 items-center self-center")}>
                    <Text>
                        {data?.releaseDate}
                    </Text>
                    <Text>
                        Episodes: {data?.totalEpisodes}
                    </Text>
                    <Text style={{ ...tw(`${data?.status == "Ongoing" ? "text-amber-400" : "text-emerald-400"}`) }}>
                        {data?.status}
                    </Text>
                    <Text style={tw("px-2 py-1 text-black bg-emerald-400 rounded-md")}>
                        {data?.subOrDub}
                    </Text>
                </View>
                <View style={tw("flex-row gap-2")}>
                    {data?.genres.map((item, index) => {
                        if (index > 3) {
                            return null
                        }
                        return <Text style={tw("text-emerald-400 border border-emerald-400 p-1 px-2 rounded-md")} key={item}>
                            {item}
                        </Text>
                    })}
                </View>
                <Text style={tw("mt-2 bg-neutral-800 p-2 rounded-md")}>
                    {data?.description}
                </Text>
                <View style={tw("flex-row flex-wrap gap-2  mt-3")}>
                    <View>
                        <Text>Episodes:</Text>
                    </View>
                    {paginatedData?.map(episode => {
                        if (episode.number == 0) {
                            return null;
                        }
                        return (
                            <View key={episode.id}>
                                <TouchableOpacity
                                    onPress={() => {

                                        navigation.navigate('WatchScreen', {
                                            item: data,
                                            episode_id: episode.id,
                                            episode_num: episode.number,
                                        });



                                    }}
                                    style={tw('bg-amber-400 p-1 px-2 rounded-md')}>
                                    <Text style={tw('text-xs text-black')}>
                                        {episode.number}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View >
                    {data && (
                        <Pagination
                            containerStyle={tw("p-1 m-0")}
                            showLastPagesButtons
                            btnStyle={tw(' p-1 mx-1 px-2 rounded-md')}
                            textStyle={tw('text-xs')}
                            totalItems={Number(data.episodes.length)}
                            pageSize={pageSize}
                            currentPage={page}
                            onPageChange={setPage}
                        />
                    )}
                </View>
            </View>
        </View>)

}
export default function SheetInfo({ id }: { id?: string }) {
    let { data, isError, isFetching, refetch } = useQuery<IAnimeInfo>({
        queryFn: () => {
            return fetchAnimeInfo({ id: id ? id : "naruto" })
        },
        queryKey: [id, "SheetInfo"]
    })

    // console.log(data)

    return (
        <View style={tw("")}>
            {isError ? <Reload reload={refetch} /> : isFetching ? <Loading /> : <SheetInfoData data={data} />}
        </View>
    )
}
