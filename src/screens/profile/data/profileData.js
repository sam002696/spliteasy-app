import {
  Bell,
  CircleHelp,
  CreditCard,
  History,
  LockKeyhole,
  LogOut,
  PencilLine,
  WalletCards,
} from "lucide-react-native";

export const profileUser = {
  name: "Sami Rahman",
  email: "sami@example.com",
  initials: "SR",
  plan: "Personal wallet",
};

export const profileActions = [
  {
    id: "edit-profile",
    label: "Edit profile",
    value: "Name, email, avatar",
    icon: PencilLine,
  },
];

export const settingsRows = [
  {
    id: "notifications",
    label: "Notifications",
    value: "Push enabled",
    icon: Bell,
  },
  {
    id: "default-currency",
    label: "Default currency",
    value: "BDT",
    icon: WalletCards,
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    value: "Account settings",
    icon: LockKeyhole,
  },
  {
    id: "payment-history",
    label: "Payment history",
    value: "Settlements",
    icon: History,
  },
  {
    id: "payment-methods",
    label: "Payment methods",
    value: "Manual tracking",
    icon: CreditCard,
  },
  {
    id: "support",
    label: "Help & Support",
    value: "FAQs and contact",
    icon: CircleHelp,
  },
];

export const accountRows = [
  {
    id: "sign-out",
    label: "Sign out",
    value: "End this session",
    icon: LogOut,
    tone: "danger",
  },
];
