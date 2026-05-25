import { Tabs } from "expo-router";
import { BottomTabBar, tabItems } from "../../src/navigation";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.label,
          }}
        />
      ))}
    </Tabs>
  );
}
