import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { theme } from '../../constants';
import { Row } from '../../utilities/components/common';
import { selectShareReceipt } from '../../slices/globalSlice';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const MAX_TRANSLATE_Y = -270;

const ShareDrawer = React.forwardRef(({children}, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const {isOpen} = useSelector(selectShareReceipt)

  const scrollTo = useCallback((destination) => {
    'worklet';
    active.value = destination !== 0;

    if (destination === 'max') {
      translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
    } else {
      translateY.value = withSpring(destination, { damping: 50 });
    }
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      console.log('event.translationY + context.value.y', event.translationY + context.value.y);
      console.log('MAX_TRANSLATE_Y', MAX_TRANSLATE_Y);
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 30,
      transform: [{ translateY: translateY.value }],
    };
  });
  
  return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          {children}
          </Animated.View>
    </GestureDetector>
  );
})

export default ShareDrawer;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT + 30,
    borderRadius: 40,
    // zIndex: 
  },
})
