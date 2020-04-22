import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  AppState,
} from "react-native";
import Constants from "expo-constants";

import * as Location from "expo-location";
import GeoLocationLlamar from "../hooks/llamarGeoLocation";
import * as Permissions from "expo-permissions";

export default function GetLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [permisoPosicion, setPermisoPosicion] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({
        // activar alta precision solo en Android
        enableHighAccuracy: Platform.OS != "ios" && true,
      });
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      AsyncStorage.setItem("latitud", JSON.stringify(location.coords.latitude));
      AsyncStorage.setItem(
        "longitud",
        JSON.stringify(location.coords.longitude)
      );
    })();
  }, []);

  return (
    <View>
      <GeoLocationLlamar latitude={latitude} longitude={longitude} />
    </View>
  );
}
