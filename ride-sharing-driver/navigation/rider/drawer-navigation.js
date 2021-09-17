import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../../assets/styles/colors";

import CustomDrawer from "../../components/drawer";

import Ride from "../../components/rider/ride";
import Settings from "../../components/rider/settings";
import History from "../../components/rider/history";
import Payments from "../../components/rider/payments";

import RidesStackNavigation from "./rides-stack-navigation";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="Ride"
      screenOptions={{
        drawerActiveBackgroundColor: "white",
        drawerActiveTintColor: colors.primary.lighter,
        drawerLabelStyle: {
          fontSize: 18,
          lineHeight: 20,
        },
        headerShown: false,
      }}
      drawerContent={(props) => (
        <CustomDrawer {...props} ProfileType={"Rider"} />
      )}
    >
      <Drawer.Screen name="RideNavigation" component={RidesStackNavigation} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Payments" component={Payments} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}
