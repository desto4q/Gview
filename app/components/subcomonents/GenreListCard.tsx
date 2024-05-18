import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {tw} from '../../exports/exports';
import {useNavigation} from '@react-navigation/native';
import GenreScreen from '../../screens/GenreScreen';

export default function GenreListCard({
  title,
  id,
}: {
  title: string;
  id: string;
}) {
  let navigation: any = useNavigation();
  return (
    <View style={tw('w-[45%] rounded-md')}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GenreScreen', {id, title});
        }}
        style={tw(
          'h-50 bg-amber-500 rounded-md w-full items-center justify-center',
        )}>
        <Text style={tw('text-xl text-black')}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
