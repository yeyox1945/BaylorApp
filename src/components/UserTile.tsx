import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { User } from "../models/usersResponse";
import { useGetAlbumsByUserIdQuery } from "../redux/services/userApi";
import AlbumTile from "./AlbumTile";

interface Props {
  user: User;
}

const UserTile = ({ user }: Props) => {
  const {
    data: albums,
    isLoading,
    isFetching,
    error,
  } = useGetAlbumsByUserIdQuery(user.id);

  if (isLoading || isFetching)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );

  if (error) return <Text> Couldn't get albums from user {user.name} </Text>;

  return (
    <View style={styles.userContainer}>
      <Text style={styles.userText}>{user.name} </Text>

      <FlatList
        style={styles.albumListContainer}
        data={albums}
        renderItem={({ item }) => <AlbumTile album={item} />}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: "gray"}}
          />
        )}
      />
    </View>
  );
};

export default UserTile;

const styles = StyleSheet.create({
  userContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  albumListContainer: {
    marginTop: 5,
  },
  userText: {
    fontSize: 25,
  },
});