import axios from "../axios.js";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Dimensions, BackHandler } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../assets/styles/colors";
import * as Location from "expo-location";
import Constants from "expo-constants";
// icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider, useStateValue } from "../StateProvider";
import reducer, { initialState } from "../reducer";

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
let Coords = {
  latitude: 33.605699,
  longitude: 73.116936,
  latitudeDelta: 0.02,
  longitudeDelta: 0.015,
};

const Route = [
  {
    latitude: 33.605699,
    longitude: 73.116936,
    latitudeDelta: 0.02,
    longitudeDelta: 0.015,
  },
  {
    latitude: 33.601624,
    longitude: 73.094534,
    latitudeDelta: 0.02,
    longitudeDelta: 0.015,
  },
];

export default function index(props) {
  const [state, dispatch] = useStateValue();
  const [CoordsState, setCoordsState] = useState({
    latitude: 33.605699,
    longitude: 73.116936,
    latitudeDelta: 0.1,
    longitudeDelta: 0.02,
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

  return (
    <View>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={CoordsState}
          onRegionChange={(coords) => RegionChange(coords)}
        >
          <MapViewDirections
            lineDashPattern={[0]}
            origin={Route[0]}
            destination={Route[1]}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={5}
            strokeColor={colors.primary.lighter}
          />
        </MapView>
      </View>
    </View>
  );
}
