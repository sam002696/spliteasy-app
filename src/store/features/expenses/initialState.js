const initialState = {
  byGroupId: {},
  selectedExpense: null,
  loading: {
    list: false,
    create: false,
    detail: false,
    delete: false,
  },
  error: null,
  message: null,
};

export default initialState;
