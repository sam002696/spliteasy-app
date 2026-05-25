import { useLocalSearchParams } from "expo-router";
import { AddExpenseScreen } from "../../src/screens/add-expense";

export default function AddExpenseRoute() {
  const { groupId } = useLocalSearchParams();

  return <AddExpenseScreen groupId={groupId} />;
}
