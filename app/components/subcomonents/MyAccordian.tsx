import {View, Text} from 'react-native';
import React, {useState} from 'react';
import SimpleAccordion from 'react-native-simple-accordion';
import {colors, tw} from '../../exports/exports';

export default function MyAccordian({data}: {data: any}) {
  let [collapsed, SetIsCollapsed] = useState<boolean>(true);

  return (
    <SimpleAccordion
      viewContainerStyle={tw('bg-neutral-800')}
      bannerStyle={tw(
        ` p-0 h-auto px-2 py-2 bg-neutral-800  ${
          collapsed ? 'rounded-lg' : 'rounded-t-lg'
        }`,
      )}
      onStateChange={(IsCollapsed: boolean) => {
        SetIsCollapsed(IsCollapsed);
      }}
      titleStyle={tw('text-neutral-400')}
      arrowColor={colors.neutral[400]}
      viewInside={<Text>{data?.description}</Text>}
      title={'description'}
    />
  );
}
