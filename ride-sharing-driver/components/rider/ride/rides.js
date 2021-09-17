import axios from "../../../axios";
import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../assets/styles/colors";
import { Avatar, Button, Text as RNPText } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider, useStateValue } from "../../../StateProvider";
import reducer, { initialState } from "../../../reducer";

export default function rides(props) {
  const [state, dispatch] = useStateValue();
  const [Rides, setRides] = useState([]);

  // const [AllowedToMakeRequest, setAllowedToMakeRequest] = useState(true);

  function Ride({ item, Destination }) {
    // const name = item.item.Destination.name;
    const [Requesting, setRequesting] = useState(false);

    let CheckCount = 0;
    let CheckCountLimit = 5;

    let request = false;

    console.log(item);
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: "5%",
          marginHorizontal: "5%",
          marginVertical: "5%",
          borderRadius: 2,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar.Icon
              size={40}
              icon={() => <Entypo name="user" size={20} color="white" />}
            />
            <View>
              <Text
                style={{
                  color: "rgb(100,100,100)",
                  marginLeft: 10,
                  fontSize: 14,
                }}
              >
                {item._id}
              </Text>
              <Text
                style={{
                  color: "rgb(150,150,150)",
                  marginLeft: 10,
                  fontSize: 10,
                }}
              >
                Shared
              </Text>
            </View>
          </View>

          <View>
            <View>
              <View
                style={{
                  backgroundColor: colors.primary.lighter,
                  width: 5,
                  height: 14,
                  borderRadius: 10,
                  marginLeft: 17,
                  marginTop: 5,
                }}
              ></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: colors.primary.lighter,
                  borderRadius: 10,
                  marginLeft: 15,
                }}
              ></View>
              <RNPText
                style={{
                  paddingHorizontal: "5%",
                  fontSize: 12,
                }}
                numberOfLines={1}
              >
                {/* Rawalpindi Institute of Cardiology, Punjab, Pakistan */}
                {item.Destination}
              </RNPText>
            </View>
          </View>
        </View>

        <Button
          mode="contained"
          dark={true}
          disabled={Requesting}
          onPress={() => RequestToShareRide(item._id)}
          style={{
            borderRadius: 100,
            width: 200,
            alignSelf: "center",
          }}
        >
          {Requesting ? "Requesting..." : "Request"}
        </Button>
      </View>
    );
    async function RequestToShareRide(RIDE_ID) {
      setRequesting(true);
      const RIDER_ID = await AsyncStorage.getItem("@User_id");
      console.log("Ride Request Send ...");
      // return;
      await axios.post("/ride/request", {
        RIDE_ID: RIDE_ID,
        RIDER_ID: RIDER_ID,
      });
      console.log("Ride Request Completed ...");
      request = true;
      setTimeout(() => CheckRequestStatus(RIDE_ID, RIDER_ID), 1000);
    }

    async function CheckRequestStatus(RIDE_ID, RIDER_ID) {
      if (!request) return;
      if (CheckCount >= CheckCountLimit) return;
      console.log("Ride Status Request Send ...");
      console.log({
        RIDE_ID: RIDE_ID,
        RIDER_ID: RIDER_ID,
      });
      let res = await axios.post("/ride/request/status", {
        RIDE_ID: RIDE_ID,
        RIDER_ID: RIDER_ID,
      });

      console.log(res.data, res.data == "" ? "Empty" : "Approved");
      if (res.data == true) {
        // Store User id to keep him logged in
        await AsyncStorage.setItem("@Ride", JSON.stringify(RIDE_ID));

        // Make user Logged In
        // console.log(state.Ride);
        // dispatch({ type: "SET_RIDE", Ride: Ride.data });
        props.navigation.navigate("RideInProgress");
      }
      // setRequesting(false);

      // return;
      if (++CheckCount != CheckCountLimit) {
        console.log(CheckCount, CheckCountLimit);
        setTimeout(() => CheckRequestStatus(RIDE_ID, RIDER_ID), 1000);
      } else {
        request = false;
        console.log("not accepted");
        ToastAndroid.show("Request rejected:(", ToastAndroid.SHORT);
        setRequesting(false);
      }
    }
  }

  useEffect(() => {
    (async () => {
      const l = JSON.parse(await AsyncStorage.getItem("DFRR"));
      // l = l;
      // console.log("props", l);
      // return;
      //   console.log(props);
      let RidesData = await axios.post("/rides/get", l);
      RidesData = RidesData.data;
      setRides(RidesData);
      // console.log(RidesData);
      console.log("Data recieved", RidesData[0], RidesData.length);
      AsyncStorage.removeItem("DFRR");
    })();
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header props={props} />
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={Rides}
          renderItem={(item, index) => <Ride item={item.item} />}
        />
      </ScrollView>
    </View>
  );
}

function Header(props) {
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          paddingVertical: "5%",
          alignContent: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => props.props.navigation.pop()}
        >
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={colors.primary.lighter}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.primary.lighter,
            fontSize: 16,
          }}
        >
          Rides
        </Text>
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color={colors.primary.lighter}
          style={{
            opacity: 0,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
