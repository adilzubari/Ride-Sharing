// import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StatusBar, ScrollView, Text, FlatList } from "react-native";
import Constants from "expo-constants";
import { Avatar, Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../assets/styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider, useStateValue } from "../../../StateProvider";
import reducer, { initialState } from "../../../reducer";

export default function index(props) {
  const [{ Auth, UserType, UserProfile }, dispatch] = useStateValue();

  const Settings = [
    {
      title: "Phone Number",
      value: UserProfile.Mobile,
    },
    {
      title: "Email",
      value: UserProfile.Email,
    },
    {
      title: "Country",
      value: "Mauritius",
    },
    {
      title: "Account Type",
      value: UserType.charAt(0).toUpperCase() + UserType.substr(1),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ScrollView
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
            Settings
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
            marginLeft: "10%",
            marginBottom: 50,
            marginTop: 10,
          }}
        >
          <Avatar.Icon
            size={60}
            icon={() => (
              <Entypo name="user" size={20} color="rgb(240,240,240)" />
            )}
          />
          <SettingsPacket title={"Name"} value={"Muhammad Adil"} dense={true} />
        </View>

        {/* Settings */}
        <View>
          <FlatList
            data={Settings}
            renderItem={({ item, index }) => (
              <View
                style={{
                  marginHorizontal: "5%",
                  marginBottom: 25,
                }}
              >
                <SettingsPacket
                  title={item.title}
                  value={item.value}
                  dense={false}
                />
              </View>
            )}
          />
        </View>

        <Button
          mode="outlined"
          style={{
            width: "50%",
            alignSelf: "center",
            borderColor: colors.primary.lighter,
          }}
          onPress={async () => {
            await AsyncStorage.setItem("@User_id", "null");
            dispatch({ type: "TOGGLE_AUTH" });
          }}
        >
          Logout
        </Button>
      </ScrollView>
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
