import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, DATA } from '../constants/theme';

const { width } = Dimensions.get('window');

const ContactItem = ({ icon, label, value, index, isVisible, onPress }) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-20);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    if (isVisible) {
      const delay = index * 80;
      opacity.value = withDelay(delay, withTiming(1, { duration: 250 }));
      translateX.value = withDelay(delay, withSpring(0, { damping: 20, stiffness: 200 }));
      scale.value = withDelay(delay, withSpring(1, { damping: 18, stiffness: 200 }));
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
  }));

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Animated.View style={[styles.contactItem, animatedStyle]}>
        <View style={styles.contactIconContainer}>
          <Ionicons name={icon} size={20} color={COLORS.primary} />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>{label}</Text>
          <Text style={styles.contactValue}>{value}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const ContactSection = ({ isVisible }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const formOpacity = useSharedValue(0);
  const formScale = useSharedValue(0.95);

  useEffect(() => {
    if (isVisible) {
      titleOpacity.value = withTiming(1, { duration: 300 });
      titleTranslateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      formOpacity.value = withDelay(150, withTiming(1, { duration: 300 }));
      formScale.value = withDelay(150, withSpring(1, { damping: 18, stiffness: 200 }));
    }
  }, [isVisible]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ scale: formScale.value }],
  }));

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${DATA.contact.email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${DATA.contact.phone}`);
  };

  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/in/aaush-shrestha-a7a4a1156/');
  };

  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      if (Platform.OS === 'web') {
        alert('Please fill in your name, email, and message.');
      } else {
        Alert.alert('Missing Information', 'Please fill in your name, email, and message.');
      }
      return;
    }

    const emailSubject = subject.trim() || 'Contact from Portfolio';
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailtoUrl = `mailto:${DATA.contact.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    Linking.openURL(mailtoUrl);
  };

  const contactItems = [
    { icon: 'mail-outline', label: 'Email', value: DATA.contact.email, onPress: handleEmailPress },
    { icon: 'call-outline', label: 'Phone', value: DATA.contact.phone, onPress: handlePhonePress },
    { icon: 'logo-linkedin', label: 'LinkedIn', value: DATA.contact.linkedin, onPress: handleLinkedInPress },
    { icon: 'location-outline', label: 'Location', value: DATA.contact.location },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, titleStyle]}>
        <Text style={styles.sectionLabel}>Get In Touch</Text>
        <Text style={styles.sectionTitle}>Let's Connect</Text>
        <Text style={styles.sectionDescription}>
          I'm always open to discussing new opportunities and interesting projects
        </Text>
      </Animated.View>

      <View style={styles.contentContainer}>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.infoTitle}>Contact Information</Text>
          {contactItems.map((item, index) => (
            <ContactItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              index={index}
              isVisible={isVisible}
              onPress={item.onPress}
            />
          ))}
        </View>

        <Animated.View style={[styles.formContainer, formStyle]}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={COLORS.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Your Email</Text>
            <TextInput
              style={styles.input}
              placeholder="john@example.com"
              placeholderTextColor={COLORS.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="Job Opportunity"
              placeholderTextColor={COLORS.textMuted}
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell me about your project or opportunity..."
              placeholderTextColor={COLORS.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSendMessage}>
            <LinearGradient
              colors={COLORS.gradient.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitGradient}
            >
              <Ionicons name="send-outline" size={18} color={COLORS.text} />
              <Text style={styles.submitText}>Send Message</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
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
  contentContainer: {
    flexDirection: width > 900 ? 'row' : 'column',
    gap: 40,
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },
  contactInfoContainer: {
    flex: width > 900 ? 1 : undefined,
  },
  infoTitle: {
    fontSize: SIZES.xl,
    fontWeight: FONTS.bold,
    color: COLORS.text,
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: SIZES.base,
    color: COLORS.text,
    fontWeight: FONTS.medium,
  },
  formContainer: {
    flex: width > 900 ? 1.5 : undefined,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: FONTS.medium,
  },
  input: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusSm,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: SIZES.base,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  submitButton: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  submitText: {
    color: COLORS.text,
    fontSize: SIZES.base,
    fontWeight: FONTS.semiBold,
  },
});

export default ContactSection;
