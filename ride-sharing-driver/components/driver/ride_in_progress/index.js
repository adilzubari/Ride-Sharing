import axios from "../../../axios.js";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  BackHandler,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../../../assets/styles/colors";
import * as Location from "expo-location";
import Constants from "expo-constants";
// icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function index(props) {
  const z = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.02,
    longitudeDelta: 0.015,
  };
  const [RideLocation, setRideLocation] = useState(z);
  const [Destination, setDestination] = useState(z);
  const [Region, setRegion] = useState(z);

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
    })();
  }, []);

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
          {/* <MapViewDirections
            origin={Route[0]}
            destination={Route[1]}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor={colors.primary.lighter}
          /> */}
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
      </View>
    </View>
  );
}
