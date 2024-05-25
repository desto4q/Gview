import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';

import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { eventEmitter, hp, tw } from '../exports/exports';

export default function MyBottomSheet({ children }: { children: any }) {
    const sheetRef = useRef<BottomSheetMethods>(null);
    const openSheet = useCallback(() => {
        sheetRef.current?.open()
    }, [])
    useEffect(() => {
      
        eventEmitter.addListener("openSheet", openSheet)
        return () => {
            eventEmitter.removeAllListeners("openSheet")
        };
    }, []);
    return (

        <BottomSheet disableBodyPanning dragHandleStyle={tw("bg-white")} height={hp(70)} ref={sheetRef} style={tw("bg-neutral-800 p-2")} animationType='slide' modal={true}>
            {children}
        </BottomSheet>

    )
}