import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CredentialCard } from '../../Credential/CredentialCard/CredentialCard';

interface Props {
  photoUri: string;
  onDone: () => void;
}

export const CredentialApproval: React.FC<Props> = ({ photoUri, onDone }) => {
  return (
    <ScrollView style={styles.container}>
      <CredentialCard
        photoUri={photoUri}
        onDone={onDone}
      />
      
      <TouchableOpacity style={styles.doneButton} onPress={onDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: 320,
    height: 580,
  },
  doneButton: {
    backgroundColor: '#8B2635',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});