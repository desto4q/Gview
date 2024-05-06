import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {AiFillMinusCircle, AiFillPlusCircle} from 'rn-icons/ai';
import {colors, tw} from '../../exports/exports';
import {useNavigation} from '@react-navigation/native';

export default function Pager({
  pid,
  setPid,
}: {
  pid: number;
  setPid: (e: number) => void;
}) {
  interface INav {
    navigate: ({string, items}: {string?: string; items?: any}) => void;
  }
  let navigation = useNavigation();
  return (
    <View
      style={tw(
        'h-10 items-center flex-row  pl-2 ml-auto gap-4 bg-neutral-800 rounded-lg',
      )}>
      <TouchableOpacity
        style={tw('h-full items-center justify-center  px-2')}
        onPress={() => {
          if (pid > 1) {
            setPid(pid + -1);
          } else {
            return null;
          }
        }}>
        <AiFillMinusCircle
          size={24}
          fill={colors.amber[400]}></AiFillMinusCircle>
      </TouchableOpacity>
      <TextInput
        style={tw('bg-neutral-600 px-2 text-center')}
        defaultValue={String(pid)}
        keyboardType="numeric"
        onTextInput={e => {
          let text = e.nativeEvent.text;
        }}
        onSubmitEditing={e => {
          let text = e.nativeEvent.text;
          let digit = Number(text);
          setPid(digit);
        }}></TextInput>
      <TouchableOpacity
        style={tw('h-full items-center justify-center  px-2')}
        onPress={() => {
          setPid((pid += 1));
        }}>
        <AiFillPlusCircle size={24} fill={colors.amber[400]}></AiFillPlusCircle>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw(
          'px-3 bg-amber-400 h-full items-center rounded-r-lg  justify-center',
        )}>
        <Text style={tw('text-black  font-bold ')}>GO</Text>
      </TouchableOpacity>
    </View>
  );
}
