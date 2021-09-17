// import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StatusBar, ScrollView, Text, FlatList } from "react-native";
import Constants from "expo-constants";
import { Avatar } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../assets/styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function index(props) {
  const Settings = [
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "asd",
      destination: "asdasd",
    },
  ];
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          // backgroundColor: "red",
          flex: 1,
          marginTop: Constants.statusBarHeight,
        }}
      >
        {/* header */}
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.openDrawer()}
          >
            <Avatar.Icon
              size={40}
              icon={() => <Entypo name="menu" size={24} color="white" />}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: colors.primary.lighter,
              paddingLeft: 20,
            }}
          >
            Payments
          </Text>
        </View>

        {/* Body */}
        <View>
          <Text
            style={{
              fontSize: 20,
              color: "rgb(100,100,100)",
              paddingLeft: 20,
              marginTop: 50,
            }}
          >
            Payment Types
          </Text>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: "5%",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Avatar.Icon
              size={40}
              icon={() => (
                <MaterialCommunityIcons name="cash" size={24} color="white" />
              )}
            />
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 10,
                color: "rgb(50,50,50)",
              }}
            >
              Cash
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function SettingsPacket({ title, value, dense }) {
  return (
    <View>
      <Text
        style={{
          color: "rgb(150,150,150)",
          paddingLeft: 10,
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "rgb(100,100,100)",
          paddingLeft: 10,
          fontSize: 18,
          marginTop: dense ? 0 : 5,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
