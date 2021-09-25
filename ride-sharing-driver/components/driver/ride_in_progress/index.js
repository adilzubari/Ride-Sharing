import axios from "../../../axios.js";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  BackHandler,
  Image,
  Linking,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../../../assets/styles/colors";
import * as Location from "expo-location";
import Constants from "expo-constants";
// icons
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Avatar,
  Button,
  Subheading,
  Text as RNPText,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider, useStateValue } from "../../../StateProvider";
import reducer, { initialState } from "../../../reducer";
import { TouchableOpacity } from "react-native-gesture-handler";

let Amount = Math.floor(Math.random() * (20 - 10 + 1) + 10) * 3;

let AlphaAmountToPaid = 0.0,
  BetaAmountToPaid = 0.0;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

let RideRequestInterval = null;

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function GetCenterCoords(lat1, lng1, lat2, lng2) {
  return {
    latitude: (lat1 + lat2) / 2,
    longitude: (lng1 + lng2) / 2,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
}

let Ride = null;

// const Route = [
//   {
//     latitude: 33.605699,
//     longitude: 73.116936,
//     latitudeDelta: 0.02,
//     longitudeDelta: 0.015,
//   },
//   {
//     latitude: 33.601624,
//     longitude: 73.094534,
//     latitudeDelta: 0.02,
//     longitudeDelta: 0.015,
//   },
// ];

let AllowedToGetRideShareRequest = true;
let PickUpLocationOfRequestRecieved = null;

export default function index(props) {
  const z = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.02,
    longitudeDelta: 0.015,
  };
  const [RideLocation, setRideLocation] = useState(null);
  const [Destination, setDestination] = useState(null);
  const [Region, setRegion] = useState(z);

  const [Completed, setCompleted] = useState(false);
  const [RideDirection, setRideDirection] = useState("Destination");
  const [ShowPayment, setShowPayment] = useState(false);

  const [RideShareRequest, setRideShareRequest] = useState(null);

  const [AlphaPickupLocation, setAlphaPickupLocation] = useState(null);
  const [BetaPickupLoation, setBetaPickupLoation] = useState(null);

  useEffect(() => {
    (async () => {
      // console.log("in");
      let CurrentLocation = await Location.getCurrentPositionAsync({});
      CurrentLocation = {
        latitude: CurrentLocation.coords.latitude,
        longitude: CurrentLocation.coords.longitude,
        latitudeDelta: z.latitudeDelta,
        longitudeDelta: z.longitudeDelta,
      };

      // console.log("=>", CurrentLocation.coords);
      setRideLocation(CurrentLocation);
      console.log("in");
      Ride = JSON.parse(await AsyncStorage.getItem("@Ride"));
      // console.log(Ride);
      // return;
      setDestination(Ride.Destination.Coords);
      // console.log("Destination", Ride.Destination.Coords);

      setTimeout(() => {
        const a = GetCenterCoords(
          CurrentLocation.latitude,
          CurrentLocation.longitude,
          Ride.Destination.Coords.latitude,
          Ride.Destination.Coords.longitude
        );
        setRegion(a);
        console.log(a);
      }, 1000);
    })();
  }, []);

  const [state, dispatch] = useStateValue();
  const [CoordsState, setCoordsState] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let Coords = {};
  let DestinationMarked = {};

  let isnum = (val) => /^\d+$/.test(val);

  const [SearchBarFocused, setSearchBarFocused] = useState(false);

  const GOOGLE_MAPS_API_KEY = "AIzaSyBNnwaIwBmoKmkGvsCk4F6xHlyqHybAi9M";

  const RegionChange = (coords) => {
    Coords = coords;
    // console.log(coords);
    // console.log(coords);
    // setCoords(coords);
  };

  BackHandler.addEventListener("hardwareBackPress", () => {
    // console.log("Pressed");
    if (SearchBarFocused) {
      setSearchBarFocused(false);
      return true;
    }
    return true;
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      RideRequestInterval = setInterval(() => {
        console.log("About to make Request to check any ride share request");
        if (Ride == null) return;
        console.log(1);
        if (Ride.Direction == "PickUp") return;
        console.log(2);
        if (RideShareRequest != null || typeof RideShareRequest == Object)
          return;
        console.log(3);
        if (Ride.Rider.Beta != "") return;
        console.log(4);
        if (!AllowedToGetRideShareRequest) return;
        console.log(5);
        (async () => {
          console.log("Geneerating request");
          try {
            AllowedToGetRideShareRequest = false;
            let a = await axios.post("/ride/get/request", {
              RIDE_ID: Ride._id,
            });
            if (a.data != "") {
              setRideShareRequest(a.data);
              AllowedToGetRideShareRequest = false;
              console.log("Data recieved form request", a.data);
              PickUpLocationOfRequestRecieved = a.data.coordinates;
            } else AllowedToGetRideShareRequest = true;
          } catch (e) {
            AllowedToGetRideShareRequest = true;
            console.log("Request failed", e);
            return;
          }
        })();
      }, 2000);
    })();
  }, []);

  // 33.603912, 73.097838

  const StartRide = async () => {
    setRideRequested(true);
    try {
      console.log("entererd");
      const Ride = await axios.post("/driver/ride/create", {
        Destination: {
          ...DestinationMarked,
        },
        Driver_id: await AsyncStorage.getItem("@User_id"),
      });
      console.log(Ride.data);
      // return;

      // Store User id to keep him logged in
      await AsyncStorage.setItem("@Ride", JSON.stringify(Ride.data));

      // Make user Logged In
      // console.log(state.Ride);
      dispatch({ type: "SET_RIDE", Ride: Ride.data });
      // console.log(state.Ride);
    } catch (e) {
      console.log(e);
      setRideRequested(false);
    }
  };

  function AcceptRideShareRequest() {
    // Sending request to accep the ride

    AllowedToGetRideShareRequest = false;
    // console.log(RideShareRequest);
    try {
      {
        (async () => {
          console.log("Accept Request made", {
            RIDE_ID: RideShareRequest.Ride,
            RIDER_ID: RideShareRequest.Rider,
          });
          let h = await axios.post("/ride/request/approve", {
            RIDE_ID: RideShareRequest.Ride,
            RIDER_ID: RideShareRequest.Rider,
          });
          // console.log("back");
          const RiderData = {
            ...h.data,
            PickUpLocation: PickUpLocationOfRequestRecieved,
          };
          console.log("Accept Request successfull", h.data);
          if (Ride.Rider.Alpha == "") Ride.Rider.Alpha = RiderData;
          else Ride.Rider.Beta = h.data;
          Ride.Direction = "PickUp";
          setRideDirection("PickUp");
          setRideShareRequest(null);
          // setTimeout(() => {
          //   AllowedToGetRideShareRequest = true;
          // }, 50000);
        })();
      }
    } catch (e) {
      console.log("Accept Request Failed", e);
    }
  }
  function RejectRideShareRequest() {
    setRideShareRequest(null);
    setTimeout(() => {
      AllowedToGetRideShareRequest = true;
    }, 5000);
  }

  async function RideAction() {
    // console.log(0);
    if (Ride.Rider.Alpha == "") {
      // console.log(1);
      axios.post("/ride/action/complete", {
        RIDE_ID: Ride._id,
      });
      clearInterval(RideRequestInterval);
      props.navigation.navigate("Drawer");
    } else if (RideDirection == "PickUp") {
      // clearInterval(RideRequestInterval);
      // console.log(2);
      Ride.Direction = "Destination";
      setRideDirection("Destination");
      console.log("Ride", Ride);
      AllowedToGetRideShareRequest = true;
    } else if (ShowPayment) {
      // clearInterval(RideRequestInterval);
      // console.log(3);
      props.navigation.navigate("Drawer");
      axios.post("/ride/action/complete", {
        RIDE_ID: Ride._id,
      });
      // setCompleted(true);
    } else {
      clearInterval(RideRequestInterval);
      setShowPayment(true);
    }
  }

  if (ShowPayment) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            width: "90%",
            // height: 100,
            // backgroundColor: "red",
            marginBottom: "10%",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "rgb(150,150,150)",
                  fontSize: 50,
                }}
              >
                {AlphaAmountToPaid}
              </Text>
              <Text
                style={{
                  color: "rgb(100,100,100)",
                  fontSize: 8,
                  letterSpacing: 2,
                }}
              >
                MUR
              </Text>
            </View>
            <Text
              style={{
                textAlign: "center",
                color: "rgb(150,150,150)",
                marginVertical: "10%",
              }}
            >
              Payable by {Ride.Rider.Alpha.Name}
            </Text>
          </View>

          {Ride.Rider.Beta != "" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "rgb(150,150,150)",
                    fontSize: 50,
                  }}
                >
                  {BetaAmountToPaid}
                </Text>
                <Text
                  style={{
                    color: "rgb(100,100,100)",
                    fontSize: 8,
                    letterSpacing: 2,
                  }}
                >
                  MUR
                </Text>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  color: "rgb(150,150,150)",
                  marginVertical: "10%",
                }}
              >
                Payable by {Ride.Rider.Beta.Name}
              </Text>
            </View>
          )}

          <Button
            mode="contained"
            dark={true}
            onPress={() => {
              setCompleted(true);
              RideAction();
            }}
          >
            Complete Ride
          </Button>
        </View>
      </View>
    );
  } else
    return (
      <View>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={Region}
            onRegionChange={(coords) => RegionChange(coords)}

            // onResponderEnd={() => console.log("end")}
            // onRegionChangeComplete={(coords) => setCoordsState(coords)}
          >
            {RideLocation && Destination && (
              <MapViewDirections
                lineDashPattern={[0]}
                origin={RideLocation}
                destination={
                  RideDirection == "Destination"
                    ? Destination
                    : Ride.Rider.Beta == ""
                    ? Ride.Rider.Alpha.PickUpLocation
                    : Ride.Rider.Beta.PickUpLocation
                }
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={5}
                strokeColor={colors.primary.lighter}
                onReady={(route) => {
                  if (RideDirection == "PickUp") return;
                  if (Ride.Rider.Alpha != "" && AlphaAmountToPaid == 0.0) {
                    // Calculating alpha amount payable
                    AlphaAmountToPaid = (route.distance * 3).toFixed(2);
                  } else if (Ride.Rider.Beta != "" && BetaAmountToPaid == 0.0) {
                    // Calculating beta amount payable
                    BetaAmountToPaid = (route.distance * 3).toFixed(2);
                  }
                }}
              />
            )}
            {RideLocation && (
              <Marker coordinate={RideLocation}>
                <View>
                  <Image
                    source={{
                      uri: "https://www.freeiconspng.com/uploads/white-modern-car-top-view-24.png",
                    }}
                    style={{
                      width: 40,
                      height: 20,
                    }}
                  />
                </View>
              </Marker>
            )}

            {Destination && (
              <Marker coordinate={Destination}>
                <View>
                  <Image
                    source={{
                      uri: "https://i.dlpng.com/static/png/7249252_preview.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  {/* <MaterialIcons
                name="place"
                size={40}
                color={colors.primary.lighter}
              /> */}
                </View>
              </Marker>
            )}
          </MapView>

          {/* <View
          style={{
            // backgroundColor: "red",
            position: "absolute",
            zIndex: 15,
            top: 0,
            width: 20,
            height: "100%",
            left: 0,
          }}
        ></View> */}

          <View
            style={{
              // backgroundColor: "red",
              position: "absolute",
              zIndex: 15,
              // top: 0,
              width: "90%",
              // height: "100%",
              // left: 0,
              padding: "5%",
              bottom: 50,
              backgroundColor: "white",
              right: "5%",
            }}
          >
            {(() => {
              if (RideShareRequest != null) {
                return (
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 3,
                      borderColor: colors.primary.lighter,
                      padding: "5%",
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.primary.lighter,
                        textAlign: "center",
                        fontSize: 20,
                        flexDirection: "column",
                      }}
                    >
                      Ride Request
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 20,
                        alignItems: "center",
                        justifyContent: "space-around",
                        // alignContent: "space-around",
                      }}
                    >
                      <Button
                        mode="contained"
                        dark={true}
                        onPress={() => AcceptRideShareRequest()}
                      >
                        Accept
                      </Button>
                      <Button
                        onPress={() => RejectRideShareRequest()}
                        mode="contained"
                        dark={true}
                        style={{
                          backgroundColor: "rgb(100,0,0)",
                        }}
                      >
                        Reject
                      </Button>
                    </View>
                  </View>
                );
              }
            })()}

            {(() => {
              if (Ride != null && Ride.Rider.Beta != "")
                return (
                  <View
                    style={{
                      // backgroundColor: "red",
                      // position: "absolute",
                      // zIndex: 15,
                      // bottom: 50,
                      // left: 0,
                      width: "100%",
                      // height: "100%",
                      // backgroundColor: "white",
                      // padding: "5%",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 20,
                    }}
                  >
                    <Avatar.Icon
                      icon={() => (
                        <Entypo name="user" size={20} color="white" />
                      )}
                      size={40}
                    />
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                      <Subheading>{Ride.Rider.Beta.Name}</Subheading>
                      <RNPText>{Ride.Rider.Beta.Mobile}</RNPText>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        // return;
                        Linking.openURL(`tel:${Ride.Rider.Beta.Mobile}`);
                      }}
                    >
                      <Entypo
                        name="phone"
                        size={24}
                        color={colors.primary.lighter}
                        style={{
                          padding: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
            })()}

            {(() => {
              if (Ride != null && Ride.Rider.Alpha != "")
                return (
                  <View
                    style={{
                      // backgroundColor: "red",
                      // position: "absolute",
                      // zIndex: 15,
                      // bottom: 50,
                      // left: 0,
                      width: "100%",
                      // height: "100%",
                      // backgroundColor: "white",
                      // padding: "5%",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 20,
                    }}
                  >
                    <Avatar.Icon
                      icon={() => (
                        <Entypo name="user" size={20} color="white" />
                      )}
                      size={40}
                    />
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                      <Subheading>{Ride.Rider.Alpha.Name}</Subheading>
                      <RNPText>{Ride.Rider.Alpha.Mobile}</RNPText>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        // return;
                        Linking.openURL(`tel:${Ride.Rider.Alpha.Mobile}`);
                      }}
                    >
                      <Entypo
                        name="phone"
                        size={24}
                        color={colors.primary.lighter}
                        style={{
                          padding: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
            })()}

            {(() => {
              if (Ride != null && Completed)
                return (
                  <View
                    style={{
                      // backgroundColor: "red",
                      // position: "absolute",
                      // zIndex: 15,
                      // bottom: 50,
                      // left: 0,
                      width: "100%",
                      // height: "100%",
                      // backgroundColor: "white",
                      // padding: "5%",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    MUR {Amount}
                  </View>
                );
            })()}

            <Button mode="contained" dark={true} onPress={() => RideAction()}>
              {Ride == null
                ? "Stop Ride"
                : Ride.Direction == "PickUp"
                ? "Rider is Seated"
                : Completed
                ? "Amount Recieved"
                : "Stop Ride"}
            </Button>
          </View>
        </View>
      </View>
    );
}
