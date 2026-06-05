import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const roles = [
  'Android Developer',
  'Flutter Developer',
  'Kotlin Multiplatform Developer',
];

export default function TypingRole() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.substring(0, text.length + 1));

          if (text === currentRole) {
            setTimeout(() => {
              setIsDeleting(true);
            }, 1500);
          }
        } else {
          setText(currentRole.substring(0, text.length - 1));

          if (text === '') {
            setIsDeleting(false);
            setRoleIndex(prev => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
      }}
    >
      {text}
      <Text>|</Text>
    </Text>
  );
}