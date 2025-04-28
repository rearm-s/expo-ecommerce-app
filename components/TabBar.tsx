import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from "@/components/TabBarButton";
import { Colors } from "@/constants/Colors";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect, useState } from "react";

export function TabBar ({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ width: 100, height: 20 });

  const buttonWidth = dimensions.width / state.routes.length;


  useEffect(() => {
    tabPositionX.value = withTiming(buttonWidth * state.index, { duration: 200, })
  }, [state.index]);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }]
    }
  })

  return (
    <View onLayout={onTabBarLayout} style={styles.tabBar}>
      <Animated.View
        style={[animatedStyle, {
          position: 'absolute',
          backgroundColor: Colors.primary,
          top: 0,
          left: 20,
          height: 2,
          width: buttonWidth / 2,
        }]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton key={route.name} onPress={onPress} onLongPress={onLongPress} isFocused={isFocused}
                        routeName={route.name}
                        label={label} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
});
