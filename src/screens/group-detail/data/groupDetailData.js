export const groupDetailTabs = [
  { label: "Expenses", value: "expenses" },
  { label: "Balances", value: "balances" },
  { label: "Members", value: "members" },
];

export const groupDetails = {
  "dhanmondi-flat": {
    id: "dhanmondi-flat",
    name: "Dhanmondi Flat",
    category: "Roommates",
    categoryTone: "lime",
    memberCount: 4,
    summary: {
      yourPositionLabel: "You are owed",
      yourPositionAmount: "৳ 1,240",
      yourPositionTone: "positive",
      totalSpend: "৳ 18,480",
      unsettled: "3 open",
    },
    members: [
      { id: "sami", name: "Sami Rahman", email: "sami@example.com", status: "You", balance: "You are owed ৳ 1,240", tone: "positive" },
      { id: "nadia", name: "Nadia Rahman", email: "nadia@example.com", status: "Member", balance: "Nadia owes you ৳ 620", tone: "positive" },
      { id: "rafi", name: "Rafi Ahmed", email: "rafi@example.com", status: "Member", balance: "Rafi owes you ৳ 420", tone: "positive" },
      { id: "mira", name: "Mira Khan", email: "mira@example.com", status: "Member", balance: "Mira owes you ৳ 200", tone: "positive" },
    ],
    expenses: [
      { id: "exp-1", title: "Groceries at Shwapno", paidBy: "Nadia", date: "Today", amount: "৳ 2,480", yourShare: "৳ 620", status: "Open" },
      { id: "exp-2", title: "Utility bill", paidBy: "Sami", date: "Yesterday", amount: "৳ 3,200", yourShare: "৳ 800", status: "Open" },
      { id: "exp-3", title: "Internet recharge", paidBy: "Rafi", date: "May 20", amount: "৳ 1,200", yourShare: "৳ 300", status: "Settled" },
      { id: "exp-4", title: "Cleaning supplies", paidBy: "Mira", date: "May 18", amount: "৳ 960", yourShare: "৳ 240", status: "Settled" },
    ],
    balances: [
      { id: "bal-1", person: "Nadia Rahman", note: "Nadia owes you", amount: "৳ 620", tone: "positive", progress: 0.66, action: "Remind" },
      { id: "bal-2", person: "Rafi Ahmed", note: "Rafi owes you", amount: "৳ 420", tone: "positive", progress: 0.48, action: "Remind" },
      { id: "bal-3", person: "Mira Khan", note: "Mira owes you", amount: "৳ 200", tone: "positive", progress: 0.3, action: "Remind" },
    ],
  },
  roommates: null,
  "cox-trip": {
    id: "cox-trip",
    name: "Cox's Bazar",
    category: "Travel",
    categoryTone: "orange",
    memberCount: 6,
    summary: {
      yourPositionLabel: "You owe",
      yourPositionAmount: "৳ 780",
      yourPositionTone: "negative",
      totalSpend: "৳ 42,800",
      unsettled: "5 open",
    },
    members: [
      { id: "ari", name: "Ari Hasan", email: "ari@example.com", status: "Owner", balance: "Ari is owed ৳ 2,100", tone: "positive" },
      { id: "sami", name: "Sami Rahman", email: "sami@example.com", status: "You", balance: "You owe ৳ 780", tone: "negative" },
      { id: "tuba", name: "Tuba Islam", email: "tuba@example.com", status: "Member", balance: "Tuba owes ৳ 460", tone: "negative" },
      { id: "joy", name: "Joy Das", email: "joy@example.com", status: "Member", balance: "Joy owes ৳ 860", tone: "negative" },
    ],
    expenses: [
      { id: "exp-1", title: "Hotel booking", paidBy: "Ari", date: "Today", amount: "৳ 18,000", yourShare: "৳ 3,000", status: "Open" },
      { id: "exp-2", title: "Lunch near beach", paidBy: "Sami", date: "Yesterday", amount: "৳ 4,800", yourShare: "৳ 800", status: "Open" },
      { id: "exp-3", title: "Microbus advance", paidBy: "Joy", date: "May 21", amount: "৳ 12,000", yourShare: "৳ 2,000", status: "Settled" },
    ],
    balances: [
      { id: "bal-1", person: "Ari Hasan", note: "You owe Ari", amount: "৳ 780", tone: "negative", progress: 0.42, action: "Mark settled" },
      { id: "bal-2", person: "Joy Das", note: "Joy owes you", amount: "৳ 320", tone: "positive", progress: 0.5, action: "Remind" },
    ],
  },
};

groupDetails.roommates = groupDetails["dhanmondi-flat"];

export function getGroupDetail(groupId) {
  return groupDetails[groupId] || groupDetails["dhanmondi-flat"];
}
