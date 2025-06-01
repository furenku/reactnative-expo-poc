import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useBaseStyles } from '@/styles/useBaseStyles';
import { Text } from '../ui/Text';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const ui = useBaseStyles();

  return (
    <SafeAreaView style={[ui.flex, styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo} />
          <Text style={[ui.text, styles.greeting]}>Hola, Emmanuel</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={[ui.flex, styles.content]}>
        {children}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <View style={styles.footerIcon} />
          <Text style={styles.footerText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.fabButton}>
          <View style={styles.fabIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerButton}>
          <View style={styles.footerIconInactive} />
          <Text style={styles.footerTextInactive}>CABI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: '#22c55e',
    borderRadius: 8,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
  },
  content: {
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerButton: {
    alignItems: 'center',
    gap: 4,
  },
  footerIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  footerIconInactive: {
    width: 24,
    height: 24,
    backgroundColor: '#9ca3af',
    borderRadius: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '500',
  },
  footerTextInactive: {
    fontSize: 12,
    color: '#9ca3af',
  },
  fabButton: {
    width: 56,
    height: 56,
    backgroundColor: '#22c55e',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
});