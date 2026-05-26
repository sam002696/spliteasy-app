# SplitEasy App

SplitEasy is an Expo React Native shared-expense splitting app. The current codebase focuses on the app shell, design-system usage, and production-ready UI architecture. Business logic, persistence, auth, APIs, OCR, notifications, and in-app money movement are intentionally not implemented yet.

## Current Status

Implemented UI:

- Home tab
- Groups tab
- Group Detail screen
- Create Group modal
- Add Expense modal with Manual Entry UI and Scan Receipt placeholder
- Balances tab
- Profile tab
- Custom bottom tab navigation
- Reusable design system layer


## App Flow

### Auth Flow

Planned flow:

1. First app open shows Splash / Onboarding.
2. User signs up or logs in with email or Google OAuth.
3. Authenticated users land on Home.
4. Returning authenticated users skip onboarding/auth and go directly to Home.

This routing gate is planned but not implemented yet.

### Home

Route:

```txt
app/(tabs)/index.jsx
```

Home is the main hub. It shows:

- Top bar
- Greeting
- Lime split-summary card
- Active groups carousel
- Recent activity feed
- Bottom navigation

Tapping a group opens Group Detail:

```txt
app/groups/[groupId].jsx
```

### Groups

Route:

```txt
app/(tabs)/groups.jsx
```

Groups shows:

- Header with search/filter/create actions
- Summary stat cards
- Filter chips
- Group cards
- Floating create group button

Tapping a group opens Group Detail. Tapping the plus button opens Create Group modal.

### Create Group

Route:

```txt
app/(modals)/create-group.jsx
```

Create Group is a full-height modal. It includes:

- Group name input
- Category chips
- Base currency chips
- Suggested member invite rows
- Cancel/Create footer

Current behavior is UI-only. Create dismisses the modal but does not persist data.

### Group Detail

Route:

```txt
app/groups/[groupId].jsx
```

Group Detail is the hub for a single group. It includes:

- Header with back button and group metadata
- Lime summary card
- Internal tab switcher
- Expenses tab
- Balances tab
- Members tab
- Floating add expense button

Tapping the add expense button opens Add Expense modal with the group prefilled.

### Add Expense

Route:

```txt
app/(modals)/add-expense.jsx
```

Add Expense is a full-height modal. It includes:

- Amount card
- Manual Entry / Scan Receipt mode toggle
- Description field
- Prefilled group field
- Date field
- Currency selector
- Who paid selector
- Split method selector
- Split preview
- Save expense button

Manual mode is UI-only. Scan mode currently shows a placeholder for the future receipt scanner flow.

### Receipt Scanner

Planned flow:

1. Camera screen with receipt frame.
2. Scanned list screen with merchant banner, editable line items, and totals card.
3. Split mode picker with Split Total and Split by Item.

This flow is not implemented yet.

### Balances

Route:

```txt
app/(tabs)/balances.jsx
```

Balances shows global settlement state across all groups:

- Header
- Lime summary card
- Filter chips
- Open balance cards
- Remind / Mark settled buttons
- Settled section

Actions are UI-only. Remind does not send notifications yet, and Mark settled does not create settlement records yet.

### Reports

Route:

```txt
app/(tabs)/reports.jsx
```

Reports is still a placeholder. Planned UI:

- Spending chart
- Stat cards
- Period picker
- Export PDF / CSV actions

### Profile

Route:

```txt
app/(tabs)/profile.jsx
```

Profile shows:

- Header
- Identity card
- Edit profile action
- Settings rows
- Account rows
- App version footer

No auth/session logic is implemented yet.

## Route Structure

```txt
app/
  _layout.jsx
  (tabs)/
    _layout.jsx
    index.jsx
    groups.jsx
    balances.jsx
    reports.jsx
    profile.jsx
  (modals)/
    add-expense.jsx
    create-group.jsx
  groups/
    [groupId].jsx
```

## Source Structure

```txt
src/
  design-system/
    components/
    theme/
    utils/
    index.js
  navigation/
    BottomTabBar.jsx
    tabItems.js
    index.js
  screens/
    add-expense/
    balances/
    create-group/
    group-detail/
    groups/
    home/
    profile/
```

Each screen feature follows the same pattern:

```txt
FeatureName/
  FeatureScreen.jsx
  components/
    ...
    index.js
  data/
    mockData.js
  index.js
```

## Design System

The design system lives in:

```txt
src/design-system/
```

It provides:

- Theme provider
- Tokens
- Semantic colors
- Typography scale
- Spacing scale
- Radius scale
- Motion values
- Reusable primitives

Screen code should consume design-system exports instead of redefining colors, spacing, typography, radius, or primitives.

## Navigation

Expo Router is used for routing.

The custom bottom tab bar lives in:

```txt
src/navigation/BottomTabBar.jsx
```

Tab config lives in:

```txt
src/navigation/tabItems.js
```

Bottom navigation uses lucide-react-native icons.

## Development

Install dependencies:

```sh
npm install
```

Start Expo manually:

```sh
npm start
```

Useful validation command:

```sh
npx expo export --platform ios --output-dir /private/tmp/spliteasy-ios-export
```

## Engineering Notes

- This project uses JavaScript/JSX, not TypeScript.
- Mock data is colocated under each feature's `data/` folder.
- UI components are colocated under each feature's `components/` folder.
- Shared UI primitives belong in `src/design-system/components`.
- Do not add business logic to screen components.
- Do not hardcode design values when a design-system token exists.
- Keep future auth, API, persistence, OCR, and notification work behind clear service/data layers.
