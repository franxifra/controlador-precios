import React, { useState, useEffect, useContext } from "react";
import { Platform, View, Text } from "react-native";
import CoordenadasContext from "../context/CoordenadasContext";
import SucursalesContext from "../context/SucursalesContext";

import * as Location from "expo-location";
import GeoLocationLlamar from "../hooks/llamarGeoLocation";
import axios from "axios";

export default function GetLocation() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );
  const { dataSucursales, cambiarSucursales } = useContext(SucursalesContext);
  console.log(dataSucursales);
  useEffect(() => {
    !dataCoordenadas.lat &&
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({
          // activar alta precision solo en Android
          enableHighAccuracy: Platform.OS != "ios" && true,
        });
        cambiarCoordenadas({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        // obtener el array sucursales
        axios
          .get(
            `https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=${location.coords.latitude}&lng=${location.coords.longitude}&limit=3000`
          )
          .then(function (response) {
            //filtrar y almacenar en context lista de sucursales cercanas
            cambiarSucursales(
              response.data.sucursales
                .filter((key) => key.id)
                .map((sucursal) => ({
                  id: sucursal.id,
                  distancia: sucursal.distanciaNumero,
                  distanciaDescripcion: sucursal.distanciaDescripcion,
                }))
            );
            console.log(
              response.data.sucursales
                .filter((key) => key.id)
                .map((sucursal) => ({
                  id: sucursal.id,
                  distancia: sucursal.distanciaNumero,
                  distanciaDescripcion: sucursal.distanciaDescripcion,
                }))
            );
          })
          .catch(function (error) {
            // handle error
            console.log("Error llamando lista de sucursales " + error);
          });
      })();
  }, []);

  return (
    <View>
      <GeoLocationLlamar />
    </View>
  );
}
