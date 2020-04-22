import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
} from "react-native";
import ProvinciaContext from "../context/ProvinciaContext";
import { useIsFocused } from "@react-navigation/native";
import { colores, texto, container } from "../styles/constantStyles";
import PickerProvincia from "../components/pickerProvincia";
import ScannerCall from "../components/ScannerCall";

const Scanner = () => {
  const { dataProvincia, cambiarProvincia } = useContext(ProvinciaContext);
  const isFocused = useIsFocused();
  const [provincia, setProvincia] = useState("");
  const [loading, setLoading] = useState(true);

  // setear provincia nueva desde picker
  function nuevaProvincia(newValue) {
    setProvincia(newValue);
  }

  useEffect(() => {
    let Hola = async () => {
      try {
        const getProvincia = await AsyncStorage.getItem("provincia");
        setProvincia(getProvincia);
        console.log(provincia);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    Hola();
  });

  console.log(provincia);
  if (dataProvincia != "" && !loading) {
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
      <>
        <SafeAreaView style={styles.container}>
          <Text style={texto.titulo}>
            selecciona tu provincia para utilizar el scanner
          </Text>
          <PickerProvincia
            provinciaScanner={provincia}
            onChange={nuevaProvincia}
          />
        </SafeAreaView>
      </>
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
