import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

import { Text } from "./CredentialText"
import { useTheme } from '@/context/ThemeContext';

interface Props {
  photoUri: string;
  onDone: () => void;
}

export const CredentialCard: React.FC<Props> = ({ photoUri, onDone }) => {

  const { theme, styles } = useTheme();


  
  
  

  const ui = StyleSheet.create({
    card: {
      width: 320,
      height: 680,
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
      padding: 0
    },
    header: {
      backgroundColor: theme.colors.credential,
      paddingHorizontal: 24,
      paddingVertical: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
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
      paddingHorizontal: 32,
      paddingVertical: 12,
      backgroundColor: '#fff',
    },
    beneficiarioLabel: {
      color: '#D4AF37',
      fontSize: 18,
      fontWeight: '400',
      marginBottom: 5,
    },
    fullName: {
      color: theme.colors.credential,
      fontSize: 22,
      fontWeight: 'bold',
      
      lineHeight: 28,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#34c759',
      marginRight: 8,
    },
    statusText: {
      color: theme.colors.credential,
      fontSize: 10,
    },
    photoContainer: {
      alignItems: 'center',
      marginBottom: 12,
    },
    photo: {
      width: '100%',
      height: 240,
      borderRadius: 15,
      backgroundColor: '#f0f0f0',
    },
    infoSection: {
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
      marginBottom: 6,
      letterSpacing: 1,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    infoColumn: {
      flex: 1
    },
    infoLabel: {
      color: '#666',
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 3,
    },
    infoValue: {
      color: '#333',
      fontSize: 20,
      fontWeight: '600',
    },
    verificationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
    },
    verificationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#4CAF50',
      marginRight: 4,
    },
    verificationText: {
      color: '#4CAF50',
      fontSize: 14,
      fontWeight: '500',
    },
    footer: {
      backgroundColor: theme.colors.credential,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    iconPlaceholder: {
      width: 30,
      height: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 15,
    }
  });

  return (
    <View style={ui.card}>

      {/* <ImageBackground
        source={require('@/assets/images/texture.jpg')} 
        resizeMode="contain"
        style={[ styles.container , {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1
          
        }]}
      /> */}

      {/* Header */}
      <View style={ui.header}>
        <View style={ui.iconPlaceholder} />            
        
        <View style={ui.iconPlaceholder} />            
      
      </View>

      {/* Content */}
      <View style={ui.content}>
        <Text style={ui.beneficiarioLabel}>Beneficiario</Text>
        <Text style={ui.fullName}>José Rodrigo{'\n'}Treviño Frenk</Text>
        
        <View style={ui.statusContainer}>
          <View style={ui.statusDot} />
          <Text style={ui.statusText}>Con derecho a servicios médicos</Text>
        </View>

        <View style={ui.photoContainer}>
          <Image source={{ uri: photoUri }} style={ui.photo} />
        </View>

        <View style={ui.infoSection}>
          <Text style={ui.curpLabel}>CURP</Text>
          <Text style={ui.curpValue}>TEFR851112488HDFRD06</Text>

          <View style={ui.infoRow}>
            <View style={ui.infoColumn}>
              <Text style={ui.infoLabel}>Unidad Médica</Text>
              <Text style={ui.infoValue}>38</Text>
            </View>
            <View style={ui.infoColumn}>
              <Text style={ui.infoLabel}>Núm de afiliación</Text>
              <Text style={ui.infoValue}>38023598111</Text>
            </View>
          </View>

          <Text style={ui.infoLabel}>Inscrito desde</Text>
          <Text style={ui.infoValue}>03/05/2025</Text>

          <View style={ui.verificationContainer}>
            <View style={ui.verificationDot} />
            <Text style={ui.verificationText}>Información verificada</Text>
          </View>
        </View>
      </View>

      {/* Footer with placeholder icons */}
      <View style={ui.footer}>
        <View style={ui.iconPlaceholder} />
        <View style={ui.iconPlaceholder} />
        <View style={ui.iconPlaceholder} />
        <View style={ui.iconPlaceholder} />
        <View style={ui.iconPlaceholder} />
        <View style={ui.iconPlaceholder} />
      </View>
    </View>
            
  );
  
};
