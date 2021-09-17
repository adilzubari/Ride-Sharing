// import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  FlatList,
  Touchable,
} from "react-native";
import Constants from "expo-constants";
import { Avatar, Divider } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../assets/styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function index(props) {
  const history = [
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "Street 6, Gulbahar",
      destination: "Kahuta Road",
      month: "Aug",
      date: 24,
      time: "9:45 PM",
      fare: 320,
    },
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "Street 6, Gulbahar",
      destination: "Kahuta Road",
      month: "Aug",
      date: 24,
      time: "9:45 PM",
      fare: 320,
    },
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "Street 6, Gulbahar",
      destination: "Kahuta Road",
      month: "Aug",
      date: 24,
      time: "9:45 PM",
      fare: 320,
    },
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "Street 6, Gulbahar",
      destination: "Kahuta Road",
      month: "Aug",
      date: 24,
      time: "9:45 PM",
      fare: 320,
    },
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "Street 6, Gulbahar",
      destination: "Kahuta Road",
      month: "Aug",
      date: 24,
      time: "9:45 PM",
      fare: 320,
    },
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "Street 6, Gulbahar",
      destination: "Kahuta Road",
      month: "Aug",
      date: 24,
      time: "9:45 PM",
      fare: 320,
    },
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "Street 6, Gulbahar",
      destination: "Kahuta Road",
      month: "Aug",
      date: 24,
      time: "9:45 PM",
      fare: 320,
    },
    {
      id: "HAKJSDHKJAFAKLHSFLKA",
      source: "Street 6, Gulbahar",
      destination: "Kahuta Road",
      month: "Aug",
      date: 24,
      time: "9:45 PM",
      fare: 320,
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
            History
          </Text>
        </View>

        <ScrollView>
          {/* History List */}
          <View>
            <FlatList
              data={history}
              renderItem={({ item, index }) => (
                <HistoryPacket ride={item} index={index} />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function HistoryPacket({ ride, index }) {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      {(() => {
        if (index != 0) return <Divider />;
      })()}
      <View
        style={{
          marginVertical: 15,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "5%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "rgb(50,50,50)",
            }}
          >
            {ride.month} {ride.date}, {ride.time}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "rgb(50,50,50)",
            }}
          >
            PKR {ride.fare}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            {/* Timeline */}
            <View
              style={{
                alignItems: "center",
                width: 30,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: colors.primary.lighter,
                  backgroundColor: "white",
                }}
              ></View>
              <View
                style={{
                  width: 5,
                  height: 10,
                  // borderRadius: 20,
                  // borderWidth: 2,
                  // borderColor: colors.primary.lighter,
                  backgroundColor: colors.primary.lighter,
                  marginVertical: 2,
                }}
              ></View>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: colors.primary.lighter,
                  backgroundColor: "white",
                }}
              ></View>
            </View>
          </View>

          {/* Timeline Content */}
          <View
            style={
              {
                // paddingTop: 10,
              }
            }
          >
            <Text
              style={{
                fontSize: 14,
                color: "rgb(100,100,100)",
              }}
            >
              {ride.source}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "rgb(100,100,100)",
              }}
            >
              {ride.destination}
            </Text>
          </View>
        </View>
      </View>

      {(() => {
        if (index != 0) return <Divider />;
      })()}
    </TouchableOpacity>
  );
}
