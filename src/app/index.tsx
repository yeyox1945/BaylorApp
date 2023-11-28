import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetUsersQuery } from "../redux/services/userApi";
import UserTile from "../components/UserTile";

export default function App() {
  const { data: users, isLoading, isFetching, error } = useGetUsersQuery(null);

  if (isLoading || isFetching)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );

  if (error) return <Text> Couldn't get users from server </Text>;

  return (
    <SafeAreaView>
      <View style={styles.pageContainer}>
        <FlatList
          data={users}
          renderItem={({ item }) => <UserTile user={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    padding: 10,
  },
});
