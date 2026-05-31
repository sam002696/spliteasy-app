const initialState = {
  activeFilter: "all",
  items: [],
  itemsByFilter: {
    all: [],
    unread: [],
    read: [],
  },
  unreadCount: 0,
  pagination: {
    current_page: 1,
    per_page: 20,
    total: 0,
    last_page: 1,
  },
  loading: {
    list: false,
    markReadById: {},
    markAllRead: false,
  },
  error: null,
  message: null,
};

export default initialState;
