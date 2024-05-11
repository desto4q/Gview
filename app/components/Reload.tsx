import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {tw} from '../exports/exports';

export default function Reload({reload}: {reload?: () => void}) {
  return (
    <View style={tw('flex-1 items-center justify-center h-full')}>
      <Text>pull down to refresh or click reload!</Text>
      <TouchableOpacity
        style={tw('p-2 bg-amber-400 rounded-md mt-4')}
        onPress={() => {
          if (reload) {
            return reload();
          } else {
            throw new Error('no reload');
          }
        }}>
        <Text style={tw('text-xl text-black')}>Reload</Text>
      </TouchableOpacity>
    </View>
  );
}
