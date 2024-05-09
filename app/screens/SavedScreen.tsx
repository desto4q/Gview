import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IAnimeEntry, JSONParser, resetFav, tw} from '../exports/exports';
import {Storage} from '../storage/storage';
import {ScrollView} from 'react-native-gesture-handler';
import Card from '../components/subcomonents/Card';
import {SavedCards} from '../components/subcomonents/SavedCard';

export default function SavedScreen() {
  let [items, setItems] = useState<IAnimeEntry[] | any[]>([]);
  let [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  let updateState = () => {
    setIsRefreshing(true);
    let resp = JSONParser(Storage.getString('favorites'));
    setItems(resp);
    setIsRefreshing(false);
  };
  useEffect(() => {
    updateState();
  }, []);
  return (
    <View style={tw('p-2 flex-1')}>
      <View style={tw('flex-row items-center justify-between mb-3')}>
        <Text style={tw('text-xl')}>SavedScreen</Text>
        <View style={tw('flex-row gap-10')}>
          {/* <TouchableOpacity
            style={tw('p-2 bg-green-600 my-4')}
            onPress={() => {
              updateState();
            }}>
            <Text style={tw('text-black')}>refresh</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={tw('p-2 ml-auto bg-red-600 my-4')}
            onPress={async () => {
              resetFav().then(resp => {
                updateState();
              });
            }}>
            <Text>reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={updateState} />
        }
        contentContainerStyle={tw('flex-row gap-4 justify-center flex-wrap')}>
        {items.map(item => {
          return (
            <SavedCards updateState={updateState} item={item} key={item.id} />
          );
        })}
      </ScrollView>
    </View>
  );
}
