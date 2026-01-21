import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { COLORS, FONTS, SIZES, DATA } from '../constants/theme';

const { width } = Dimensions.get('window');

const SkillTag = ({ skill, index, categoryIndex, isVisible }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);
  const translateX = useSharedValue(-10);

  useEffect(() => {
    if (isVisible) {
      const delay = categoryIndex * 80 + index * 25;
      opacity.value = withDelay(delay, withTiming(1, { duration: 200 }));
      scale.value = withDelay(delay, withSpring(1, { damping: 18, stiffness: 250 }));
      translateX.value = withDelay(delay, withSpring(0, { damping: 20, stiffness: 250 }));
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.skillTag, animatedStyle]}>
      <Text style={styles.skillText}>{skill}</Text>
    </Animated.View>
  );
};

const SkillCategory = ({ categoryKey, category, index, isVisible }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(25);
  const scale = useSharedValue(0.95);

  const emojiMap = {
    android: '🤖',
    flutter: '📱',
    tools: '🛠️',
    other: '⚡',
  };

  const colorMap = {
    android: '#3DDC84',
    flutter: '#02569B',
    tools: '#F59E0B',
    other: '#8B5CF6',
  };

  useEffect(() => {
    if (isVisible) {
      const delay = index * 100;
      opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
      translateY.value = withDelay(delay, withSpring(0, { damping: 20, stiffness: 200 }));
      scale.value = withDelay(delay, withSpring(1, { damping: 18, stiffness: 200 }));
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.categoryCard, animatedStyle]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colorMap[categoryKey] + '20' }]}>
          <Text style={styles.iconEmoji}>{emojiMap[categoryKey]}</Text>
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      <View style={styles.skillsContainer}>
        {category.items.map((skill, skillIndex) => (
          <SkillTag
            key={skill}
            skill={skill}
            index={skillIndex}
            categoryIndex={index}
            isVisible={isVisible}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const SkillsSection = ({ isVisible }) => {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);

  useEffect(() => {
    if (isVisible) {
      titleOpacity.value = withTiming(1, { duration: 300 });
      titleTranslateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    }
  }, [isVisible]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const categories = Object.entries(DATA.skills);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, titleStyle]}>
        <Text style={styles.sectionLabel}>Technical Skills</Text>
        <Text style={styles.sectionTitle}>My Tech Stack</Text>
        <Text style={styles.sectionDescription}>
          Technologies and tools I use to build robust mobile applications
        </Text>
      </Animated.View>

      <View style={styles.categoriesContainer}>
        {categories.map(([key, category], index) => (
          <SkillCategory
            key={key}
            categoryKey={key}
            category={category}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.padding * 4,
    paddingHorizontal: SIZES.padding * 1.5,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionLabel: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONTS.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: width > 600 ? 36 : 28,
    fontWeight: FONTS.bold,
    color: COLORS.text,
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 500,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  categoryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: width > 900 ? '48%' : '100%',
    maxWidth: 500,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: SIZES.lg,
    fontWeight: FONTS.semiBold,
    color: COLORS.text,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skillText: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONTS.medium,
  },
});

export default SkillsSection;
