import React, { useContext } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CoordenadasContext from "../context/CoordenadasContext";
import DireccionContext from "../context/DireccionContext";
import ProvinciaContext from "../context/ProvinciaContext";
import SucursalesContext from "../context/SucursalesContext";

import axios from "axios";

const CallAutocompleteGoogle = ({ cambioParent }) => {
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );
  const { dataDireccion, cambiarDireccion } = useContext(DireccionContext);
  const { dataProvincia, cambiarProvincia } = useContext(ProvinciaContext);
  const { dataSucursales, cambiarSucursales } = useContext(SucursalesContext);

  return (
    <GooglePlacesAutocomplete
      placeholder="Buscar"
      minLength={2} // minimum length of text to search
      autoFocus={true}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={(row) => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        cambiarCoordenadas(details.geometry.location);
        cambiarDireccion(details.formatted_address);
        axios
          .get(
            `https://apis.datos.gob.ar/georef/api/ubicacion?lat=${details.geometry.location.lat}&lon=${details.geometry.location.lng}`
          )
          .then(function (response) {
            cambiarProvincia(response.data.ubicacion.provincia.nombre);
            cambioParent(false);
          });
        // obtener el array sucursales
        axios
          .get(
            `https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=${details.geometry.location.lat}&lng=${details.geometry.location.lng}&limit=3000`
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
      }}
      getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyA-xYa1KPHyhNbyypQAMBrf5lcITFHQe-M",
        language: "es", // language of the results,
        components: "country:ar",
      }}
      styles={{
        textInputContainer: {
          width: "100%",
        },
        description: {
          fontWeight: "bold",
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
    />
  );
};

export default CallAutocompleteGoogle;
