/**
 * @typedef {Object} HomeSummary
 * @property {string} netPosition
 * @property {string} owedToYou
 * @property {string} youOwe
 */

/**
 * @typedef {Object} Group
 * @property {string} id
 * @property {string} name
 * @property {number} memberCount
 * @property {string} latestExpense
 * @property {string} balance
 * @property {"positive" | "negative"} balanceTone
 * @property {string} category
 * @property {"lime" | "orange"} categoryTone
 * @property {string[]} members
 */

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} user
 * @property {string} action
 * @property {string} title
 * @property {string} amount
 * @property {"positive" | "negative"} tone
 * @property {string} timestamp
 */

export const homeSummary = {
  netPosition: "2,400",
  owedToYou: "3,180",
  youOwe: "780",
};

export const activeGroups = [
  {
    id: "roommates",
    name: "Dhanmondi Flat",
    memberCount: 4,
    latestExpense: "Groceries at Shwapno",
    balance: "৳ 1,240",
    balanceTone: "positive",
    category: "Roommates",
    categoryTone: "lime",
    members: ["Sami", "Nadia", "Rafi", "Mira"],
  },
  {
    id: "cox-trip",
    name: "Cox's Bazar",
    memberCount: 6,
    latestExpense: "Hotel booking",
    balance: "৳ 780",
    balanceTone: "negative",
    category: "Travel",
    categoryTone: "orange",
    members: ["Ari", "Sami", "Tuba", "Joy"],
  },
  {
    id: "movie-night",
    name: "Friday Movie",
    memberCount: 3,
    latestExpense: "Tickets and snacks",
    balance: "৳ 560",
    balanceTone: "positive",
    category: "Movie",
    categoryTone: "orange",
    members: ["Sami", "Rafi", "Nadia"],
  },
];

export const recentActivity = [
  {
    id: "activity-1",
    user: "Nadia",
    action: "added",
    title: "Groceries at Shwapno",
    amount: "৳ 620",
    tone: "positive",
    timestamp: "12 min ago",
  },
  {
    id: "activity-2",
    user: "Rafi",
    action: "settled",
    title: "Dinner split",
    amount: "৳ 300",
    tone: "positive",
    timestamp: "1 hr ago",
  },
  {
    id: "activity-3",
    user: "Ari",
    action: "added",
    title: "Hotel booking",
    amount: "৳ 780",
    tone: "negative",
    timestamp: "Yesterday",
  },
  {
    id: "activity-4",
    user: "Mira",
    action: "updated",
    title: "Utility bill",
    amount: "৳ 420",
    tone: "positive",
    timestamp: "Yesterday",
  },
];
