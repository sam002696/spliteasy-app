import { Camera, PencilLine } from "lucide-react-native";

export const entryModes = [
  { label: "Manual Entry", value: "manual", icon: PencilLine },
  { label: "Scan Receipt", value: "scan", icon: Camera },
];

export const currencyOptions = [
  { label: "BDT", value: "BDT" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
];

export const splitMethods = [
  { label: "Equal", value: "equal" },
  { label: "Custom", value: "custom" },
  { label: "Percent", value: "percent" },
  { label: "Shares", value: "shares" },
];

export const payers = [
  { label: "Sami", value: "sami" },
  { label: "Nadia", value: "nadia" },
  { label: "Rafi", value: "rafi" },
  { label: "Mira", value: "mira" },
];
