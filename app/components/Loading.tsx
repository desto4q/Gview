import {View, Text} from 'react-native';
import React from 'react';
import {tw} from '../exports/exports';

export default function Loading() {
  return (
    <View style={tw('flex-1 h-full items-center justify-center')}>
      <Text>Loading....</Text>
    </View>
  );
}
