import { useLocalSearchParams } from "expo-router";
import { GroupDetailScreen } from "../../src/screens/group-detail";

export default function GroupDetailRoute() {
  const { groupId } = useLocalSearchParams();

  return <GroupDetailScreen groupId={groupId} />;
}
