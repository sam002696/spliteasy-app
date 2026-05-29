/**
 * @typedef {Object} GroupListItem
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {"lime" | "orange"} categoryTone
 * @property {number} memberCount
 * @property {string[]} members
 * @property {string} latestExpense
 * @property {string} updatedAt
 * @property {string} balance
 * @property {"positive" | "negative" | "settled"} balanceTone
 * @property {number} settlementProgress
 * @property {string} activityCount
 */

export const groupStats = {
  activeGroups: "6",
  totalMembers: "24",
  netPosition: "৳ 2,400",
};

export const groupFilters = [
  { label: "All", value: "all" },
  { label: "Owed to you", value: "owed_to_you" },
  { label: "You owe", value: "you_owe" },
  { label: "Settled", value: "settled" },
];

export const groups = [
  {
    id: "dhanmondi-flat",
    name: "Dhanmondi Flat",
    category: "Roommates",
    categoryTone: "lime",
    memberCount: 4,
    members: ["Sami", "Nadia", "Rafi", "Mira"],
    latestExpense: "Groceries at Shwapno",
    updatedAt: "12 min ago",
    balance: "৳ 1,240",
    balanceTone: "positive",
    settlementProgress: 0.72,
    activityCount: "18 expenses",
  },
  {
    id: "cox-trip",
    name: "Cox's Bazar",
    category: "Travel",
    categoryTone: "orange",
    memberCount: 6,
    members: ["Ari", "Sami", "Tuba", "Joy", "Nadia"],
    latestExpense: "Hotel booking",
    updatedAt: "1 hr ago",
    balance: "৳ 780",
    balanceTone: "negative",
    settlementProgress: 0.42,
    activityCount: "27 expenses",
  },
  {
    id: "friday-movie",
    name: "Friday Movie",
    category: "Movie",
    categoryTone: "orange",
    memberCount: 3,
    members: ["Sami", "Rafi", "Nadia"],
    latestExpense: "Tickets and snacks",
    updatedAt: "Yesterday",
    balance: "৳ 560",
    balanceTone: "positive",
    settlementProgress: 0.88,
    activityCount: "6 expenses",
  },
  {
    id: "office-lunch",
    name: "Office Lunch",
    category: "Team",
    categoryTone: "lime",
    memberCount: 5,
    members: ["Sami", "Mira", "Ari", "Joy"],
    latestExpense: "Kacchi delivery",
    updatedAt: "2 days ago",
    balance: "Settled",
    balanceTone: "settled",
    settlementProgress: 1,
    activityCount: "11 expenses",
  },
  {
    id: "family-eid",
    name: "Family Eid",
    category: "Family",
    categoryTone: "lime",
    memberCount: 6,
    members: ["Sami", "Ma", "Baba", "Rina"],
    latestExpense: "Gift shopping",
    updatedAt: "May 18",
    balance: "৳ 420",
    balanceTone: "negative",
    settlementProgress: 0.58,
    activityCount: "9 expenses",
  },
  {
    id: "book-club",
    name: "Book Club",
    category: "Friends",
    categoryTone: "orange",
    memberCount: 4,
    members: ["Sami", "Tuba", "Rafi", "Mira"],
    latestExpense: "May meetup snacks",
    updatedAt: "May 12",
    balance: "৳ 320",
    balanceTone: "positive",
    settlementProgress: 0.66,
    activityCount: "5 expenses",
  },
];
