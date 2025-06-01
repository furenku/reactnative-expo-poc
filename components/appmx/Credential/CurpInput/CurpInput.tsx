import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../../ui/Text';
import { Button } from '@/components/appmx/ui/Button';
import { Theme } from '@/types/theme';

export const CurpInput: React.FC<{ onContinue: (curp: string) => void; onBack: () => void }> = ({ onContinue, onBack }) => {
  const { theme } = useTheme();
  const ui = useBaseStyles();
  const styles = createStyles(theme);
  const [curp, setCurp] = useState('');

  const handleContinue = () => {
    if (curp.trim().length > 0) {
      onContinue(curp.trim());
    }
  };

  const isValidCurp = curp.trim().length >= 18;

  return (
    <View style={[ui.container, styles.container]}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@assets/images/atdt-logo.png')}
            style={styles.logo}
          />
        </View>

        {/* Title */}
        <Text style={[ui.heading, styles.title]}>
          Ingresa tu CURP para iniciar tu trámite
        </Text>
        
        {/* Description */}
        <Text style={[ui.text, styles.description]}>
          La usaremos para ubicarte en los registros y empezar a crear tu credencial digital.
        </Text>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={[ui.text, ui.semiBold, styles.inputLabel]}>
            CURP
          </Text>
          <TextInput
            style={[ui.textInput, styles.input]}
            value={curp}
            onChangeText={setCurp}
            placeholder="ABCD000000ABCDEF00"
            placeholderTextColor={theme.colors.neutral}
            autoCapitalize="characters"
            maxLength={18}
          />
        </View>

        {/* Help Link */}
        <TouchableOpacity style={styles.helpLink}>
          <Text style={[ui.text, ui.semiBold, { color: theme.colors.primary }]}>
            ¿No conoces tu CURP?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Continuar"
          onPress={handleContinue}
          disabled={!isValidCurp}          
        />
      </View>
    </View>
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
    marginBottom: theme.spacing.xl * 2,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.textSecondary,
  },
});