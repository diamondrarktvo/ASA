import AsyncStorage from "@react-native-async-storage/async-storage";

const storeDataToAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("error saving data to async storage : ", e);
  }
};

const storeObjectDataToAsyncStorage = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("error saving object data to async storage : ", e);
  }
};

const getDataToAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.getItem(key);
  } catch (e) {
    console.log("error getting data from async storage : ", e);
  }
};

const getObjectDataToAsyncStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("error getting object data from async storage : ", e);
  }
};

export {
  storeDataToAsyncStorage,
  getDataToAsyncStorage,
  storeObjectDataToAsyncStorage,
};
