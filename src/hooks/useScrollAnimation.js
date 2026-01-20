import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export const useScrollAnimation = (scrollY, threshold = 0, delay = 0) => {
  const isVisible = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      isVisible.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      isVisible.value,
      [0, 1],
      [50, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const triggerAnimation = () => {
    isVisible.value = withDelay(
      delay,
      withSpring(1, {
        damping: 15,
        stiffness: 100,
      })
    );
  };

  return { animatedStyle, triggerAnimation, isVisible };
};

export const useFadeInUp = (delay = 0) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const animate = () => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 15 }));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return { animatedStyle, animate };
};

export const useScaleIn = (delay = 0) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  const animate = () => {
    scale.value = withDelay(delay, withSpring(1, { damping: 12 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyle, animate };
};

export const useSlideInLeft = (delay = 0) => {
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  const animate = () => {
    translateX.value = withDelay(delay, withSpring(0, { damping: 15 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return { animatedStyle, animate };
};

export const useSlideInRight = (delay = 0) => {
  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);

  const animate = () => {
    translateX.value = withDelay(delay, withSpring(0, { damping: 15 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return { animatedStyle, animate };
};

export const useCountUp = (targetValue, duration = 2000, delay = 0) => {
  const count = useSharedValue(0);

  const animate = () => {
    count.value = withDelay(
      delay,
      withTiming(targetValue, { duration })
    );
  };

  return { count, animate };
};
