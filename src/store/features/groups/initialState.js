const initialState = {
  items: [],
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
    invite: false,
    balances: false,
  },
  error: null,
  message: null,
};

export default initialState;
