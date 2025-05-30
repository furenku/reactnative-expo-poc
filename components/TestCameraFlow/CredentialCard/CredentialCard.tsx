import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  photoUri: string;
  onDone: () => void;
}

export const CredentialCard: React.FC<Props> = ({ photoUri, onDone }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>IMSS</Text>
              <Text style={styles.logoSubtext}>BIENESTAR</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightText}>LlaveMX</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.beneficiarioLabel}>Beneficiario</Text>
          <Text style={styles.fullName}>Emanuel Ricardo{'\n'}Iriarte Gaspar</Text>
          
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Con derecho a servicios médicos</Text>
          </View>

          <View style={styles.photoContainer}>
            <Image source={{ uri: photoUri }} style={styles.photo} />
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.curpLabel}>CURP</Text>
            <Text style={styles.curpValue}>IGE790207HDFRSM05</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>Unidad Médica</Text>
                <Text style={styles.infoValue}>38</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>Núm de afiliación</Text>
                <Text style={styles.infoValue}>38023598111</Text>
              </View>
            </View>

            <Text style={styles.infoLabel}>Inscrito desde</Text>
            <Text style={styles.infoValue}>20/03/2002</Text>

            <View style={styles.verificationContainer}>
              <View style={styles.verificationDot} />
              <Text style={styles.verificationText}>Información verificada</Text>
            </View>
          </View>
        </View>

        {/* Footer with placeholder icons */}
        <View style={styles.footer}>
          <View style={styles.iconPlaceholder} />
          <View style={styles.iconPlaceholder} />
          <View style={styles.iconPlaceholder} />
          <View style={styles.iconPlaceholder} />
          <View style={styles.iconPlaceholder} />
          <View style={styles.iconPlaceholder} />
        </View>
      </View>
      
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
  card: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#8B2635',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginLeft: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoSubtext: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  headerRight: {
    alignItems: 'center',
  },
  headerRightText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    padding: 25,
    backgroundColor: '#fff',
  },
  beneficiarioLabel: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5,
  },
  fullName: {
    color: '#8B2635',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: 28,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  statusText: {
    color: '#666',
    fontSize: 14,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  photo: {
    width: 200,
    height: 240,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  infoSection: {
    marginTop: 10,
  },
  curpLabel: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  curpValue: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoColumn: {
    flex: 1,
    marginRight: 20,
  },
  infoLabel: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 3,
  },
  infoValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  verificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  verificationText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#8B2635',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
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