import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { View, Text, Easing, } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { eventEmitter, hp, tw } from '../exports/exports';
import { ScrollView } from 'react-native-gesture-handler';

export default function MyBottomSheet() {
    const sheetRef = useRef<BottomSheetMethods>(null);
    const [children, setChildren] = useState<React.ReactNode>(null);

    const openSheet = useCallback((data: any) => {
        setChildren(data.children);
        sheetRef.current?.open();
    }, []);
    const closeSheet = useCallback(async () => {
        // setChildren(data.children);
        try {
            sheetRef.current?.close()
        }
        catch (err) {
            return err
            console.log(err)
        }
    }, []);
    useEffect(() => {
        eventEmitter.addListener("openSheet", openSheet);
        eventEmitter.addListener("closeSheet", closeSheet)
        return () => {
            eventEmitter.removeAllListeners("openSheet");
            eventEmitter.removeAllListeners("closeSheet")

        };
    }, [openSheet]);

    return (
        <BottomSheet

            // disableBodyPanning
            dragHandleStyle={tw("bg-white")}
            height={hp(90)}
            openDuration={700}
            customEasingFunction={Easing.bezier(0.16, 1, 0.3, 1)}
            closeDuration={700}
            ref={sheetRef}
            style={tw("bg-neutral-800 p-2")}
            // containerHeight={100}
            
            animationType='slide'
            modal={true}
        >
            <ScrollView>
                {children}
                {/* <View style={{ ...tw("bg-red-500"), height: hp(150) }}>
                    <Text>slsa</Text>
                </View> */}
            </ScrollView>
        </BottomSheet>
    );
}
