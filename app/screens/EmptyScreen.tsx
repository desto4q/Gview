import { View, Text, TouchableOpacity, ScrollView, Linking, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { tw } from '../exports/exports'

export default function EmptyScreen({ refresh }: { refresh: () => Promise<void> }) {
    const handlePress = () => {
        Linking.openURL('https://gview.vercel.app');
    };

    let [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    let refreshApi = async () => {

        try {
            setIsRefreshing(true)
            let resp = await refresh().then(res => {
                setIsRefreshing(false)
                return res
            })
        }
        catch (err) {
            return err
        }
    }
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshApi} />} style={tw("flex-1 gap-2  bg-neutral-800")} contentContainerStyle={tw(" items-center justify-center h-full")}>
            <Text style={tw("text-xl")}>App is Outdated</Text>
            <TouchableOpacity style={tw("p-2 bg-amber-400 rounded-md")} onPress={handlePress}>
                <Text style={tw("text-black text-xl")}>Update</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
