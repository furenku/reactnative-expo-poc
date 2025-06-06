import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text } from '../ui/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';


export const AppHeader = ({ userName, avatar }: { userName?: string, avatar?: string }) => {

  const {theme, styles} = useTheme()

  const ui = StyleSheet.create({    
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      padding: theme.spacing.sm,
    },
    logo: {
      width: 32,
      height: 32,
    }    
  });

  return (
    <View style={ui.header}>        
      <View style={{
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: theme.spacing.md,        
      }}>
        <Image
          source={require('@assets/images/atdt-logo-small.png')}
          style={ui.logo}
        />        
        <Text style={[styles.text, styles.darker]}>
          Hola, 
          <Text style={[styles.text, styles.darker, styles.bold]}> {userName||"buenas tardes"}</Text>
        </Text>
      </View>

        <TouchableOpacity style={styles.profileButton}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={ui.avatar} />
          ) : (
            <MaterialCommunityIcons name="account-outline" size={32} color="#666" />
          )}
        </TouchableOpacity>
        
    </View>
    );

}
