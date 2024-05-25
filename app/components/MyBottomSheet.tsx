import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';

import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { hp, tw } from '../exports/exports';

export default function MyBottomSheet() {
    const sheetRef = useRef<BottomSheetMethods>(null);
    useEffect(() => {
        sheetRef.current?.open()
    })
    return (

        <BottomSheet height={hp(90)} ref={sheetRef} style={tw("bg-neutral-700 p-2")} animationType='slide' modal={true}>
            <Text>
                The smart 😎, tiny 📦, and flexible 🎗 bottom sheet your app craves 🚀
            </Text>
        </BottomSheet>

    )
}