import React from 'react';
import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '@components/appmx/ui/Text';

interface ProgressDot {
  isActive: boolean;
  onPress: () => void;
}

interface OnboardingFooterProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onSkip: () => void;
  onPrevious?: () => void;
  showSkip?: boolean;
}


export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  currentPage,
  totalPages,
  onNext,
  onSkip,
  onPrevious,
  showSkip = true,
}) => {
  const { theme, styles: baseStyles } = useTheme();
  const isLastPage = currentPage === totalPages - 1;


  const styles = StyleSheet.create({
    footerContainer: {
      paddingHorizontal: 24,
      paddingBottom: 32,
      alignItems: 'center',
    },
    progressContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 32,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#E0E0E0',
    },
    activeDot: {
      width: 24,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 16,
      width: '100%',
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      flexGrow: 1
    },
    primaryButton: {
      flexGrow: 3
      // backgroundColor will be set from theme
    },
    secondaryButtonText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });


  const ProgressDot: React.FC<ProgressDot> = ({ isActive, onPress }) => {
    const { theme } = useTheme();
    
    return (
      <View
        onPointerDown={onPress}
        style={[
          styles.dot,
          isActive && [styles.activeDot, { backgroundColor: theme.colors.secondary.gold }]
        ]}
      />
    );
  };


  return (
    <View style={styles.footerContainer}>
      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        {Array.from({ length: totalPages }, (_, index) => (
          <ProgressDot key={index} isActive={index === currentPage} onPress={() => {
            
            console.log("index", index)
            
            if( index < currentPage ) {
                if( onPrevious ) onPrevious()
            }
            if( index > currentPage ) {
                if( onNext ) onNext()
            }
          }} />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {showSkip && (
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={onSkip}
          >
            <Text style={[baseStyles.text, styles.secondaryButtonText]}>
              Omitir
            </Text>
          </Pressable>
        )}
        
        <Pressable
          style={[
            styles.button,
            styles.primaryButton,
            { backgroundColor: theme.colors.primary }
          ]}
          onPress={onNext}
        >
          <Text style={[baseStyles.text, styles.primaryButtonText]}>
            {isLastPage ? 'Comenzar' : 'Siguiente'}
          </Text>
        </Pressable>
      </View>
    </View>
  );


};
