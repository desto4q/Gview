import {
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    ScrollView,
} from 'react-native';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { IAnimeEntry, JSONParser, resetFav, tw } from '../exports/exports';

import { SavedCards } from '../components/subcomonents/SavedCard';
import { Storage } from '../storage/storage';

export default function SavedScreen() {
    const [items, setItems] = useState<IAnimeEntry[] | any[]>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const updateState = useCallback(() => {
        setIsRefreshing(true);
        const resp = JSONParser(Storage.getString('favorites'));
        // console.log(resp)
        setItems(resp);
        setIsRefreshing(false);
    }, []);

    useEffect(() => {
        updateState();

    }, [updateState]);

    const renderedItems = useMemo(() => {
        return items.map(item => (
            <SavedCards updateState={updateState} item={item} key={item.id} />
        ));
    }, [items, updateState]);

    return (
        <View style={tw(' flex-1')}>
            <View style={tw('flex-row items-center px-2 justify-between mb-3')}>
                <Text style={tw('text-xl')}>Favorites</Text>
                <View style={tw('flex-row gap-10')}>
                    <TouchableOpacity
                        style={tw('p-2 ml-auto bg-red-600 rounded-md my-4')}
                        onPress={async () => {
                            await resetFav();
                            updateState();
                        }}
                    >
                        <Text style={tw('')}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        enabled
                        refreshing={isRefreshing}
                        onRefresh={updateState}
                    />
                }
                contentContainerStyle={tw('flex-row gap-4 px-4 flex-wrap pb-20')}
            >
                {renderedItems}
            </ScrollView>
        </View>
    );
}