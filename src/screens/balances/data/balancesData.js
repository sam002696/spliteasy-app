export const balanceSummary = {
  netBalance: "+  2,400",
  owedToYou: "৳ 3,180",
  youOwe: "৳ 780",
};

export const balanceFilters = [
  { label: "Open", value: "open" },
  { label: "You owe", value: "negative" },
  { label: "Settled", value: "settled" },
];

export const openBalances = [
  {
    id: "bal-nadia",
    person: "Nadia Rahman",
    group: "Dhanmondi Flat",
    note: "owes you",
    amount: "৳ 620",
    tone: "positive",
    progress: 0.66,
    action: "Remind",
    lastActivity: "Groceries at Shwapno",
  },
  {
    id: "bal-rafi",
    person: "Rafi Ahmed",
    group: "Dhanmondi Flat",
    note: "owes you",
    amount: "৳ 420",
    tone: "positive",
    progress: 0.48,
    action: "Remind",
    lastActivity: "Utility bill",
  },
  {
    id: "bal-ari",
    person: "Ari Hasan",
    group: "Cox's Bazar",
    note: "you owe",
    amount: "৳ 780",
    tone: "negative",
    progress: 0.42,
    action: "Pay",
    lastActivity: "Hotel booking",
  },
  {
    id: "bal-mira",
    person: "Mira Khan",
    group: "Family Eid",
    note: "you owe",
    amount: "৳ 420",
    tone: "negative",
    progress: 0.58,
    action: "Pay",
    lastActivity: "Gift shopping",
  },
];

export const settledBalances = [
  {
    id: "settled-joy",
    person: "Joy Das",
    group: "Cox's Bazar",
    amount: "৳ 1,200",
    settledAt: "Settled yesterday",
  },
  {
    id: "settled-tuba",
    person: "Tuba Islam",
    group: "Book Club",
    amount: "৳ 320",
    settledAt: "Settled May 18",
  },
];
