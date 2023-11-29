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
import { useAppSelector } from "../redux/hooks";

interface Props {
  user: User;
}

const UserTile = ({ user }: Props) => {
  const {
    data: albums,
    // isLoading,
    // isFetching,
    error,
  } = useGetAlbumsByUserIdQuery(user.id);

  const { deletedAlbums } = useAppSelector((state) => state.deletedAlbums);

  if (error) return <Text> Couldn't get albums from user {user.name} </Text>;

  return (
    <View style={styles.userContainer}>
      <Text style={styles.userText}>{user.name} </Text>
      <Text style={{ color: "orange" }}>{user.username} </Text>

      <FlatList
        data={albums?.filter((album) => !deletedAlbums.includes(album.id))}
        renderItem={({ item }) => <AlbumTile album={item} />}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "#edebeb" }} />
        )}
        style={styles.albumListContainer}
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
