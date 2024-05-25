import React, { ReactNode, createContext, useContext, useRef, useState, useMemo } from 'react';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { ScrollView, View, Easing } from 'react-native';
import { hp, tw } from '../exports/exports'; // Ensure these are correctly defined and imported

interface BottomSheetContextType {
    openSheet: (content: ReactNode) => void;
    closeSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
    const sheetRef = useRef<BottomSheetMethods>(null);
    const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode>(null);

    const openSheet = (content: ReactNode) => {
        setBottomSheetContent(content);
        sheetRef.current?.open();
    };

    const closeSheet = () => {
        sheetRef.current?.close();
        // setBottomSheetContent(null);
    };

    const value = useMemo(() => ({ openSheet, closeSheet }), [openSheet, closeSheet]);

    return (
        <BottomSheetContext.Provider  value={value}>
            {children}
            <BottomSheet
                dragHandleStyle={tw("bg-white")}
                height={hp(90)}
                openDuration={700}
                customEasingFunction={Easing.bezier(0.16, 1, 0.3, 1)}
                closeDuration={700}
                ref={sheetRef}
                style={tw("bg-neutral-800")}
                animationType='slide'
                modal={true}
            >
                <ScrollView contentContainerStyle={tw("")}>
                    {bottomSheetContent || <View />}
                </ScrollView>
            </BottomSheet>
        </BottomSheetContext.Provider>
    );
};

export const useBottomSheet = (): BottomSheetContextType => {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error('useBottomSheet must be used within a BottomSheetProvider');
    }
    return context;
};
