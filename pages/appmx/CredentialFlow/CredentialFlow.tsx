import React, { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { MainLayout } from '@/components/appmx/MainLayout/MainLayout';
import { CredentialCreationStart } from '@/components/appmx/Credential/CredentialCreationStart/CredentialCreationStart';
import { CurpInput } from '@/components/appmx/Credential/CurpInput/CurpInput';
import { IdentityValidation } from '@/components/appmx/Credential/IdentityValidation/IdentityValidation';
import { ProofOfLife } from '@/components/appmx/ProofOfLife/ProofOfLife';
import { Consent } from '@/components/appmx/Credential/Consent/Consent';
import { Processing } from '../../../components/appmx/Credential/Processing/Processing';
import { Success } from '../../../components/appmx/Credential/Success/Success';
import { CredentialCard } from '../../../components/appmx/Credential/CredentialCard/CredentialCard';
import { CredentialReady } from '../../../components/appmx/Credential/CredentialReady/CredentialReady';
import CredentialReadyStories from '../../../components/appmx/Credential/CredentialReady/CredentialReady.stories';
import { CameraView } from 'expo-camera';
import { ProgressSteps } from './ProgressSteps';

type FlowStep = 'start' | 'curp' | 'validation' | 'proofOfLife' | 'consent' | 'processing' | 'success' | 'credentialReady';

interface CredentialFlowProps {
  biometrics: 'enabled' | 'disabled';
  onBiometricActivate: () => void;
  onBiometricDismiss: () => void;
}

export const CredentialFlow: React.FC<CredentialFlowProps> = ({
  biometrics,
  onBiometricActivate,
  onBiometricDismiss
}) => {

  const [userName, setUserName] = useState<string>('');

  const [currentStep, setCurrentStep] = useState<FlowStep>('start');
  const [progress, setProgress] = useState<number>(0);
  const [curp, setCurp] = useState<string>('');
  const [photoUri, setPhotoUri] = useState<string>('');
  const cameraRef = useRef<CameraView>(null);

  const showProgress = ['curp','validation','consent'].includes(currentStep);
  const showHeader = ['start','success','credentialReady'].includes(currentStep);
  const showFooter = ['start','credentialReady'].includes(currentStep);
  const fadeAnim = useRef(new Animated.Value(showProgress ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showProgress ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showProgress, fadeAnim]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        setPhotoUri(photo.uri);
        handleProofOfLifeComplete();
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handleStartFlow = () => {
    setProgress(1)
    setCurrentStep('curp');
  };

  const handleCurpSubmit = (userCurp: string) => {
    setProgress(2)
    setCurp(userCurp);
    setUserName('Rodrigo');
    setCurrentStep('validation');
  };

  const handleBackToCurp = () => {
    setProgress(1)    
    setCurrentStep('curp');
  };

  const handleValidationContinue = () => {
    setCurrentStep('proofOfLife');
  };

  const handleProofOfLifeComplete = () => {
    setProgress(3)
    setCurrentStep('consent');
  };

  const handleConsentComplete = () => {
    setCurrentStep('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentStep('success');
  };


  const handleSuccessComplete = () => {
    setCurrentStep('credentialReady');
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
        return (
          <ProofOfLife 
            cameraRef={cameraRef}
            onTakePicture={takePicture} 
          />
        );
      case 'consent':        
        return <Consent onAccept={handleConsentComplete} onCancel={handleBackToCurp}/>;
      case 'processing':
        return <Processing onComplete={handleProcessingComplete}/>;
      case 'success':
        return <Success onComplete={handleSuccessComplete}/>; 
      case 'credentialReady':
        return <CredentialReady photoUri={photoUri} />;
      default:        
        return <CredentialCreationStart onStart={handleStartFlow} />;
    }
  };


  return (
    <MainLayout
      showHeader={showHeader}
      showFooter={showFooter}
      userName={userName}
      avatar={photoUri}
      biometrics={biometrics}
      onBiometricActivate={onBiometricActivate}
      onBiometricDismiss={onBiometricDismiss}    
    >
      {showProgress && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <ProgressSteps stepNumber={progress} />
        </Animated.View>
      )}
      {renderCurrentStep()}
    </MainLayout>
  );
};
