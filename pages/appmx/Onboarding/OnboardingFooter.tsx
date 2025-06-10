import React from 'react';
import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Text } from '@components/appmx/ui/Text';
import { Button } from '@/components/appmx/ui/Button/Button';

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
}


export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  currentPage,
  totalPages,
  onNext,
  onSkip,
  onPrevious
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
      width: '100%'      
    }
  });


  const ProgressDot: React.FC<ProgressDot> = ({ isActive, onPress }) => {
    const { theme } = useTheme();
    
    return (
      <View
        onPointerDown={onPress}
        style={[
          styles.dot,
          isActive && [styles.activeDot, { backgroundColor: theme.colors.secondaryGold }]
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
        <Button
          title="Omitir"
          onPress={onSkip}
          variant="outline"
        />
      
        

        <Button
          title={isLastPage ? 'Comenzar' : 'Siguiente'}
          onPress={onNext}
          style={{ flex: 1 }}
        />

      </View>
    </View>
  );


};
