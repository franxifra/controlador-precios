import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
  Linking,
  View,
} from "react-native";
import axios from "axios";
import CoordenadasContext from "../context/CoordenadasContext";

import { container, iconos, texto } from "../styles/constantStyles";
import GetLocation from "../components/GetLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ComprobarPermiso from "../components/ComprobarPermiso";
import CreditosDesarrollador from "../components/DesarrolladoPor";
import BotonesProducto from "../components/BotonesProducto";
import LogoTitulo from "../components/LogoTitulo";
import CallAutocompleteGoogle from "../components/CallAutocompleteGoogle";

const HomeScreen = () => {
  const [activarAutocomplete, setActivarAutocomplete] = useState(false);
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );
  console.log(dataCoordenadas);

  const cambioParents = (set) => {
    setActivarAutocomplete(set);
  };

  return (
    <SafeAreaView style={container.primario}>
      {dataCoordenadas === "cambio" ? (
        <>
          <Text style={texto.titulo}>Selecciona tu direccion o localidad</Text>
          <Text style={texto.parrafo}>
            Mientras más precisa sea tu direccion más precisos seran los
            resultados
          </Text>
          <CallAutocompleteGoogle cambioParent={cambioParents} />
        </>
      ) : !activarAutocomplete ? (
        <View
          style={[
            { justifyContent: "space-between", flex: 1, marginVertical: 30 },
          ]}
        >
          <View>
            <LogoTitulo />
          </View>
          <View>
            <ComprobarPermiso cambioParent={cambioParents} />
            <GetLocation />
            <BotonesProducto home />
          </View>
          <CreditosDesarrollador />
        </View>
      ) : (
        <>
          <Text style={texto.titulo}>Selecciona tu direccion o localidad</Text>
          <Text style={texto.parrafo}>
            Mientras más precisa sea tu direccion más precisos seran los
            resultados
          </Text>
          <CallAutocompleteGoogle cambioParent={cambioParents} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
  icono: {
    fontSize: 250,
    color: "white",
  },
});

export default HomeScreen;
