import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
} from "react-native";
import CoordenadasContext from "../context/CoordenadasContext";
import { useIsFocused } from "@react-navigation/native";
import { colores, texto, container } from "../styles/constantStyles";
import PickerProvincia from "../components/pickerProvincia";
import ScannerCall from "../components/ScannerCall";
import CallAutocompleteGoogle from "../components/CallAutocompleteGoogle";

const Scanner = () => {
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  if (dataCoordenadas != "") {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <Text style={texto.titulo}>
            Escanea el codigo de barras del producto
          </Text>
        </SafeAreaView>
        {isFocused && <ScannerCall />}
      </>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={texto.titulo}>
          Selecciona tu dirección antes de continuar
        </Text>
        <CallAutocompleteGoogle />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colores.colorFondo,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Scanner;
