const initialState = {
  items: [],
  activeFilter: "all",
  itemsByFilter: {
    all: [],
    owed_to_you: [],
    you_owe: [],
    settled: [],
  },
  selectedGroup: null,
  membersByGroupId: {},
  balancesByGroupId: {},
  loading: {
    list: false,
    create: false,
    detail: false,
    delete: false,
    leave: false,
    members: false,
    removeMember: false,
    removeMemberById: {},
    invite: false,
    balances: false,
  },
  error: null,
  message: null,
};

export default initialState;
