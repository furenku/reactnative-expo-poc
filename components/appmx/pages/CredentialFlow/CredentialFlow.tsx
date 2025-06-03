import React, { useState } from 'react';
import { MainLayout } from '@/components/appmx/MainLayout/MainLayout';
import { CredentialCreationStart } from '@/components/appmx/Credential/CredentialCreationStart/CredentialCreationStart';
import { CurpInput } from '@/components/appmx/Credential/CurpInput/CurpInput';
import { IdentityValidation } from '@/components/appmx/Credential/IdentityValidation/IdentityValidation';
import { ProofOfLife } from '@/components/appmx/ProofOfLife/ProofOfLife';
import { Consent } from '@/components/appmx/Credential/Consent/Consent';
import { Processing } from '../../Credential/Processing/Processing';
import { Success } from '../../Credential/Success/Success';
import { CredentialCard } from '../../TestCameraFlow/CredentialCard/CredentialCard';

type FlowStep = 'start' | 'curp' | 'validation' | 'proofOfLife' | 'consent' | 'processing' | 'success' | 'credential';

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
    setCurrentStep('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentStep('success');
  };


  const handleSuccessComplete = () => {
    setCurrentStep('credential');
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
        return <Consent onAccept={handleConsentComplete} onCancel={handleBackToCurp}/>;
      case 'processing':
        return <Processing onComplete={handleProcessingComplete}/>;
      case 'success':
          return <Success onComplete={handleSuccessComplete}/>; 
      case 'credential':
        return <CredentialCard  photoUri="" onDone={handleSuccessComplete}/>;
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