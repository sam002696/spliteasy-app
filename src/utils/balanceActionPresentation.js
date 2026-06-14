import { Bell, SquareCheck } from "lucide-react-native";

export function getBalanceActionPresentation(tone, palette) {
  const isDebt = tone === "negative";

  if (isDebt) {
    return {
      Icon: SquareCheck,
      backgroundColor: palette.settleActionBackground,
      color: palette.settleActionText,
    };
  }

  return {
    Icon: Bell,
    backgroundColor: palette.remindActionBackground,
    color: palette.remindActionText,
  };
}
