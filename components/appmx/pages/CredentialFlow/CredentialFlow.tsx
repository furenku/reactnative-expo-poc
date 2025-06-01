import React, { useState } from 'react';
import { MainLayout } from '@/components/appmx/MainLayout/MainLayout';
import { CredentialCreationStart } from '@/components/appmx/Credential/CredentialCreationStart/CredentialCreationStart';
import { CurpInput } from '@/components/appmx/Credential/CurpInput/CurpInput';
import { IdentityValidation } from '@/components/appmx/Credential/IdentityValidation/IdentityValidation';
import { ProofOfLife } from '@/components/appmx/ProofOfLife/ProofOfLife';
import { Consent } from '@/components/appmx/Credential/Consent/Consent';

type FlowStep = 'start' | 'curp' | 'validation' | 'proofOfLife' | 'consent';

export const CredentialFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('start');
  const [curp, setCurp] = useState<string>('');

  const handleStartFlow = () => {
    setCurrentStep('curp');
  };

  const handleCurpSubmit = (userCurp: string) => {
    setCurp(userCurp);
    setCurrentStep('validation');
  };

  const handleBackToCurp = () => {
    setCurrentStep('curp');
  };

  const handleValidationContinue = () => {
    setCurrentStep('proofOfLife');
  };

  const handleProofOfLifeComplete = () => {
    setCurrentStep('consent');
  };

  const handleConsentComplete = () => {
    // Handle final step completion
    console.log('Credential flow completed!');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'start':
        return <CredentialCreationStart onStart={handleStartFlow} />;
      case 'curp':
        return (
          <CurpInput 
            onContinue={handleCurpSubmit}
            onBack={() => setCurrentStep('start')}
          />
        );
      case 'validation':
        return <IdentityValidation onContinue={handleValidationContinue} />;
      case 'proofOfLife':
        return <ProofOfLife onComplete={handleProofOfLifeComplete} />;
      case 'consent':
        return <Consent onComplete={handleConsentComplete} curp={curp} />;
      default:
        return <CredentialCreationStart onStart={handleStartFlow} />;
    }
  };

  return (
    <MainLayout>
      {renderCurrentStep()}
    </MainLayout>
  );
};