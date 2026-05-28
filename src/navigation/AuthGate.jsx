import { useEffect, useState } from "react";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import {
  bootstrapAuth,
  selectIsAuthenticated,
  useAppDispatch,
  useAppSelector,
} from "../store";

export function AuthGate() {
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    let isMounted = true;

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
    if (!hasCheckedSession || !rootNavigationState?.key) {
      return;
    }

    const routeGroup = segments[0];
    const isAuthRoute = routeGroup === "(auth)";

    if (!isAuthenticated && !isAuthRoute) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && isAuthRoute) {
      router.replace("/(tabs)");
    }
  }, [hasCheckedSession, isAuthenticated, rootNavigationState?.key, router, segments]);

  return null;
}
