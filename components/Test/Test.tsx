import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const Test: React.FC = () => {

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Test</Text>
		</View>
	);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});