import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Theme } from '@/types/theme';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '@/components/ui/Text';
import { CredentialCard } from '@/components/appmx/TestCameraFlow/CredentialCard/CredentialCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CredentialReadyProps {
  photoUri: string;
  userName: string;
  onDownload?: () => void;
  onReverse?: () => void;
  onShare?: () => void;
  onValidate?: () => void;
}

export const CredentialReady: React.FC<CredentialReadyProps> = ({
  photoUri,
  userName,
  onDownload,
  onReverse,
  onShare,
  onValidate,
}) => {
  const ui = useBaseStyles();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[ui.container, styles.container]}>
        <View 
        style={styles.content}
        >
            {/* Credential Card */}
            <View style={styles.cardContainer}>
                <CredentialCard 
                    photoUri={photoUri} 
                    onDone={() => {}} 
                />
            </View>

            {/* Card Indicator */}
            <View style={styles.indicatorContainer}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
            </View>
            
        </View>

    <View style={styles.footer}>
            <View style={styles.actionContainer}>
                <TouchableOpacity 
                style={styles.actionButton}
                onPress={onDownload}
                >
                <MaterialCommunityIcons name="download" size={20} color={theme.colors.primary} />
                <Text style={[ui.text, styles.actionText]}>Descargar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.actionButton}
                onPress={onReverse}
                >
                <MaterialCommunityIcons name="rotate-3d-variant" size={20} color={theme.colors.primary} />
                <Text style={[ui.text, styles.actionText]}>Reverso</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.actionButton}
                onPress={onShare}
                >
                <MaterialCommunityIcons name="share-variant" size={20} color={theme.colors.primary} />
                <Text style={[ui.text, styles.actionText]}>Compartir</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Action Cards */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.bottomActionCard}>
                <MaterialCommunityIcons name="star-four-points" size={24} color="#E91E63" />
                <Text style={[ui.text, ui.semiBold, styles.bottomActionNumber]}>079</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.bottomActionCard}
                onPress={onValidate}
                >
                <MaterialCommunityIcons name="shield-check" size={24} color={theme.colors.primary} />
                <View style={styles.bottomActionTextContainer}>
                    <Text style={[ui.text, ui.semiBold, styles.bottomActionTitle]}>Validar</Text>
                    <Text style={[ui.text, styles.bottomActionSubtitle]}>credencial</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>

    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  content: {
    alignItems: 'center',
    flexShrink: 1,
    maxHeight: '60%',
    overflow: 'hidden',
    
  },
  footer: {
    alignItems: 'center',    
  
    flexShrink: 1
  },
  cardContainer: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderRadius: theme.spacing.md,
    transform: [{ scale: 1/2 }, { translateY: -300 }],
    flexGrow: 2,    
    overflow: 'hidden',

  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  actionText: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  bottomActionCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 2,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomActionNumber: {
    fontSize: 24,
    color: theme.colors.text,
  },
  bottomActionTextContainer: {
    flex: 1,
  },
  bottomActionTitle: {
    fontSize: 16,
    color: theme.colors.text,
  },
  bottomActionSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});