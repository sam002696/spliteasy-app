import {
  Bell,
  CircleHelp,
  CircleDollarSign,
  Clock3,
  DollarSign,
  LockKeyhole,
  LogOut,
} from "lucide-react-native";

export const profileUser = {
  name: "Sami Rahman",
  email: "sami@example.com",
  initials: "SR",
  plan: "Split summary",
};

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
    icon: CircleDollarSign,
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    value: "Account settings",
    icon: LockKeyhole,
  },
  {
    id: "settlement-history",
    label: "Settlement history",
    value: "Manual records",
    icon: Clock3,
  },
  {
    id: "manual-settlements",
    label: "Manual settlements",
    value: "External tracking",
    icon: DollarSign,
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
