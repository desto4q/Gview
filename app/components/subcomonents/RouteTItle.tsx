import {View, Text} from 'react-native';
import React from 'react';
import {colors, tw} from '../../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {BsArrowRightCircleFill} from 'rn-icons/bs';

export default function RouteTItle({
  string,
  path,
}: {
  string: string;
  path: string;
}) {
  let navigation = useNavigation<any>();
  return (
    <View style={tw('h-10 py-1 w-full flex-row items-center justify-between')}>
      <Text style={tw('text-xl')}>{string}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(path);
        }}
        style={tw(
          'ml-auto flex-row items-center bg-emerald-400 rounded-md h-full px-2 gap-2 justify-center',
        )}>
        <Text style={tw(' text-black')}>See More</Text>
        <BsArrowRightCircleFill size={14} fill={colors.neutral[900]} />
      </TouchableOpacity>
    </View>
  );
}
