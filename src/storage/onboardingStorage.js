import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_COMPLETED_KEY = "spliteasy.onboardingCompleted";

export async function getStoredOnboardingCompleted() {
  const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);

  return value === "true";
}

export async function setStoredOnboardingCompleted() {
  return AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
}
