import { useEffect, useState } from "react";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import {
  bootstrapAuth,
  selectIsAuthenticated,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { getStoredOnboardingCompleted } from "../storage/onboardingStorage";

export function AuthGate() {
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [hasCheckedOnboarding, setHasCheckedOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getStoredOnboardingCompleted().then((completed) => {
      if (isMounted) {
        setHasCompletedOnboarding(completed);
        setHasCheckedOnboarding(true);
      }
    });

    dispatch(bootstrapAuth()).finally(() => {
      if (isMounted) {
        setHasCheckedSession(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!hasCheckedOnboarding || !hasCheckedSession || !rootNavigationState?.key) {
      return;
    }

    const routeGroup = segments[0];
    const isAuthRoute = routeGroup === "(auth)";
    const isOnboardingRoute = routeGroup === "onboarding";

    if (!hasCompletedOnboarding) {
      if (isOnboardingRoute) {
        return;
      }

      getStoredOnboardingCompleted().then((completed) => {
        if (completed) {
          setHasCompletedOnboarding(true);
          return;
        }

        router.replace("/onboarding");
      });

      return;
    }

    if (!isAuthenticated && !isAuthRoute) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && (isAuthRoute || isOnboardingRoute)) {
      router.replace("/(tabs)");
    }
  }, [
    hasCheckedOnboarding,
    hasCheckedSession,
    hasCompletedOnboarding,
    isAuthenticated,
    rootNavigationState?.key,
    router,
    segments,
  ]);

  return null;
}
