import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as RootNavigation from "../../RootNavigation";
import { botones } from "../styles/constantStyles";
import * as WebBrowser from "expo-web-browser";

const BotonesProducto = ({ individual, noencontrado, home }) => {
  return (
    <>
      <TouchableOpacity
        style={botones.botonPrimario}
        onPress={() => RootNavigation.navigate("Scanner")}
      >
        <MaterialCommunityIcons
          name="barcode-scan"
          style={botones.botonIcono}
        />
        <Text style={botones.botonTexto}>
          Escanear {individual && "otro "}
          {noencontrado && "otro "}Producto
        </Text>
      </TouchableOpacity>
      {individual && (
        <TouchableOpacity
          style={botones.botonSecundario}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://preciosmaximos.argentina.gob.ar/#/avisos-consumidores"
            )
          }
        >
          <MaterialCommunityIcons
            name="alert-circle"
            style={botones.botonIcono}
          />
          <Text style={botones.botonTexto}>Denunciar precios abusivos</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  boton: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "red",
    marginTop: 10,
    justifyContent: "center",
  },
  botonIcono: {},
});

export default BotonesProducto;
