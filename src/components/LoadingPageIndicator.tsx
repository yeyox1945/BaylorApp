import { ActivityIndicator, View } from "react-native";

const LoadingPageIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingPageIndicator;
