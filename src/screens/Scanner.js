import React, { useContext } from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import CoordenadasContext from "../context/CoordenadasContext";
import { useIsFocused } from "@react-navigation/native";
import { texto, container } from "../styles/constantStyles";
import ScannerCall from "../components/ScannerCall";
import CallAutocompleteGoogle from "../components/CallAutocompleteGoogle";

const Scanner = () => {
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );
  const isFocused = useIsFocused();

  if (dataCoordenadas != "") {
    return (
      <>
        <SafeAreaView style={container.primario}>
          <Text style={texto.titulo}>
            Escanea el codigo de barras del producto
          </Text>
        </SafeAreaView>
        {isFocused && <ScannerCall />}
      </>
    );
  } else {
    return (
      <SafeAreaView style={container.primario}>
        <Text style={texto.titulo}>
          Selecciona tu dirección antes de continuar
        </Text>
        <CallAutocompleteGoogle />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({});
export default Scanner;
