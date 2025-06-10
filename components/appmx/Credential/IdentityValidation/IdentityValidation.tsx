import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/appmx/ui/Button/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const IdentityValidation: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const { theme, styles } = useTheme();

  return (
    <View style={[styles.container, { paddingHorizontal: theme.spacing.lg }]}>
      <View style={[styles.flex1, { alignItems: 'center', paddingTop: theme.spacing.xl * 2 }]}>
        {/* Illustration */}
        <View style={{ marginBottom: theme.spacing.xl  }}>
          <Image
            source={require('@assets/images/illustrations/illustration-identity-validation.png')}
            style={{ width: 212, height: 124 }}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={[
          styles.heading,
          { 
            textAlign: 'center', 
            marginBottom: theme.spacing.lg,            
          }
        ]}>
          Vamos a validar tu identidad
        </Text>
        
        {/* Description */}
        <Text style={[
          styles.textLarge, 
          styles.medium, 
          { 
            textAlign: 'center',
            color: theme.colors.neutralDark            
          }
        ]}>
          Antes de continuar, necesitamos confirmar tu identidad. Esto ayuda a proteger tu información.
        </Text>

        {/* Instructions List */}
        <View style={[
          styles.card,
          {
            marginTop: theme.spacing.xl,
            width: '100%',
            backgroundColor: theme.colors.neutralLighter,
            paddingVertical: theme.spacing.lg,
          }
        ]}>
          <View style={[
            styles.row,
            {
            gap: 8, 
              marginBottom: theme.spacing.lg,
              alignItems: 'flex-start',
            }
          ]}>
            <MaterialCommunityIcons name="check-circle-outline" size={21} color={theme.colors.neutralDarker} />

            <Text style={[
              styles.text, 
              { 
                color: theme.colors.neutralDark,
                flex: 1,
                // lineHeight: theme.typography.lineHeight.large,
              }
            ]}>
              Retira cualquier accesorio que cubra tu rostro
            </Text>
          </View>
          <View style={[
            styles.row,
            {
            gap: 8, 
              marginBottom: theme.spacing.lg,
              alignItems: 'flex-start',
            }
          ]}>
            <MaterialCommunityIcons name="check-circle-outline" size={21} color={theme.colors.neutralDarker} />

            <Text style={[
              styles.text, 
              { 
                color: theme.colors.neutralDark,
                flex: 1,
                // lineHeight: theme.typography.lineHeight.large,
              }
            ]}>
                Colócate en un lugar bien iluminado
            </Text>
          </View>
          
        </View>
      </View>

      <Button 
        title='Continuar'
        onPress={onContinue}
      />
    </View>
  );
};