import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Linking, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

// CV URL - Replace with your actual CV link (Google Drive, Dropbox, etc.)
const CV_URL = 'https://drive.google.com/file/d/1PCIiHeicVACeNiKFbgdFqXegrKlWe23t/view?usp=sharing';

const HeroSection = ({ onGetInTouch }) => {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);
  const subtitleScale = useSharedValue(0.9);
  const descOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(15);
  const badgeOpacity = useSharedValue(0);
  const badgeScale = useSharedValue(0.8);
  const pulseScale = useSharedValue(1);
  const profileOpacity = useSharedValue(0);
  const profileScale = useSharedValue(0.8);

  useEffect(() => {
    badgeOpacity.value = withTiming(1, { duration: 250 });
    badgeScale.value = withSpring(1, { damping: 15, stiffness: 200 });

    profileOpacity.value = withDelay(50, withTiming(1, { duration: 300 }));
    profileScale.value = withDelay(50, withSpring(1, { damping: 15, stiffness: 200 }));

    titleOpacity.value = withDelay(100, withTiming(1, { duration: 300 }));
    titleTranslateY.value = withDelay(100, withSpring(0, { damping: 20, stiffness: 200 }));

    subtitleOpacity.value = withDelay(200, withTiming(1, { duration: 250 }));
    subtitleScale.value = withDelay(200, withSpring(1, { damping: 18, stiffness: 200 }));

    descOpacity.value = withDelay(300, withTiming(1, { duration: 300 }));

    buttonOpacity.value = withDelay(400, withTiming(1, { duration: 250 }));
    buttonTranslateY.value = withDelay(400, withSpring(0, { damping: 20, stiffness: 200 }));

    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const handleDownloadCV = () => {
    Linking.openURL(CV_URL);
  };

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ scale: badgeScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ scale: subtitleScale.value }],
  }));

  const descStyle = useAnimatedStyle(() => ({
    opacity: descOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const profileStyle = useAnimatedStyle(() => ({
    opacity: profileOpacity.value,
    transform: [{ scale: profileScale.value }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundLight, COLORS.background]}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <Animated.View style={[styles.badge, badgeStyle]}>
          <Animated.View style={[styles.pulseDot, pulseStyle]} />
          <Text style={styles.badgeText}>Available for opportunities</Text>
        </Animated.View>

        <Animated.Text style={[styles.greeting, titleStyle]}>
          Hi, I'm <Text style={styles.nameHighlight}>Aayush Shrestha</Text>
        </Animated.Text>

        <Animated.View style={subtitleStyle}>
          <LinearGradient
            colors={COLORS.gradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.roleContainer}
          >
            <Text style={styles.role}>Software Engineer | Android Developer</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.Text style={[styles.description, descStyle]}>
          A self-taught mobile application developer with a passion for developing mobile apps since 2019. Highly passionate about new technologies and engaged in solving software engineering challenges. I believe in the power of programming to transform thoughts into reality and improve people's lives.
        </Animated.Text>

        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          <TouchableOpacity style={styles.primaryButton} onPress={onGetInTouch}>
            <LinearGradient
              colors={COLORS.gradient.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonEmoji}>✉️</Text>
              <Text style={styles.buttonText}>Get In Touch</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleDownloadCV}>
            <Text style={styles.buttonEmoji}>📄</Text>
            <Text style={styles.secondaryButtonText}>Download CV</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.decorativeElements}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>

      <Animated.View style={[styles.watermarkContainer, profileStyle]}>
        <Image
          source={require('../../assets/profile.jpg')}
          style={styles.watermarkImage}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 700,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.padding * 3,
    zIndex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  watermarkContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 0,
    overflow: 'hidden',
  },
  watermarkImage: {
    width: '70%',
    height: '100%',
    opacity: 0.08,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 8,
  },
  badgeText: {
    color: COLORS.text,
    fontSize: SIZES.sm,
    fontWeight: FONTS.medium,
  },
  greeting: {
    fontSize: width > 600 ? 48 : 36,
    fontWeight: FONTS.bold,
    color: COLORS.text,
    marginBottom: 16,
    lineHeight: width > 600 ? 58 : 44,
  },
  nameHighlight: {
    color: COLORS.primary,
  },
  roleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  role: {
    fontSize: SIZES.lg,
    fontWeight: FONTS.semiBold,
    color: COLORS.text,
  },
  description: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    lineHeight: 26,
    marginBottom: 32,
    maxWidth: 600,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  primaryButton: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: SIZES.base,
    fontWeight: FONTS.semiBold,
  },
  buttonEmoji: {
    fontSize: 18,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    gap: 8,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.base,
    fontWeight: FONTS.semiBold,
  },
  decorativeElements: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.1,
  },
  circle1: {
    width: 300,
    height: 300,
    backgroundColor: COLORS.primary,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.secondary,
    bottom: 50,
    left: -50,
  },
  circle3: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.primaryLight,
    top: '40%',
    right: '10%',
  },
});

export default HeroSection;
