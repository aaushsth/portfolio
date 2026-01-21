import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { COLORS, SIZES } from '../constants/theme';

const Footer = ({ isVisible }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(15);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withDelay(100, withTiming(1, { duration: 300 }));
      translateY.value = withDelay(100, withSpring(0, { damping: 20, stiffness: 200 }));
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const socialLinks = [
    { icon: '🐙', url: 'https://github.com' },
    { icon: '💼', url: 'https://linkedin.com' },
    { icon: '🐦', url: 'https://twitter.com' },
  ];

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.content}>
        <View style={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialButton}
              onPress={() => Linking.openURL(link.url)}
            >
              <Text style={styles.socialEmoji}>{link.icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.copyright}>
          © 2025 Aayush Shrestha. All rights reserved.
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundLight,
    paddingVertical: 32,
    paddingHorizontal: SIZES.padding * 1.5,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  socialEmoji: {
    fontSize: 18,
  },
  copyright: {
    fontSize: SIZES.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});

export default Footer;
