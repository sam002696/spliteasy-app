const initialState = {
  pending: [],
  loading: {
    pending: false,
    accept: false,
    acceptById: {},
    reject: false,
    rejectById: {},
  },
  error: null,
  message: null,
};

export default initialState;
