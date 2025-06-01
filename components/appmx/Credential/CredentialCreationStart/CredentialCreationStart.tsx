import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../../ui/Text';
import { Button } from '@/components/appmx/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@/types/theme';
import { useTheme } from '@/context/ThemeContext';

interface CredentialCreationStartProps {
  onStart: () => void;
}
export const CredentialCreationStart: React.FC<CredentialCreationStartProps> = ({ onStart }) => {
  const ui = useBaseStyles();
  const {theme} = useTheme();
  const styles = createStyles(theme);
 
  return (
    <View style={[ui.container, styles.container]}>
      <View style={[ui.card, styles.card]}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}> 
          <Image
            source={require('@assets/images/illustrations/illustration-credential-flow.png')}
            style={styles.illustration}
          />          
        </View>

        {/* Title */}
        <Text style={[ui.heading, { marginBottom: theme.spacing.lg }]}>
          Crea tu identidad digital y úsala para identificarte ante instituciones públicas
        </Text>

        {/* Description */}
        <Text style={[ui.text, styles.description]}>
          Es gratis y solo te tomará unos minutos. Necesitas:
        </Text>

        {/* Requirements */}
        <View style={styles.requirements}>
          <View style={[ui.row, styles.requirementItem]}>
            <MaterialCommunityIcons 
              name="account-outline" 
              size={24} 
              color={theme.colors.textSecondary} 
            />
            <Text style={[ui.text, styles.requirementText]}>
              Ingresar tu CURP
            </Text>
          </View>
          
          <View style={[ui.row, styles.requirementItem]}>
            <MaterialCommunityIcons 
              name="camera-outline" 
              size={24} 
              color={theme.colors.textSecondary} 
            />
            <Text style={[ui.text, styles.requirementText]}>
              Tomarte una foto
            </Text>
          </View>
        </View>

        <Button title='Crear credencial' onPress={onStart}/>

      </View>
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  card: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  illustration: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  
  description: {
    textAlign: 'left',
    marginBottom: theme.spacing.lg,
  },
  requirements: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  requirementItem: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  requirementText: {
    flex: 1,
  },
});