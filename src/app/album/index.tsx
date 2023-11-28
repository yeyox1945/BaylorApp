import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useGetAllPhotosQuery,
  useGetPhotosByAlbumIdQuery,
} from "../../redux/services/userApi";
import LoadingPageIndicator from "../../components/LoadingPageIndicator";
import { normalizeText } from "../../utils/TextFormatters";

const AlbumPage = () => {
  // hooks
  const { albumId, name } = useLocalSearchParams();
  const { width: windowWidth } = useWindowDimensions();

  const {
    data: photos,
    isLoading: albumLoading,
    isFetching: albumFetching,
    error: albumError,
  } = useGetPhotosByAlbumIdQuery(parseInt(albumId as string));

  const {
    data: allPhotos,
    isLoading: allLoading,
    isFetching: allFetching,
    error: allError,
  } = useGetAllPhotosQuery(null);

  // states
  const [showAll, setShowAll] = useState(false);

  // actions
  const toggleShowAllPhotos = () => setShowAll(!showAll);

  if (albumLoading || albumFetching) return <LoadingPageIndicator />;

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: !showAll ? normalizeText(name as string) : "All photos",
          headerRight: () => (
            <TouchableOpacity onPress={toggleShowAllPhotos} activeOpacity={0.5}>
              <Ionicons
                name={showAll ? "star" : "star-outline"}
                size={20}
                color="orange"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View>
        <FlatList
          data={!showAll ? photos : allPhotos}
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
    </SafeAreaView>
  );
};

export default AlbumPage;

const styles = StyleSheet.create({
  photoImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
  },
});
