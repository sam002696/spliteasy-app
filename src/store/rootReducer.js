import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import expensesReducer from "./features/expenses";
import groupsReducer from "./features/groups";
import invitationsReducer from "./features/invitations";

const rootReducer = combineReducers({
  auth: authReducer,
  groups: groupsReducer,
  expenses: expensesReducer,
  invitations: invitationsReducer,
});

export default rootReducer;
