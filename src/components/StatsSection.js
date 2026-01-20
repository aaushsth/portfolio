import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, DATA } from '../constants/theme';

const { width } = Dimensions.get('window');

const StatCard = ({ stat, index, isVisible }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(0.9);

  const targetNumber = parseInt(stat.number.replace('+', ''));

  useEffect(() => {
    if (isVisible) {
      // Fast staggered entrance
      const delay = index * 100;
      opacity.value = withDelay(delay, withTiming(1, { duration: 250 }));
      translateY.value = withDelay(delay, withSpring(0, { damping: 20, stiffness: 200 }));
      scale.value = withDelay(delay, withSpring(1, { damping: 18, stiffness: 200 }));

      // Fast counter animation
      const duration = 800;
      const steps = 30;
      const increment = targetNumber / steps;
      let current = 0;

      setTimeout(() => {
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            setDisplayValue(targetNumber);
            clearInterval(timer);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }, delay);
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.statCard, animatedStyle]}>
      <LinearGradient
        colors={[COLORS.surfaceLight, COLORS.surface]}
        style={styles.cardGradient}
      >
        <Text style={styles.statNumber}>
          {displayValue}
          <Text style={styles.plus}>+</Text>
        </Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const StatsSection = ({ isVisible }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        {DATA.stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 1.5,
    backgroundColor: COLORS.background,
  },
  statsContainer: {
    flexDirection: width > 600 ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  statCard: {
    flex: width > 600 ? 1 : undefined,
    width: width > 600 ? undefined : '100%',
    maxWidth: 280,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusLg,
  },
  statNumber: {
    fontSize: 48,
    fontWeight: FONTS.extraBold,
    color: COLORS.primary,
    marginBottom: 8,
  },
  plus: {
    fontSize: 32,
    color: COLORS.primaryLight,
  },
  statLabel: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: FONTS.medium,
    textAlign: 'center',
  },
});

export default StatsSection;
