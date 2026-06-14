const initialState = {
  activeFilter: "open",
  items: [],
  itemsByFilter: {
    open: [],
    owed_to_you: [],
    you_owe: [],
    settled: [],
  },
  counts: {
    open: 0,
    owed_to_you: 0,
    you_owe: 0,
    settled: 0,
  },
  loading: {
    list: false,
    remindById: {},
    settleById: {},
  },
  error: null,
  message: null,
};

export default initialState;
