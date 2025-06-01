import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../../ui/Text';
import { Button } from '@/components/appmx/ui/Button';
import { Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Theme } from '@/types/theme';

interface ConsentProps {
  onComplete: () => void;
  curp: string;
}

export const Consent: React.FC<ConsentProps> = ({ onComplete, curp }) => {
  const ui = useBaseStyles();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const canContinue = termsAccepted && privacyAccepted;

  return (
    <View style={[ui.container, styles.container]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[ui.heading, styles.title]}>
          Autorización y consentimiento
        </Text>
        
        <Text style={[ui.text, styles.description]}>
          Para completar la creación de tu credencial digital, necesitamos tu autorización para:
        </Text>

        <View style={styles.consentSection}>
          <View style={styles.consentItem}>
            <View style={styles.consentHeader}>
              <Text style={[ui.text, ui.semiBold, styles.consentTitle]}>
                Términos y condiciones
              </Text>
              <Switch
                value={termsAccepted}
                onValueChange={setTermsAccepted}
                trackColor={{ false: theme.colors.neutral, true: theme.colors.primary }}
                thumbColor={termsAccepted ? theme.colors.white : theme.colors.white}
              />
            </View>
            <Text style={[ui.textSmall, styles.consentText]}>
              Acepto los términos y condiciones para el uso de la credencial digital.
            </Text>
          </View>

          <View style={styles.consentItem}>
            <View style={styles.consentHeader}>
              <Text style={[ui.text, ui.semiBold, styles.consentTitle]}>
                Aviso de privacidad
              </Text>
              <Switch
                value={privacyAccepted}
                onValueChange={setPrivacyAccepted}
                trackColor={{ false: theme.colors.neutral, true: theme.colors.primary }}
                thumbColor={privacyAccepted ? theme.colors.white : theme.colors.white}
              />
            </View>
            <Text style={[ui.textSmall, styles.consentText]}>
              Autorizo el tratamiento de mis datos personales conforme al aviso de privacidad.
            </Text>
          </View>
        </View>

        <View style={[ui.card, styles.summaryCard]}>
          <Text style={[ui.text, ui.semiBold, styles.summaryTitle]}>
            Resumen de datos
          </Text>
          <Text style={[ui.textSmall, styles.summaryText]}>
            CURP: {curp}
          </Text>
          <Text style={[ui.textSmall, styles.summaryText]}>
            Fotografía: Capturada
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Crear credencial"
          onPress={onComplete}
          disabled={!canContinue}
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
    paddingTop: theme.spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  description: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  consentSection: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  consentItem: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutral,
  },
  consentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  consentTitle: {
    flex: 1,
  },
  consentText: {
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: theme.colors.neutralLight,
    marginBottom: theme.spacing.lg,
  },
  summaryTitle: {
    marginBottom: theme.spacing.sm,
  },
  summaryText: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xl,
  },
});