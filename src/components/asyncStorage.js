import AsyncStorage from '@react-native-community/async-storage';

export const getStorageCand = async () => {
  return await AsyncStorage.getItem('@candidatos');
};

export const setStorageCand = async data => {
  return await AsyncStorage.setItem('@candidatos', data);
};

export const getStorageVot = async () => {
  return await AsyncStorage.getItem('@votoscand');
};

export const setStorageVotos = async data => {
  return await AsyncStorage.setItem('@votoscand', data);
};

export const storaClear = async () => {
  return await AsyncStorage.clear();
};
