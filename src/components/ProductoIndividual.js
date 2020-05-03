import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Share,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { imagen, texto, colores } from "../styles/constantStyles";

import ProvinciaContext from "../context/ProvinciaContext";
import SucursalesContext from "../context/SucursalesContext";
import RangoDistanciaContext from "../context/RangoDistanciaContext";
import CoordenadasContext from "../context/CoordenadasContext";

import axios from "axios";
import BotonesProducto from "./BotonesProducto";
import CambiarRango from "./CambiarRango";

const ProductoIndividual = ({ id, navigation }) => {
  const { dataProvincia, cambiarProvincia } = useContext(ProvinciaContext);
  const { dataSucursales, cambiarSucursales } = useContext(SucursalesContext);
  const { dataRangoDistancia, cambiarRangoDistancia } = useContext(
    RangoDistanciaContext
  );
  const { dataCoordenadas, cambiarCoordenadas } = useContext(
    CoordenadasContext
  );

  const [provincia, setProvincia] = useState("");
  const [producto, setProducto] = useState([]);
  const [productoPrecioClaro, setProductoPrecioClaro] = useState(false);
  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(true);

  //filtrar provincia
  const provinciaFiltrada =
    dataProvincia === "Ciudad Autónoma de Buenos Aires"
      ? "CABA"
      : dataProvincia ===
        "Tierra del Fuego, Antártida e Islas del Atlántico Sur"
      ? "Tierra del Fuego"
      : encodeURI(dataProvincia);

  useEffect(() => {
    //llamamos a la api con useEffect para llamarla sol cuando cambie la provincia
    axios
      .get(
        `https://preciosmaximos.argentina.gob.ar/api/products?pag=1&Provincia=${provinciaFiltrada}&regs=5000`
      )
      .then(function (response) {
        setProducto(response.data.result);
        console.log("la api busca");
      })

      .catch(function (error) {
        // handle error
        console.log("esto da error " + error);
      });

    // hacer llamado a sucursales
  }, [dataProvincia /* llamar API solo cuando provincia cambie*/]);

  useEffect(() => {
    //llamar api con id producto y sucursales para Precios Claros
    setLoading(true);
    axios
      .get(
        `https://d3e6htiiul5ek9.cloudfront.net/prod/producto?limit=30&id_producto=${id}&array_sucursales=${dataSucursales
          .filter((sucursal) => sucursal.distancia <= dataRangoDistancia)
          .map((sucursal) => `${sucursal.id}`)}`
      )
      .then(function (response) {
        setProductoPrecioClaro(response.data);
        console.log("la api de precios claros busca");
        console.log("setea loading false");
        setLoading(false);
      })

      .catch(function (error) {
        // handle error
        console.log("buscar productos claros error " + error);
      });
  }, [id, dataSucursales, dataRangoDistancia]);

  // filtramos array de productos para encontrar el escaneado
  const productoIndividual = producto.filter((d) => d.id_producto == id);

  if (loading) {
    return <Text style={texto.titulo}>Buscando..</Text>;
  } else if (
    productoPrecioClaro.sucursales.filter((key) => key.preciosProducto)
      .length === 0 &&
    typeof productoPrecioClaro.producto.nombre === "undefined"
  ) {
    return (
      <>
        <Text style={texto.parrafo}>
          No hay precios disponibles para este producto
        </Text>
        <BotonesProducto noencontrado />
      </>
    );
  } else {
    return (
      <>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            marginHorizontal: 25,
            flexDirection: "row",
          }}
        >
          <Image
            style={[imagen.producto, { flex: 1, alignSelf: "center" }]}
            source={{
              uri: `https://imagenes.preciosclaros.gob.ar/productos/${id.toString()}.jpg`,
            }}
            defaultSource={require("../assets/no-image.png")}
          />
          <View style={{ flex: 2 }}>
            <Text style={[texto.parrafo, { marginTop: 10, fontWeight: "600" }]}>
              {typeof productoPrecioClaro.producto.nombre !== "undefined"
                ? productoPrecioClaro.producto.nombre
                : "Producto No encontrado"}
            </Text>
            {productoIndividual.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={[
                    texto.parrafo,
                    {
                      marginTop: 10,
                      fontSize: 12,
                      flex: 1,
                    },
                  ]}
                >
                  Precio Máximo sugerido:
                </Text>
                <Text style={[texto.parrafo, { fontSize: 20 }]}>
                  ${productoIndividual[0]["Precio sugerido"]}
                </Text>
              </View>
            )}
            {typeof productoPrecioClaro.producto.nombre !== "undefined" && (
              <View>
                <Text
                  style={[
                    texto.chico,
                    { marginRight: 3, fontSize: 10, textAlign: "center" },
                  ]}
                >
                  Precios válidos para la provincia de {dataProvincia}
                </Text>
              </View>
            )}
            <CambiarRango individual />
          </View>
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: "center",
            borderTopColor: colores.colorTexto,
            borderTopWidth: 1,
          }}
        >
          <ScrollView>
            {productoPrecioClaro.sucursales.filter((key) => key.preciosProducto)
              .length > 0 ? (
              productoPrecioClaro.sucursales
                .filter((key) => key.preciosProducto)
                .map((sucursal) => {
                  let kilometros = "";
                  if (
                    dataSucursales.filter(
                      (sucu) =>
                        sucu.id ===
                        `${sucursal.comercioId}-${sucursal.banderaId}-${sucursal.id}`
                    )[0]
                  ) {
                    kilometros = dataSucursales.filter(
                      (sucu) =>
                        sucu.id ===
                        `${sucursal.comercioId}-${sucursal.banderaId}-${sucursal.id}`
                    )[0].distanciaDescripcion;
                  }
                  return (
                    <View
                      style={{
                        borderBottomColor: colores.colorTexto,
                        borderBottomWidth: 1,
                      }}
                      key={sucursal.id}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 5,
                        }}
                        onPress={() => setModal(sucursal.id)}
                      >
                        <View
                          style={{ alignSelf: "center", paddingVertical: 15 }}
                        >
                          <Image
                            source={{
                              uri: `https://imagenes.preciosclaros.gob.ar/comercios/${sucursal.comercioId}-${sucursal.banderaId}.jpg`,
                            }}
                            style={imagen.logoSupermercado}
                          />
                        </View>
                        <View
                          style={{
                            marginLeft: 5,
                            flex: 1,
                            alignSelf: "center",
                            paddingVertical: 15,
                          }}
                        >
                          <Text
                            style={[texto.listaPrecio, { textAlign: "center" }]}
                          >
                            $
                            {sucursal.hasOwnProperty("preciosProducto") &&
                              sucursal.preciosProducto.precioLista}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 4,
                            alignSelf: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <View
                            style={{
                              flex: 4,
                              alignSelf: "center",
                              paddingVertical: 15,
                            }}
                          >
                            <Text style={[texto.lista, { paddingRight: 3 }]}>
                              {sucursal.banderaDescripcion} {sucursal.direccion}{" "}
                              {sucursal.localidad} a {kilometros}
                            </Text>
                          </View>
                          {productoPrecioClaro.producto.precioMax !==
                            productoPrecioClaro.producto.precioMin &&
                            sucursal.preciosProducto.precioLista ===
                              productoPrecioClaro.producto.precioMin && (
                              <View
                                style={{
                                  flex: 1,
                                  backgroundColor: "#fff4",
                                  paddingVertical: 15,
                                  marginRight: -5,
                                  paddingHorizontal: 5,
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={[texto.lista, { textAlign: "center" }]}
                                >
                                  Mejor precio
                                </Text>
                                <Feather
                                  style={{
                                    textAlign: "center",
                                    color: colores.colorTexto,
                                  }}
                                  name="check-circle"
                                />
                              </View>
                            )}
                        </View>
                      </TouchableOpacity>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal === sucursal.id && true}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{ flex: 1, justifyContent: "center" }}
                            activeOpacity={1}
                            onPressOut={() => {
                              setModal(false);
                            }}
                          >
                            <TouchableWithoutFeedback>
                              <View
                                style={{
                                  backgroundColor: colores.colorTexto,
                                  paddingVertical: 30,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  shadowColor: "#000",
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                }}
                              >
                                <View
                                  style={{
                                    paddingHorizontal: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      textAlign: "center",
                                    }}
                                  >
                                    {productoPrecioClaro.producto.nombre} en{" "}
                                    {sucursal.preciosProducto.precioLista}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      textAlign: "center",
                                    }}
                                  >
                                    Precio: $
                                    {sucursal.preciosProducto.precioLista}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      marginBottom: 15,
                                      textAlign: "center",
                                    }}
                                  >
                                    En {sucursal.banderaDescripcion}{" "}
                                    {sucursal.localidad} {sucursal.direccion}
                                  </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      {
                                        (async () => {
                                          try {
                                            const result = await Share.share({
                                              message: `${
                                                productoPrecioClaro.producto
                                                  .nombre
                                              }\nPrecio: $${
                                                sucursal.preciosProducto
                                                  .precioLista
                                              } \nen ${
                                                sucursal.banderaDescripcion
                                              } ${sucursal.localidad} ${
                                                sucursal.direccion
                                              } 
                                              \nComo llegar:\nhttps://www.google.com/maps/dir//${encodeURI(
                                                sucursal.direccion
                                              )}%20${encodeURI(
                                                sucursal.localidad
                                              )}/
                                              \n\nVisto en la App Controlador de Precios
                                              \nDescargar para android:\nhttps://bit.ly/PreciosMaximosAndroid`,
                                            });
                                            if (
                                              result.action ===
                                              Share.sharedAction
                                            ) {
                                              if (result.activityType) {
                                                setModal(false);
                                              } else {
                                                null;
                                              }
                                            } else if (
                                              result.action ===
                                              Share.dismissedAction
                                            ) {
                                              setModal(false);
                                            }
                                          } catch (error) {
                                            console.log(error.message);
                                          }
                                        })();
                                      }
                                    }}
                                    style={{ flex: 1, paddingHorizontal: 20 }}
                                  >
                                    <MaterialCommunityIcons
                                      style={{
                                        textAlign: "center",
                                        fontSize: 30,
                                      }}
                                      name="share"
                                    />
                                    <Text
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      Compartir
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      setModal(false);
                                      Linking.openURL(
                                        `https://www.google.com/maps/dir/${dataCoordenadas.lat},${dataCoordenadas.lng}/${sucursal.direccion} ${sucursal.localidad}/`
                                      );
                                    }}
                                    style={{ flex: 1, paddingHorizontal: 20 }}
                                  >
                                    <MaterialCommunityIcons
                                      style={{
                                        textAlign: "center",
                                        fontSize: 30,
                                      }}
                                      name="directions"
                                    />
                                    <Text style={{ textAlign: "center" }}>
                                      Como llegar
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </TouchableWithoutFeedback>
                          </TouchableOpacity>
                        </View>
                      </Modal>
                    </View>
                  );
                })
            ) : (
              <Text style={texto.parrafo}>No hay precios disponibles</Text>
            )}
          </ScrollView>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <BotonesProducto individual />
        </View>
      </>
    );
  }
};

export default ProductoIndividual;
