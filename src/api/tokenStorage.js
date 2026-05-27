import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN_KEY = "spliteasy.authToken";

export async function getStoredAuthToken() {
  return AsyncStorage.getItem(AUTH_TOKEN_KEY);
}

export async function setStoredAuthToken(token) {
  if (!token) {
    return clearStoredAuthToken();
  }

  return AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
}

export async function clearStoredAuthToken() {
  return AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}
