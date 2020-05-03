import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import {
  container,
  iconos,
  texto,
  input,
  colores,
  imagen,
} from "../styles/constantStyles";
import SucursalesContext from "../context/SucursalesContext";
import RangoDistanciaContext from "../context/RangoDistanciaContext";
import CoordenadasContext from "../context/CoordenadasContext";

import * as RootNavigation from "../../RootNavigation";

import axios from "axios";
import CambiarRango from "../components/CambiarRango";
import ComprobarPermiso from "../components/ComprobarPermiso";
import CallAutocompleteGoogle from "../components/CallAutocompleteGoogle";

const Buscar = () => {
  const { dataSucursales, cambiarSucursales } = useContext(SucursalesContext);
  const { dataRangoDistancia, cambiarRangoDistancia } = useContext(
    RangoDistanciaContext
  );
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );

  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState(false);
  const [valorFormulario, setValorFormulario] = useState("");
  const [listaProductos, setListaProductos] = useState([]);
  const [activarAutocomplete, setActivarAutocomplete] = useState(false);

  const cambioParents = (set) => {
    setActivarAutocomplete(set);
  };

  useEffect(() => {
    busqueda !== false && setLoading(true);
    //llamar api con id producto y sucursales para Precios Claros
    console.log(dataSucursales.length);
    dataSucursales.length > 0 &&
      axios

        .get(
          `https://d3e6htiiul5ek9.cloudfront.net/prod/productos?string=${busqueda}&array_sucursales=${dataSucursales
            .filter((sucursal) => sucursal.distancia <= dataRangoDistancia)
            .map(
              (sucursal) => `${sucursal.id}`
            )}&offset=0&limit=50&sort=-cant_sucursales_disponible`
        )
        .then(function (response) {
          setListaProductos(response.data);
          console.log("la api de precios claros busca");
          console.log("setea loading false");
          console.log(response.data);
          setLoading(false);
        })

        .catch(function (error) {
          // handle error
          console.log("buscar productos claros error " + error);
        });
  }, [busqueda, dataSucursales, dataRangoDistancia]);

  return (
    <SafeAreaView style={container.primario}>
      {dataCoordenadas === "" ? (
        <>
          <Text>Selecciona tu dirección antes de continuar</Text>
          <CallAutocompleteGoogle />
        </>
      ) : typeof dataSucursales === "undefined" ? (
        <Text>Cargando posicion</Text>
      ) : (
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <>
            <View>
              <Text style={[texto.titulo, { marginBottom: 10 }]}>
                Buscar Productos
              </Text>
              <View style={input.buscar}>
                <Feather style={input.BuscarIcono} name="search" />
                <TextInput
                  style={input.buscarInput}
                  placeholder="Buscar..."
                  value={valorFormulario}
                  onChangeText={(value) => setValorFormulario(value)}
                  onSubmitEditing={() => setBusqueda(valorFormulario)}
                  autoFocus={true}
                ></TextInput>
                {valorFormulario.length > 0 && (
                  <TouchableOpacity onPress={() => setValorFormulario("")}>
                    <Feather style={input.BuscarIcono} name="delete" />
                  </TouchableOpacity>
                )}
              </View>

              <CambiarRango />
            </View>
            <View style={{ flex: 3 }}>
              {busqueda === false ? (
                <View style={{ flex: 1 }}></View>
              ) : loading === true ? (
                <Text
                  style={{ alignSelf: "center", color: colores.colorTexto }}
                >
                  Cargando...
                </Text>
              ) : (
                typeof listaProductos.productos !== "undefined" &&
                (listaProductos.total === 0 ? (
                  <Text style={[texto.titulo, { marginBottom: 10 }]}>
                    No se encontro ningún producto nombre o descripcion "
                    {busqueda}"
                  </Text>
                ) : (
                  <ScrollView style={{ flex: 1 }}>
                    {listaProductos.productos.map((producto) => {
                      return (
                        <View
                          style={{
                            borderBottomColor: colores.colorTexto,
                            borderBottomWidth: 1,
                          }}
                          key={producto.id}
                        >
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              paddingVertical: 15,
                              paddingHorizontal: 5,
                            }}
                            onPress={() => {
                              RootNavigation.navigate("Producto", {
                                id: producto.id.toString(),
                              });
                            }}
                          >
                            <View>
                              <Image
                                style={[imagen.producto, { flex: 1 }]}
                                source={{
                                  uri: `https://imagenes.preciosclaros.gob.ar/productos/${producto.id.toString()}.jpg`,
                                }}
                                defaultSource={require("../assets/no-image.png")}
                              />
                            </View>
                            <View
                              style={{
                                flex: 1,
                                marginLeft: 5,
                              }}
                            >
                              <Text style={texto.listaPrecio}>
                                {producto.nombre}
                              </Text>
                              {producto.precioMin === producto.precioMax ? (
                                <Text style={[texto.lista, { fontSize: 25 }]}>
                                  $ {producto.precioMin}
                                </Text>
                              ) : (
                                <Text style={[texto.lista, { fontSize: 20 }]}>
                                  desde $ {producto.precioMin} hasta ${" "}
                                  {producto.precioMax}
                                </Text>
                              )}
                              <Text style={texto.lista}>
                                disponible en{" "}
                                {producto.cantSucursalesDisponible}{" "}
                                {producto.cantSucursalesDisponible === 1
                                  ? "sucursal"
                                  : "sucursales"}{" "}
                                a menos de {dataRangoDistancia}km de tu posición
                              </Text>
                              <Text style={texto.lista}>
                                <MaterialCommunityIcons name="barcode" />{" "}
                                {producto.id}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                ))
              )}
            </View>
          </>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Buscar;
