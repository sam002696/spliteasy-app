import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  hideToast,
  selectToasts,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { useTheme } from "../../design-system";
import { ToastItem } from "./ToastItem";

const MAX_VISIBLE_TOASTS = 3;

function ToastStack({ placement, toasts, onClose }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isTop = placement === "top";

  if (!toasts.length) {
    return null;
  }

  return (
    <View
      pointerEvents="box-none"
      style={{
        bottom: isTop ? undefined : Math.max(insets.bottom, theme.space[4]),
        left: 0,
        paddingHorizontal: theme.space[5],
        position: "absolute",
        right: 0,
        top: isTop ? Math.max(insets.top, theme.space[4]) : undefined,
        zIndex: theme.zIndices.modal,
      }}
    >
      <View pointerEvents="box-none" style={{ gap: theme.space[1] }}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </View>
    </View>
  );
}

export function ToastViewport() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);
  const topToasts = toasts
    .filter((toast) => toast.placement === "top")
    .slice(-MAX_VISIBLE_TOASTS);
  const bottomToasts = toasts
    .filter((toast) => toast.placement !== "top")
    .slice(-MAX_VISIBLE_TOASTS);

  if (!topToasts.length && !bottomToasts.length) {
    return null;
  }

  return (
    <>
      <ToastStack
        placement="top"
        toasts={topToasts}
        onClose={(toastId) => dispatch(hideToast(toastId))}
      />
      <ToastStack
        placement="bottom"
        toasts={bottomToasts}
        onClose={(toastId) => dispatch(hideToast(toastId))}
      />
    </>
  );
}
