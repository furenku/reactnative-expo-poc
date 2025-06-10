import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../../ui/Text';
import { Button } from '@/components/appmx/ui/Button/Button';
import { Theme } from '@/types/theme';

export const CurpInput: React.FC<{ onContinue: (curp: string) => void; onBack: () => void }> = ({ onContinue, onBack }) => {
  const { theme, styles } = useTheme();
  const ui = createStyles(theme);
  const [curp, setCurp] = useState('');
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        Animated.timing(keyboardHeight, {
          duration: 250,
          toValue: e.endCoordinates.height,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.timing(keyboardHeight, {
          duration: 250,
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, [keyboardHeight]);

  const handleContinue = () => {
    if (curp.trim().length > 0) {
      onContinue(curp.trim());
    }
  };

  const isValidCurp = curp.trim().length >= 18;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.container, ui.container]}>
        <Animated.View
          style={[
            ui.content,
            isKeyboardVisible && ui.contentKeyboardVisible
          ]}
        >
          {/* Logo - hide when keyboard is visible */}
          {!isKeyboardVisible && (
            <View style={ui.logoContainer}>
              <Image
                source={require('@assets/images/atdt-logo.png')}
                style={ui.logo}
              />
            </View>
          )}

          {/* Title */}
          <Text style={[styles.heading, ui.title, isKeyboardVisible && ui.titleCompact]}>
            Ingresa tu CURP para iniciar tu trámite
          </Text>

          {/* Description - hide when keyboard is visible */}
          {!isKeyboardVisible && (
            <Text style={[styles.text, ui.description]}>
              La usaremos para ubicarte en los registros y empezar a crear tu credencial digital.
            </Text>
          )}

          {/* Input Section */}
          <View style={ui.inputSection}>
            <Text style={[styles.text, styles.semiBold, ui.inputLabel]}>
              CURP
            </Text>
            <TextInput
              style={[styles.textInput, ui.input]}
              value={curp}
              onChangeText={setCurp}
              placeholder="ABCD000000ABCDEF00"
              placeholderTextColor={theme.colors.neutral}
              autoCapitalize="characters"
              maxLength={18}
            />
          </View>

          {/* Help Link - hide when keyboard is visible */}
          {!isKeyboardVisible && (
            <TouchableOpacity style={ui.helpLink}>
              <Text style={[styles.text, styles.semiBold, { color: theme.colors.primary }]}>
                ¿No conoces tu CURP?
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Continue Button */}
        <Animated.View
          style={[
            ui.buttonContainer,
            { marginBottom: Animated.add(keyboardHeight, 0) }
          ]}
        >
          <Button
            title="Continuar"
            onPress={handleContinue}
            disabled={!isValidCurp}
          />
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.spacing.xl * 3,
    justifyContent: 'center',
  },
  contentKeyboardVisible: {
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.lg,
  },
  logoContainer: {
    marginBottom: theme.spacing.lg,
  },
  logo: {
    width: 58,
    height: 58,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  titleCompact: {
    fontSize: theme.typography.fontSize.large,
    marginBottom: theme.spacing.md,
  },
  description: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.xl * 2,
    paddingHorizontal: theme.spacing.sm,
  },
  inputSection: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  input: {
    borderColor: theme.colors.textSecondary,
  },
  helpLink: {
    width: '100%',
    textAlign: 'left'
  },
  buttonContainer: {
    marginBottom: theme.spacing.xl,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.textSecondary,
  },
});