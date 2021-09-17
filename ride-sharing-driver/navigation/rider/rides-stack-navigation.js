import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// pages
// import LogIn from "../components/login";
// import RiderRegistration from "../components/rider/registration";
// import DriverRegistration from "../components/driver/registration";
import Rides from "../../components/rider/ride/rides";
import Ride from "../../components/rider/ride";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ride"
        component={Ride}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Rides"
        component={Rides}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function RidesStackNavigation() {
  return <MyStack />;
}
