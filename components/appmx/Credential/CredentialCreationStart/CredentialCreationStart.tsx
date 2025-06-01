import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../../ui/Text';
import { Button } from '@/components/appmx/ui/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CredentialCreationStart: React.FC = () => {
  const ui = useBaseStyles();
 
  return (
    <View style={[ui.containerCentered, styles.container]}>
      <View style={styles.card}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}> 
          <Image
            source={require('@assets/images/illustrations/illustration1.png')}
            style={styles.illustration}
          />          
        </View>

        {/* Title */}
        <Text style={[ui.text, styles.title]}>
          Crea tu identidad digital y úsala para identificarte ante instituciones públicas
        </Text>

        {/* Description */}
        <Text style={[ui.text, styles.description]}>
          Es gratis y solo te tomará unos minutos. Necesitas:
        </Text>

        {/* Requirements */}
        <View style={styles.requirements}>
          <View style={styles.requirementItem}>
            <View style={styles.requirementIcon}>
              <MaterialCommunityIcons name="account-outline" size={20} color="#666" />
            </View>
            <Text style={[ui.text, styles.requirementText]}>
              Ingresar tu CURP
            </Text>
          </View>
          
          <View style={styles.requirementItem}>
            <View style={styles.requirementIcon}>
              <MaterialCommunityIcons name="camera-outline" size={20} color="#666" />
            </View>
            <Text style={[ui.text, styles.requirementText]}>
              Tomarte una foto
            </Text>
          </View>
        </View>

        <Button title='Crear credencial' onPress={() => {}}/>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    gap: 20,
  },
  illustrationContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  illustration: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'left',
    lineHeight: 28,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'left',
    lineHeight: 24,
  },
  requirements: {
    gap: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  requirementIcon: {
    
    // backgroundColor: '#1f2937',
    // borderRadius: 12,
  },
  requirementText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});