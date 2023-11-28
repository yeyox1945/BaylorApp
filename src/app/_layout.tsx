import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Users",
          }}
        />
        <Stack.Screen name="album/index" />
      </Stack>
    </Provider>
  );
}
