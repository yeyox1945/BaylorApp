import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Album } from "../models/albumsResponse";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { normalizeText } from "../utils/TextFormatters";
import { useAppDispatch } from "../redux/hooks";
import { deleteAlbum } from "../redux/slices/deletedSlice";

interface Props {
  album: Album;
}

const AlbumTile = ({ album }: Props) => {
  const dispatch = useAppDispatch();

  const navigateToAlbum = () => {
    router.push({
      pathname: "album",
      params: {
        name: album.title,
        albumId: album.id,
      },
    });
  };

  const handleDeleteAlbum = (id: number) => {
    dispatch(deleteAlbum(id));
  };

  return (
    <View style={styles.albumContainer}>
      <TouchableOpacity
        onPress={navigateToAlbum}
        activeOpacity={0.5}
        style={styles.albumButton}
      >
        <Text style={styles.albumText}>{normalizeText(album.title)} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteAlbum(album.id)}
        activeOpacity={0.5}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-bin-outline" color={"red"} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default AlbumTile;

const styles = StyleSheet.create({
  albumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  albumButton: {
    flex: 1,
    paddingVertical: 8,
  },
  albumText: {
    maxWidth: "80%",
    fontSize: 15,
    paddingLeft: 5,
  },
  deleteButton: {
    padding: 15,
  },
});
