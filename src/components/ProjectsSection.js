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

const ProjectCard = ({ project, index, isVisible }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (isVisible) {
      // Fast staggered grid animation
      const row = Math.floor(index / 3);
      const col = index % 3;
      const delay = row * 80 + col * 60;

      opacity.value = withDelay(delay, withTiming(1, { duration: 250 }));
      translateY.value = withDelay(delay, withSpring(0, { damping: 20, stiffness: 200 }));
      scale.value = withDelay(delay, withSpring(1, { damping: 18, stiffness: 200 }));
    }
  }, [isVisible]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.projectCard, cardStyle]}>
      <View style={[styles.cardHeader, { backgroundColor: project.color + '15' }]}>
        <View style={[styles.projectIcon, { backgroundColor: project.color + '30' }]}>
          <Text style={styles.projectEmoji}>💻</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectDescription}>{project.description}</Text>

        <View style={styles.tagsContainer}>
          {project.tags.map((tag, idx) => (
            <View key={idx} style={[styles.tag, { borderColor: project.color + '50' }]}>
              <Text style={[styles.tagText, { color: project.color }]}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const ProjectsSection = ({ isVisible }) => {
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
        <Text style={styles.sectionLabel}>Portfolio</Text>
        <Text style={styles.sectionTitle}>Featured Projects</Text>
        <Text style={styles.sectionDescription}>
          A selection of mobile applications I've built across various domains
        </Text>
      </Animated.View>

      <View style={styles.projectsGrid}>
        {DATA.projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </View>
    </View>
  );
};

const getCardWidth = () => {
  if (width > 1200) return '31%';
  if (width > 800) return '48%';
  return '100%';
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
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  projectCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    width: getCardWidth(),
    maxWidth: 400,
  },
  cardHeader: {
    padding: 24,
    alignItems: 'flex-start',
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectEmoji: {
    fontSize: 24,
  },
  cardBody: {
    padding: 20,
    paddingTop: 0,
  },
  projectTitle: {
    fontSize: SIZES.lg,
    fontWeight: FONTS.bold,
    color: COLORS.text,
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  tagText: {
    fontSize: SIZES.xs,
    fontWeight: FONTS.medium,
  },
});

export default ProjectsSection;
