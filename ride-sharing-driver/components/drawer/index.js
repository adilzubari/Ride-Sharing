import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { StateProvider, useStateValue } from "../../StateProvider";
import reducer, { initialState } from "../../reducer";
// icons
import { Entypo } from "@expo/vector-icons";

export default function index(props) {
  const [{ UserProfile }, dispatch] = useStateValue();

  console.log(UserProfile);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 20,
          paddingVertical: 30,
        }}
      >
        <Avatar.Icon
          size={50}
          icon={() => <Entypo name="user" size={20} color="rgb(240,240,240)" />}
        />
        <View>
          <Text
            style={{
              color: "rgb(150,150,150)",
              marginLeft: 10,
              fontSize: 16,
            }}
          >
            {UserProfile.Name}
          </Text>
          <Text
            style={{
              color: "rgb(150,150,150)",
              marginLeft: 10,
              fontSize: 10,
            }}
          >
            {props.ProfileType} Profile
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
