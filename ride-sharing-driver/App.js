import React, { useState, useEffect } from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Navigations
import ParentNavigation from "./navigation/parent-navigation";
import AuthNavigation from "./navigation/auth-navigation";
import RiderNavigation from "./navigation/rider";
import DriverNavigation from "./navigation/driver";
// ====
import IntroSlider from "./components/intro-slider";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { colors } from "./assets/styles/colors";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider, useStateValue } from "./StateProvider";
import reducer, { initialState } from "./reducer";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    accent: "#03dac4",
    backdrop: "rgba(0, 0, 0, 0.5)",
    background: "#fff",
    disabled: "rgba(0,0,0,.1)",
    error: "#B00020",
    notification: "#f50057",
    onSurface: "#000000",
    placeholder: "rgba(0, 0, 0, 0.3)",
    primary: colors.primary.lighter,
    surface: "#ffffff",
    text: "rgb(100,100,100)",
  },
};

// const Auth = false;

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppBody />
    </StateProvider>
  );
}

function AppBody() {
  const [AppIsReady, setAppIsReady] = useState(false);
  const [FirstTimeAppOpening, setFirstTimeAppOpening] = useState(false);

  const [{ Auth, UserType }, dispatch] = useStateValue();

  useEffect(() => {
    let isMounted = true;
    async function prepare() {
      try {
        if (!AppIsReady) {
          // Keep the splash screen visible while we fetch resources
          await SplashScreen.preventAutoHideAsync();

          const FirstTimeAppOpening = await AsyncStorage.getItem(
            "@FirstTimeAppOpening"
          );
          if (FirstTimeAppOpening == null && FirstTimeAppOpening != "no") {
            await AsyncStorage.setItem("@FirstTimeAppOpening", "no");
            await AsyncStorage.setItem("@User_id", "null");
            await AsyncStorage.setItem("@User_type", "");
            await AsyncStorage.setItem("@User_profile", "");
            await AsyncStorage.setItem("@Ride", "");
            setFirstTimeAppOpening(true);
          } else if ((await AsyncStorage.getItem("@User_id")) != "null") {
            // Auth if user logged in previously
            dispatch({
              type: "SET_USER_PROFILE",
              UserProfile: JSON.parse(
                await AsyncStorage.getItem("@User_profile")
              ),
            });
            dispatch({
              type: "SET_USER_TYPE",
              UserType: await AsyncStorage.getItem("@User_type"),
            });
            dispatch({ type: "TOGGLE_AUTH" });
          }
        }
      } catch (e) {
        // console.warn("error =>", e);
        await AsyncStorage.setItem("@FirstTimeAppOpening", "no");
        setFirstTimeAppOpening(true);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    if (isMounted) prepare();

    return () => { isMounted = false };
  }, []);

  return (
    <PaperProvider theme={theme}>
      {(() => {
        if (FirstTimeAppOpening)
          return (
            <IntroSlider
              setFirstTimeAppOpening={(props) => setFirstTimeAppOpening(props)}
            />
          );
        else if (!Auth) return <AuthNavigation />;
        else if (Auth) {
          if (UserType == "rider") return <RiderNavigation />;
          else if (UserType == "driver") return <DriverNavigation />;
        }
      })()}
    </PaperProvider>
  );
}
