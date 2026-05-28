import { AlertTriangle, Check, Info, XCircle } from "lucide-react-native";

export const toastVariants = {
  success: {
    backgroundColor: "#34780E",
    icon: Check,
  },
  error: {
    backgroundColor: "#B73535",
    icon: XCircle,
  },
  info: {
    backgroundColor: "#2367B4",
    icon: Info,
  },
  warning: {
    backgroundColor: "#9A5C0A",
    icon: AlertTriangle,
  },
};
