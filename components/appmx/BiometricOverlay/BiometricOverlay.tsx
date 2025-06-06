import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { StyleSheet, View, TouchableOpacity, Modal, Dimensions, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '../ui/Text';

interface BiometricOverlayProps {
  visible: boolean;
  onActivate: () => void;
  onDismiss: () => void;
}


export const BiometricOverlay: React.FC<BiometricOverlayProps> = ({
  visible,
  onActivate,
  onDismiss
}) => {
  const { theme, styles } = useTheme();
  

  const ui = StyleSheet.create({
    
    container: {
      // ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.spacing.lg,
      borderTopRightRadius: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
      paddingTop: theme.spacing.md,
    },
    handle: {
      width: theme.spacing.xxl,
      height: theme.spacing.xs,
      backgroundColor: theme.colors.neutral,
      borderRadius: theme.borderRadius.sm,
      alignSelf: 'center',
      marginBottom: theme.spacing.lg,
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing.lg,
      right: theme.spacing.lg,
      padding: theme.spacing.sm,
      zIndex: 1,
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    faceIdIcon: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      ...styles.heading,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    description: {
      ...styles.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
      lineHeight: theme.typography.lineHeight.large,
    },
    activateButton: {
      ...styles.button,
      borderRadius: theme.spacing.sm,
      paddingVertical: theme.spacing.md,
      width: '100%',
      marginBottom: theme.spacing.md,
    },
    activateButtonText: {
      ...styles.buttonText,
      fontSize: theme.typography.fontSize.large,
    },
    dismissButton: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      alignItems: 'center',
    },
    dismissButtonText: {
      ...styles.text,
      ...styles.medium,
      fontSize: theme.typography.fontSize.medium,
      color: theme.colors.primary,
    },
  });

  return (
    <>      

      {/* Modal with slide animation for sheet only */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={onDismiss}
      >        
        <View style={ui.container}>
          {/* Invisible touchable area for dismissing */}
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={onDismiss}
          />

          {/* Bottom sheet that slides up */}
          <View style={ui.sheet}>
            <View style={ui.handle} />

            <TouchableOpacity style={ui.closeButton} onPress={onDismiss}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            <View style={ui.iconContainer}>
              <View style={ui.faceIdIcon}>
                <MaterialCommunityIcons
                  name="face-recognition"
                  size={64}
                  color={theme.colors.success}
                />
              </View>
            </View>

            <Text style={ui.title}>
              Protege tu App México{'\n'}con Face ID o huella
            </Text>

            <Text style={ui.description}>
              Activa el desbloqueo biométrico en este dispositivo para entrar más rápido y de forma segura.
            </Text>

            <Button
              title="Activar Face ID"
              onPress={onActivate}
              variant="primary"
              style={ui.activateButton}
            />

            <Button
              title="Ahora no"
              onPress={onDismiss}
              variant="outline"
              style={ui.dismissButton}
            />
          </View>
        </View>
    </Modal>
    </>
  );
};
