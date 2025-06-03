import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../../ui/Text';
import { Button } from '@/components/appmx/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@/types/theme';
import { useTheme } from '@/context/ThemeContext';
import { Checkbox } from '@components/appmx/ui/Checkbox/Checkbox';

interface ConsentProps {
  onAccept: () => void;
  onCancel: () => void;
}

export const Consent: React.FC<ConsentProps> = ({ onAccept, onCancel }) => {
  const ui = useBaseStyles();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <View style={[ui.container, styles.container]}>
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration */}
        
        <View style={styles.info}>
          <View style={styles.illustrationContainer}>
            <Image
              source={require('@assets/images/illustrations/illustration-identity-validation.png')}
              style={styles.illustration}
            />
          </View>

          {/* Title */}
          <Text style={[ui.heading, styles.title]}>
            Antes de continuar, necesitamos tu consentimiento
          </Text>

          {/* Description */}
          <Text style={[ui.text, styles.description]}>
            Tomaremos una selfie para validar tu identidad. La compararemos con registros oficiales (como RENAPO y servicios de salud), solo para confirmar que eres tú
          </Text>
          
        </View>

        {/* Security Section */}
        <View style={styles.securitySection}>
          <View style={[ui.row, styles.securityHeader]}>
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={[ui.bold, styles.securityTitle]}>
              Protegemos tu identidad
            </Text>
          </View>

          <Text style={[ui.text, styles.consentText]}>
            Al continuar, autorizas:
          </Text>

          {/* Consent Items */}
          <View style={styles.consentItems}>
            <View style={styles.consentItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[ui.text, styles.consentItemText]}>
                Usar tu foto (selfie) y compararla con los datos de RENAPO.
              </Text>
            </View>

            <View style={styles.consentItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[ui.text, styles.consentItemText]}>
                Consultar otros registros oficiales si RENAPO no tiene tus datos.
              </Text>
            </View>

            <View style={styles.consentItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[ui.text, styles.consentItemText]}>
                Verificar tu afiliación a servicios de salud.
              </Text>
            </View>

            <View style={styles.consentItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[ui.text, styles.consentItemText]}>
                Usar tu fotografía para integrarla a tu Credencial de Salud.
              </Text>
            </View>
          </View>
        </View>

        {/* Add padding to prevent content from being hidden behind footer */}
        <View style={{ height: 200 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={[ui.textSecondary, styles.privacyText]}>
          Tu información se usa únicamente para validar tu identidad de forma segura y generar tu{' '}
          <Text style={[ui.bold]}>Identificación Digital</Text>.
        </Text>
        
        <View style={[ui.row, styles.checkboxContainer]}>
          <Checkbox
            value={acceptedTerms}
            onValueChange={setAcceptedTerms}
          />
          <Text style={[ui.text, styles.checkboxText]}>
            Acepto los <Text style={styles.linkText}>Términos y condiciones</Text>
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Aceptar y continuar"
            onPress={onAccept}
            disabled={!acceptedTerms}
            style={styles.acceptButton}
          />
          
          <Button
            title="Cancelar"
            onPress={onCancel}
            variant="outline"
            style={styles.cancelButton}
          />
        </View>
      </View>
      
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.sm,
  },

  footer: {
    padding: theme.spacing.md,
    flexDirection: 'column',
    gap: theme.spacing.md,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
  },
  info: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  illustration: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 28,
  },
  description: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  securitySection: {
    marginBottom: theme.spacing.xl,
  },
  securityHeader: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  securityTitle: {
    color: theme.colors.text,
    fontSize: 18,
  },
  consentText: {
    marginBottom: theme.spacing.md,
    fontWeight: '500',
  },
  consentItems: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.sm,
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  bullet: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 1,
  },
  consentItemText: {
    flex: 1,
    lineHeight: 22,
  },
  privacyText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  checkboxContainer: {
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  checkboxText: {
    flex: 1,
    lineHeight: 22,
  },
  linkText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
  acceptButton: {
    marginBottom: 0,
  },
  cancelButton: {
    marginBottom: 0,
  },
});