import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { iconos } from "../styles/constantStyles";

import geolocation from "../api/GeoLocation";
import { texto } from "../styles/constantStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import axios from "axios";
import PickerProvincia from "../components/pickerProvincia";

const GeoLocationLlamar = ({ latitude, longitude }) => {
  const [municipio, setMunicipio] = useState("");
  const [provincia, setProvincia] = useState("");
  const [botonCambiar, setBotonCambiar] = useState(false);

  useEffect(() => {
    latitude &&
      longitude &&
      axios
        .get(
          `https://apis.datos.gob.ar/georef/api/ubicacion?lat=${latitude}&lon=${longitude}`
        )
        .then(function (response) {
          setMunicipio(response.data.ubicacion.municipio.nombre);
          setProvincia(response.data.ubicacion.provincia.nombre);
        })
        .catch(function (error) {
          // handle error
          console.log("Error llamando provincia " + error);
        });
  }, [latitude, longitude]);

  AsyncStorage.setItem("municipio", municipio);
  AsyncStorage.setItem("provincia", provincia);

  return !botonCambiar ? (
    provincia === "" ? (
      latitude && (
        <>
          <Text style={texto.parrafo}>Cargando ubicación desde GPS...</Text>
          <TouchableOpacity
            onPress={() => {
              setBotonCambiar(true);
            }}
          >
            <Text style={styles.botonCambiar}>
              Elegi la ubicación manualmente
            </Text>
          </TouchableOpacity>
        </>
      )
    ) : (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="compass" style={iconos.principal} />

          <View>
            <Text style={[texto.parrafo, styles.bold, { textAlign: "left" }]}>
              {municipio}
            </Text>
            <Text style={[texto.parrafo, { textAlign: "left" }]}>
              Provincia de
            </Text>
            <Text style={[texto.parrafo, styles.bold, { textAlign: "left" }]}>
              {provincia}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setBotonCambiar(true);
              }}
            >
              <Text
                style={[
                  texto.parrafo,
                  { textAlign: "left", textDecorationLine: "underline" },
                ]}
              >
                Cambiar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  ) : (
    <>
      <Text style={styles.texto}>Estas en provincia de:</Text>
      <PickerProvincia />
    </>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  bold: {
    fontWeight: "bold",
  },
  botonCambiar: {
    textDecorationLine: "underline",
    textAlign: "center",
    color: "white",
    marginTop: 10,
  },
});

export default GeoLocationLlamar;
