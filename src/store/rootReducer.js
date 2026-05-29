import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import balancesReducer from "./features/balances";
import expensesReducer from "./features/expenses";
import groupsReducer from "./features/groups";
import invitationsReducer from "./features/invitations";
import toastsReducer from "./features/toasts";

const rootReducer = combineReducers({
  auth: authReducer,
  balances: balancesReducer,
  groups: groupsReducer,
  expenses: expensesReducer,
  invitations: invitationsReducer,
  toasts: toastsReducer,
});

export default rootReducer;
