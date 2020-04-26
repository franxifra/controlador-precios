import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { iconos } from "../styles/constantStyles";

import { texto } from "../styles/constantStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CoordenadasContext from "../context/CoordenadasContext";
import ProvinciaContext from "../context/ProvinciaContext";
import DireccionContext from "../context/DireccionContext";

import axios from "axios";

const GeoLocationLlamar = ({ latitude, longitude }) => {
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );
  const { dataProvincia, cambiarProvincia } = useContext(ProvinciaContext);
  const { dataDireccion, cambiarDireccion } = useContext(DireccionContext);

  const [municipio, setMunicipio] = useState("");
  const [provincia, setProvincia] = useState("");

  useEffect(() => {
    dataCoordenadas.lat &&
      dataCoordenadas.lng &&
      axios
        .get(
          `https://apis.datos.gob.ar/georef/api/ubicacion?lat=${dataCoordenadas.lat}&lon=${dataCoordenadas.lng}`
        )
        .then(function (response) {
          response.data.ubicacion.municipio.nombre &&
            setMunicipio(response.data.ubicacion.municipio.nombre);
          response.data.ubicacion.provincia.nombre &&
            cambiarProvincia(response.data.ubicacion.provincia.nombre);
          setProvincia(response.data.ubicacion.provincia.nombre);
        })
        .catch(function (error) {
          // handle error
          console.log("Error llamando provincia " + error);
        });
  }, [dataCoordenadas.lat, dataCoordenadas.lng]);

  return dataCoordenadas.lat ? (
    dataCoordenadas.lng && (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <MaterialCommunityIcons
            name="compass"
            style={[iconos.principal, { flex: 1 }]}
          />

          <View style={{ flex: 2 }}>
            {dataDireccion != "" ? (
              <Text style={[texto.parrafo, { textAlign: "left" }]}>
                {dataDireccion}
              </Text>
            ) : (
              <Text style={[texto.parrafo, { textAlign: "left" }]}>
                tu posición GPS cerca de {municipio} provincia de {provincia}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                cambiarCoordenadas("cambio");
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
    <Text></Text>
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
