import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// pages
import LogIn from "../components/login";
import RiderRegistration from "../components/rider/registration";
import DriverRegistration from "../components/driver/registration";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RiderRegistration"
        component={RiderRegistration}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DriverRegistration"
        component={DriverRegistration}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
