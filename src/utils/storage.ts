import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageKeys = '@auth_token' | '@navigation_state' | '@intro';

export const save = async (key: StorageKeys, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `[Async Storage] Error while saving key: ${key}, value: ${value}`,
      error,
    );
  }
};

export const get = async (key: StorageKeys) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[Async Storage] Error while getting key: ${key}`, error);
    return undefined;
  }
};

export const remove = async (key: StorageKeys) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[Async Storage] Error while removing key: ${key}`, error);
  }
};

const Storage = {
  save,
  get,
  remove,
};

export default Storage;
