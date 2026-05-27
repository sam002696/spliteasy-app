const initialState = {
  token: null,
  user: null,
  isBootstrapping: false,
  isAuthenticated: false,
  loading: {
    register: false,
    login: false,
    logout: false,
    me: false,
  },
  error: null,
  message: null,
};

export default initialState;
