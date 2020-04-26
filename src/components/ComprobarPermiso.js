import React, { useState, useContext } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import * as Permissions from "expo-permissions";

import CoordenadasContext from "../context/CoordenadasContext";
import { texto } from "../styles/constantStyles";

const ComprobarPermiso = ({ cambioParent }) => {
  const [permisoPosicion, setPermisoPosicion] = useState("");
  const [tiempoCarga, setTiempoCarga] = useState(false);
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );
  (async () => {
    const status = await Permissions.getAsync(Permissions.LOCATION);
    setPermisoPosicion(
      status.status === "denied"
        ? "mostrar"
        : status.status === "undetermined"
        ? "mostrar"
        : status.status
    );
    console.log(status.status);
  })().catch((err) => {
    console.log(err);
  });

  return (
    permisoPosicion === "mostrar" &&
    !dataCoordenadas && (
      <>
        <TouchableOpacity onPress={() => cambioParent(true)}>
          <Text style={texto.parrafo}>
            Selecciona tu direccion para comenzar
          </Text>
          <TextInput
            style={{
              backgroundColor: "white",
              padding: 20,
              marginHorizontal: 25,
            }}
            placeholder="Busca tu direccion"
            pointerEvents="none"
          />
        </TouchableOpacity>
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
