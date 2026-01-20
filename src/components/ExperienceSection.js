import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, DATA } from '../constants/theme';

const { width } = Dimensions.get('window');

const ExperienceCard = ({ experience, index, isVisible, isLast }) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-30);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    if (isVisible) {
      const delay = index * 150;
      opacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
      translateX.value = withDelay(delay, withSpring(0, { damping: 20, stiffness: 200 }));
      scale.value = withDelay(delay, withSpring(1, { damping: 18, stiffness: 200 }));
    }
  }, [isVisible]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
  }));

  return (
    <View style={styles.experienceItem}>
      <View style={styles.timeline}>
        <View style={[styles.dot, experience.isCurrent && styles.dotCurrent]}>
          {experience.isCurrent && (
            <View style={styles.dotInner} />
          )}
        </View>
        {!isLast && (
          <View style={styles.line} />
        )}
      </View>

      <Animated.View style={[styles.card, cardStyle]}>
        {experience.isCurrent && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>CURRENT</Text>
          </View>
        )}

        <Text style={styles.jobTitle}>{experience.title}</Text>

        <View style={styles.companyRow}>
          <Ionicons name="business-outline" size={16} color={COLORS.primary} />
          <Text style={styles.company}>{experience.company}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{experience.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{experience.period}</Text>
          </View>
        </View>

        <View style={styles.responsibilities}>
          {experience.responsibilities.map((item, idx) => (
            <View key={idx} style={styles.responsibilityItem}>
              <Text style={styles.bullet}>▹</Text>
              <Text style={styles.responsibilityText}>{item}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const ExperienceSection = ({ isVisible }) => {
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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, titleStyle]}>
        <Text style={styles.sectionLabel}>Career Journey</Text>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        <Text style={styles.sectionDescription}>
          My professional journey in mobile application development
        </Text>
      </Animated.View>

      <View style={styles.experienceList}>
        {DATA.experience.map((exp, index) => (
          <ExperienceCard
            key={index}
            experience={exp}
            index={index}
            isVisible={isVisible}
            isLast={index === DATA.experience.length - 1}
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
    backgroundColor: COLORS.background,
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
  experienceList: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timeline: {
    alignItems: 'center',
    marginRight: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCurrent: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '20',
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  currentBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  currentBadgeText: {
    fontSize: SIZES.xs,
    color: COLORS.primary,
    fontWeight: FONTS.bold,
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: SIZES.lg,
    fontWeight: FONTS.bold,
    color: COLORS.text,
    marginBottom: 8,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  company: {
    fontSize: SIZES.base,
    color: COLORS.primary,
    fontWeight: FONTS.semiBold,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: SIZES.sm,
    color: COLORS.textMuted,
  },
  responsibilities: {
    gap: 8,
  },
  responsibilityItem: {
    flexDirection: 'row',
    gap: 12,
  },
  bullet: {
    color: COLORS.primary,
    fontSize: SIZES.base,
  },
  responsibilityText: {
    flex: 1,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});

export default ExperienceSection;
