import {
  FlatList,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Photo } from "../models/photosResponse";

interface Props {
  photos: Photo[];
}

const PhotosListView = ({ photos }: Props) => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View>
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={{
              ...styles.photoImage,
              height: windowWidth / 3,
              width: windowWidth / 3,
            }}
          />
        )}
        numColumns={3}
      />
    </View>
  );
};

export default PhotosListView;

const styles = StyleSheet.create({
  photoImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
  },
});
