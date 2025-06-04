import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Theme } from '@/types/theme';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '@/components/ui/Text';
import { CredentialCard } from '@/components/appmx/Credential/CredentialCard/CredentialCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Chip } from '../../ui/Chip';

interface CredentialReadyProps {
  photoUri: string;
  onDownload?: () => void;
  onReverse?: () => void;
  onShare?: () => void;
  onValidate?: () => void;
}

export const CredentialReady: React.FC<CredentialReadyProps> = ({
  photoUri,
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
                <Chip 
                    label="Descargar"                    
                    size="lg"
                    onPress={onDownload}
                >
                    <MaterialCommunityIcons name="download" size={16} color={theme.colors.primary} />
                </Chip>

                <Chip 
                    label="Reverso"                    
                    size="lg"
                    onPress={onReverse}
                >
                    <MaterialCommunityIcons name="rotate-3d-variant" size={16} color={theme.colors.primary} />
                </Chip>

                <Chip 
                    label="Compartir"                    
                    size="lg"
                    onPress={onShare}
                >
                    <MaterialCommunityIcons name="share-variant" size={16} color={theme.colors.primary} />
                </Chip>
            </View>


            {/* Bottom Action Cards */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.bottomActionCard}>
                

                  <View style={{
                    width: 20,
                    height: 20
                  }}>
                    <Image
                      style={{flex: 1}}
                      source={require('@assets/images/onboarding/cabi-logo.png')}
                      resizeMode="contain"                
                    />
                  </View>
                  
                
          
                  {/* Title */}
                  <Text style={[ui.text, ui.semiBold, {color: theme.colors.primary}]}>
                    079
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.bottomActionCard}
                onPress={onValidate}
                >
                <MaterialCommunityIcons name="qrcode-scan" size={24} color={theme.colors.primary} />
                <View style={styles.bottomActionTextContainer}>
                    <Text style={[ui.text, {color: theme.colors.primary}, ui.semiBold, styles.bottomActionTitle]}>Validar</Text>
                    <Text style={[ui.text, {color: theme.colors.primary}, styles.bottomActionSubtitle]}>credencial</Text>
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
    maxHeight: '70%',
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
    transform: [{ scale: 0.6 }, { translateY: -200 }],
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
    backgroundColor: theme.colors.primary,
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    
  },
  bottomActionCard: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    color: theme.colors.primary,
    justifyContent: 'center'
  },
  bottomActionNumber: {
    fontSize: 24,
    color: theme.colors.primary,
  },
  bottomActionTextContainer: {
    flex: 1,
  },
  bottomActionTitle: {
    fontSize: 16,
  },
  bottomActionSubtitle: {
    fontSize: 14,
  },
});