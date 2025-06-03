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
import { CredentialReady } from '../../Credential/CredentialReady/CredentialReady';
import CredentialReadyStories from '../../Credential/CredentialReady/CredentialReady.stories';

type FlowStep = 'start' | 'curp' | 'validation' | 'proofOfLife' | 'consent' | 'processing' | 'success' | 'credential';

export const CredentialFlow: React.FC = () => {

  const [userName, setUserName] = useState<string>('');

  const [currentStep, setCurrentStep] = useState<FlowStep>('start');
  const [curp, setCurp] = useState<string>('');

  const handleStartFlow = () => {
    setCurrentStep('curp');
  };

  const handleCurpSubmit = (userCurp: string) => {
    setCurp(userCurp);
    setUserName('Rodrigo');
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
        // return <CredentialReady
        //   photoUri=''
        //   userName='Rodrigo'
        //   onDownload={()=>{}}
        //   onReverse={()=>{}}
        //   onShare={()=>{}}
        //   onValidate={()=>{}}

        // />;
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
        return <CredentialReady  photoUri=""/>;
      default:        
        return <CredentialCreationStart onStart={handleStartFlow} />;
    }
  };

  return (
    <MainLayout userName={userName}>
      {renderCurrentStep()}
    </MainLayout>
  );
};