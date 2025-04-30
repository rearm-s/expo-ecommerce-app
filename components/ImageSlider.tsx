import { Dimensions, FlatList, Image, StyleSheet, View, ViewToken } from 'react-native';
import React, { useRef } from 'react';
import Pagination from "@/components/Pagination";

type Props = {
  imageList: string[];
};

const width = Dimensions.get('window').width;

const ImageSlider = ({ imageList = [] }: Props) => {
  const [paginationIndex, setPaginationIndex] = React.useState(0);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index % 3);
    }
  }

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  return (
    <View>
      <FlatList
        data={imageList}
        renderItem={({ item }) => (
          <View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: item }} style={{ width: 300, height: 200, borderRadius: 10 }} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}

      />
      <Pagination items={imageList} paginationIndex={paginationIndex} />
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({});
