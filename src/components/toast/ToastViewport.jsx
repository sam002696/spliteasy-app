import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hideToast, selectToasts, useAppDispatch, useAppSelector } from "../../store";
import { useTheme } from "../../design-system";
import { ToastItem } from "./ToastItem";

const MAX_VISIBLE_TOASTS = 3;

export function ToastViewport() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);
  const visibleToasts = toasts.slice(-MAX_VISIBLE_TOASTS);

  if (!visibleToasts.length) {
    return null;
  }

  return (
    <View
      pointerEvents="box-none"
      style={{
        bottom: Math.max(insets.bottom, theme.space[4]),
        left: 0,
        paddingHorizontal: theme.space[5],
        position: "absolute",
        right: 0,
        zIndex: theme.zIndices.modal,
      }}
    >
      <View pointerEvents="box-none" style={{ gap: theme.space[1] }}>
        {visibleToasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={(toastId) => dispatch(hideToast(toastId))}
          />
        ))}
      </View>
    </View>
  );
}
