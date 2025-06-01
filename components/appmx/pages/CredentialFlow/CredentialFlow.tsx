import React from 'react';
import { MainLayout } from '@/components/appmx/MainLayout/MainLayout';
import { CredentialCreationStart } from '@/components/appmx/Credential/CredentialCreationStart/CredentialCreationStart';

export const CredentialFlow: React.FC = () => {
  return (
    <MainLayout>
      <CredentialCreationStart />
    </MainLayout>
  );
};