import { useState, useCallback, useRef } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';
import {
  HeroSection,
  StatsSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  ContactSection,
  Footer,
} from './src/components';
import { COLORS } from './src/constants/theme';

const { height } = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function App() {
  const scrollViewRef = useRef(null);
  const contactSectionY = useRef(0);
  const scrollY = useSharedValue(0);
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    stats: false,
    skills: false,
    experience: false,
    projects: false,
    contact: false,
    footer: false,
  });

  const sectionOffsets = {
    stats: height * 0.6,
    skills: height * 1.0,
    experience: height * 1.8,
    projects: height * 2.8,
    contact: height * 4.2,
    footer: height * 5.2,
  };

  const updateVisibility = useCallback((scrollPosition) => {
    setVisibleSections((prev) => {
      const newState = { ...prev };
      let changed = false;

      Object.keys(sectionOffsets).forEach((section) => {
        const threshold = sectionOffsets[section] - height * 0.7;
        const shouldBeVisible = scrollPosition >= threshold;
        if (prev[section] !== shouldBeVisible) {
          newState[section] = shouldBeVisible;
          changed = true;
        }
      });

      return changed ? newState : prev;
    });
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      runOnJS(updateVisibility)(event.contentOffset.y);
    },
  });

  const scrollToContact = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: contactSectionY.current, animated: true });
    }
  };

  const handleContactLayout = (event) => {
    contactSectionY.current = event.nativeEvent.layout.y;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <AnimatedScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection onGetInTouch={scrollToContact} />
        <StatsSection isVisible={visibleSections.stats || visibleSections.hero} />
        <SkillsSection isVisible={visibleSections.skills} />
        <ExperienceSection isVisible={visibleSections.experience} />
        <ProjectsSection isVisible={visibleSections.projects} />
        <View onLayout={handleContactLayout}>
          <ContactSection isVisible={visibleSections.contact} />
        </View>
        <Footer isVisible={visibleSections.footer || visibleSections.contact} />
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
