import {View, Text} from 'react-native';
import React from 'react';
import {tw} from '../../exports/exports';

export default function Pill({title}: {title: string}) {
  return (
    <View style={tw('p-2 rounded-lg bg-emerald-600 self-start')}>
      <Text style={tw('text-black text-xs')}>{title}</Text>
    </View>
  );
}
