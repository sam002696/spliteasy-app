import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import balancesReducer from "./features/balances";
import expensesReducer from "./features/expenses";
import groupsReducer from "./features/groups";
import homeReducer from "./features/home";
import invitationsReducer from "./features/invitations";
import notificationsReducer from "./features/notifications";
import toastsReducer from "./features/toasts";

const rootReducer = combineReducers({
  auth: authReducer,
  balances: balancesReducer,
  groups: groupsReducer,
  home: homeReducer,
  expenses: expensesReducer,
  invitations: invitationsReducer,
  notifications: notificationsReducer,
  toasts: toastsReducer,
});

export default rootReducer;
