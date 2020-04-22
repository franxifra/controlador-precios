import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  AppState,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import PickerProvincia from "../components/pickerProvincia";

const ComprobarPermiso = () => {
  const [permisoPosicion, setPermisoPosicion] = useState(false);
  const [tiempoCarga, setTiempoCarga] = useState(false);

  (async () => {
    const status = await Permissions.getAsync(Permissions.LOCATION);
    setPermisoPosicion(status.status);
    console.log(status.status);
  })().catch((err) => {
    console.error(err);
  });
  setTimeout(() => {
    setTiempoCarga(true);
  }, 3000);

  return (
    tiempoCarga &&
    permisoPosicion === "denied" && (
      <>
        <PickerProvincia />
      </>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0d47a1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icono: {
    fontSize: 300,
    color: "white",
  },
  titulo: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default ComprobarPermiso;
