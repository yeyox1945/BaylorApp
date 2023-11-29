import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetUsersQuery } from "../redux/services/userApi";
import UserTile from "../components/UserTile";
import LoadingPageIndicator from "../components/LoadingPageIndicator";

export default function App() {
  const { data: users, isLoading, isFetching, error } = useGetUsersQuery(null);

  if (isLoading || isFetching) return <LoadingPageIndicator />;

  if (error) return <Text> Couldn't get users from server </Text>;

  return (
    <SafeAreaView>
      <View style={styles.pageContainer}>
        <FlatList
          data={users}
          renderItem={({ item }) => <UserTile user={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={styles.userListContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: 10,
  },
  userListContainer: {
    paddingVertical: 10,
  },
});
