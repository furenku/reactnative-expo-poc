import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Onboarding1 } from './pages/Onboarding1';
import { Onboarding2 } from './pages/Onboarding2';
import { Onboarding3 } from './pages/Onboarding3';
import { OnboardingFooter } from './OnboardingFooter';


export const Onboarding: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { styles: baseStyles } = useTheme();
  const totalPages = 3;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const handleSkip = () => {
    setCurrentPage(totalPages);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 0:
        return <Onboarding1 />;
      case 1:
        return <Onboarding2 />;
      case 2:
        return <Onboarding3 />;
      
      default:
        return <Onboarding1 />;
    }
  };

  
  return (
    <View style={[baseStyles.container, styles.container]}>

      
      <View style={styles.pageContainer}>
        {renderCurrentPage()}
      </View>
      
      
      <OnboardingFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onSkip={handleSkip}
        onPrevious={currentPage > 0 ? handlePrevious : undefined}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
});