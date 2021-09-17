import axios from "../../../axios.js";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Dimensions, BackHandler } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../../../assets/styles/colors";
import * as Location from "expo-location";
import Constants from "expo-constants";
// icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider, useStateValue } from "../../../StateProvider";
import reducer, { initialState } from "../../../reducer";

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

let DestinationMarked = {};
let Coords = {};

export default function index(props) {
  const [state, dispatch] = useStateValue();
  const [CoordsState, setCoordsState] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [RideRequested, setRideRequested] = useState(false);

  const ref = useRef();

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
    })();
  }, []);

  const StartRide = async () => {
    setRideRequested(true);
    try {
      console.log("entererd");
      const Ride = await axios.post("/driver/ride/create", {
        Destination: DestinationMarked,
        Driver_id: await AsyncStorage.getItem("@User_id"),
      });
      console.log(Ride.data);
      // return;

      // Store User id to keep him logged in
      await AsyncStorage.setItem("@Ride", JSON.stringify(Ride.data));

      // Make user Logged In
      // console.log(state.Ride);
      dispatch({ type: "SET_RIDE", Ride: Ride.data });

      props.navigation.navigate("RideInProgress");
      // console.log(state.Ride);
    } catch (e) {
      console.log(e);
      setRideRequested(false);
    } finally {
      setRideRequested(false);
    }
    setRideRequested(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={CoordsState}
          onRegionChange={(coords) => RegionChange(coords)}
          // onResponderEnd={() => console.log("end")}
          onTouchEnd={async () => {
            const d = await Location.reverseGeocodeAsync(Coords);
            DestinationMarked = { ...d[0], Coords };
            ref.current?.setAddressText(
              DestinationMarked == {}
                ? "Destination"
                : isnum(DestinationMarked.name)
                ? DestinationMarked.street
                : DestinationMarked.name
            );
            console.log(DestinationMarked);
          }}
          // onRegionChangeComplete={(coords) => setCoordsState(coords)}
        >
          {/* <MapViewDirections
            origin={Route[0]}
            destination={Route[1]}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor={colors.primary.lighter}
          /> */}
          {/* <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            image={{
              uri: "https://image.flaticon.com/icons/png/512/149/149059.png",
            }}
          />*/}
        </MapView>

        <View
          style={{
            // backgroundColor: "red",
            position: "absolute",
            zIndex: 15,
            top: 0,
            width: 20,
            height: "100%",
            left: 0,
          }}
        ></View>

        <View
          style={{
            // backgroundColor: "white",
            position: "absolute",
            zIndex: 15,
            top: Dimensions.get("window").height / 2 - 24,
          }}
        >
          <Ionicons name="md-pin" size={24} color={colors.primary.lighter} />
        </View>

        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            zIndex: 18,
            top: Constants.statusBarHeight + 10,
            width: "90%",
            // paddingVertical: 10,
            paddingTop: 5,
            paddingHorizontal: 10,
            flexDirection: "row",
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Destination"
            ref={ref}
            onPress={async (data, details = null) => {
              // 'details' is provided when fetchDetails = true
              const GeoCodeLocation = (
                await Location.geocodeAsync(data.description)
              )[0];
              // console.log(GeoCodeLocation);
              // return;

              const d = await Location.reverseGeocodeAsync({
                latitude: GeoCodeLocation.latitude,
                longitude: GeoCodeLocation.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
              DestinationMarked = {
                ...d[0],
                Coords: {
                  latitude: GeoCodeLocation.latitude,
                  longitude: GeoCodeLocation.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                },
              };
              setCoordsState({
                ...GeoCodeLocation,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
              console.log(DestinationMarked);
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
          />
        </View>

        <View
          style={{
            zIndex: 17,
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            height: SearchBarFocused ? "100%" : "0%",
          }}
        ></View>

        <Button
          style={{
            zIndex: 16,
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            // height: "0%",
            backgroundColor: colors.primary.lighter,
            width: 150,
            borderRadius: 50,
            right: 15,
            bottom: 20,
          }}
          mode="contained"
          dark={true}
          onPress={() => StartRide()}
          disabled={RideRequested}
        >
          <Text
            style={{
              fontSize: 14,
            }}
          >
            Let's Ride
            <MaterialIcons
              name="keyboard-arrow-right"
              size={10}
              color="white"
            />
          </Text>
        </Button>

        <View
          style={{
            zIndex: 10,
            position: "absolute",
            backgroundColor: "red",
            flex: 1,
          }}
        ></View>
      </View>
    </View>
  );
}
