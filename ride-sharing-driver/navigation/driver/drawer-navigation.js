import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../../assets/styles/colors";

import CustomDrawer from "../../components/drawer";

import Ride from "../../components/driver/ride";
import Settings from "../../components/driver/settings";
import History from "../../components/driver/history";
import Payments from "../../components/driver/payments";

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
        <CustomDrawer {...props} ProfileType={"Driver"} />
      )}
    >
      <Drawer.Screen name="Ride" component={Ride} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Payments" component={Payments} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}
