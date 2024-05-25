import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { colors, tw } from '../exports/exports';

import RecentEpisodes from '../components/RecentEpisodes';
import { AiOutlineSearch } from 'rn-icons/ai';
import LinearGradient from 'react-native-linear-gradient';
import Popular from '../components/Popular';
import TopAiring from '../components/TopAiring';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MyBottomSheet from '../components/MyBottomSheet';

export default function HomeScreen() {

    const queryClient = useQueryClient();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    let navigation = useNavigation<any>();
    let masReftech = useCallback(async () => {
        setIsFetching(true);
        await queryClient
            .refetchQueries()
            .then(resp => {
                console.log(resp);
                setIsFetching(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [queryClient])
    return (
        <>
            <View style={tw('flex-1')}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={isFetching} onRefresh={masReftech} />
                    }>
                    <LinearGradient
                        colors={[colors.neutral[900], 'transparent']}
                        style={tw(
                            'h-12 items-center px-2 flex-1  absolute w-full flex-row z-10',
                        )}>
                        {/* <Text style={tw('text-lg  ')}>Home</Text> */}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SearchScreen');
                            }}
                            style={tw('ml-auto h-full items-center px-2')}>
                            <AiOutlineSearch
                                fill={colors.neutral[200]}
                                size={24}
                                style={tw('m-auto')}
                            />
                        </TouchableOpacity>
                    </LinearGradient>

                    <Popular />
                    <TopAiring />
                    <RecentEpisodes />
                    <View style={tw('h-14')}></View>
                </ScrollView>

            </View>
        </>

    );
}