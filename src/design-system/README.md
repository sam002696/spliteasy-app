# SplitEasy Design System

This folder is the reusable UI foundation for future app screens. It intentionally contains no business logic, API calls, navigation flows, or screen implementations.

## Structure

- `theme/tokens.js`: raw design tokens from the v2 document, including color, typography, spacing, radius, motion, and size scales.
- `theme/theme.js`: semantic light and dark themes built from the raw tokens.
- `theme/ThemeProvider.js`: React context provider and `useTheme` hook.
- `components/`: reusable primitives for layout, text, actions, forms, cards, indicators, and selection controls.
- `index.js`: public export surface for app code.

## Usage

Wrap the app once:

```jsx
import { ThemeProvider } from "./src/design-system";

export default function App() {
  return <ThemeProvider>{/* app */}</ThemeProvider>;
}
```

Compose screens from primitives:

```jsx
import { Box, Button, Card, Text } from "../src/design-system";

function Example() {
  return (
    <Box flex={1} backgroundColor="background" p={4}>
      <Card variant="limeHero">
        <Text variant="micro" color="accentText" uppercase>
          Total balance
        </Text>
        <Text variant="heroAmount" color="accentText">
          ৳ 2,400
        </Text>
      </Card>
      <Button title="Save expense" fullWidth />
    </Box>
  );
}
```

Use semantic color names (`background`, `text`, `accent`, `danger`) before raw palette names. Keep screen edge padding at `space[4]` / `16`.
