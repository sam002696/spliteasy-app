# SplitEasy Redux Layer

This folder contains the app-wide Redux Toolkit setup for API-backed state.

## Structure

- `store.js`: configures the Redux store.
- `rootReducer.js`: combines feature reducers.
- `hooks.js`: shared `useAppDispatch` and `useAppSelector` hooks.
- `features/auth`: register, login, logout, current user, token bootstrap.
- `features/balances`: global balances across all groups.
- `features/groups`: groups, members, invites, group balances.
- `features/expenses`: group expenses and single expense state.
- `features/invitations`: pending invitations, accept, reject.
- `features/toasts`: app-level success, error, info, and warning messages.

Each feature folder follows the same shape:

- `initialState.js`: default state for the feature.
- `thunks.js`: async API actions.
- `slice.js`: reducers and async state transitions.
- `selectors.js`: reusable state selectors.
- `index.js`: public exports for the feature.

## API Base URL

The API prefix is fixed at `/api/v1`. Set the origin with Expo public env:

```txt
EXPO_PUBLIC_API_BASE_URL=https://api-domain.com
```

Protected requests automatically send:

```txt
Authorization: Bearer {token}
Accept: application/json
Content-Type: application/json
```

## Usage

```js
import { login, useAppDispatch, useAppSelector } from "../src/store";

const dispatch = useAppDispatch();
const auth = useAppSelector((state) => state.auth);

dispatch(login({ email, password }));
```

## Toasts

Feature thunks use the app toast system for API feedback. Mutations dispatch
success toasts when the API returns successfully, and failed API calls dispatch
error toasts with the API message or a local fallback.

Any screen can also trigger a toast by dispatching one of the toast helpers:

```js
import { showErrorToast, showSuccessToast } from "../src/store";

dispatch(showSuccessToast("File uploaded successfully."));
dispatch(showErrorToast("Something went wrong."));
```
