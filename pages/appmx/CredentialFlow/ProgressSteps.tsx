import { useTheme } from '@/context/ThemeContext';
import { Theme } from '@/types/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type FlowStep = 'start' | 'curp' | 'validation' | 'proofOfLife' | 'consent' | 'processing' | 'success' | 'credential';

interface ProgressStepsProps {  
  userName?: string;
  stepNumber: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ userName, stepNumber }) => {

  const { theme } = useTheme()

  const ui = createStyles( theme )

  const getStepStyle = (step: number) => {
    if (step <= stepNumber) {
      return ui.completed;
    }
  };

  return (
    
    <View style={[ui.progressContainer]}>
      
    {[1, 2, 3].map((step, index) => (
        <React.Fragment key={step}>
        <View style={[ui.step, getStepStyle(step)]} />
        
        </React.Fragment>
    ))}
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  
  progressContainer: {
    width: '100%',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: theme.colors.surface,
  },
  step: {
    flex: 1,
    height: 8,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.neutralLight,
  },
  completed: {
    backgroundColor: theme.colors.secondaryGold,
  }
});