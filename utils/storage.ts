import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Data stored successfully for key: ${key}`);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Retrieve data
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Delete data
const deleteData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data deleted successfully for key: ${key}`);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

// Clear all storage
const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Storage cleared successfully');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

export { storeData, getData, deleteData, clearStorage };