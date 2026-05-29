const initialState = {
  activeFilter: "open",
  items: [],
  itemsByFilter: {
    open: [],
    you_owe: [],
    settled: [],
  },
  counts: {
    open: 0,
    you_owe: 0,
    settled: 0,
  },
  loading: {
    list: false,
    settleById: {},
  },
  error: null,
  message: null,
};

export default initialState;
