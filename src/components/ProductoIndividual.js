import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { imagen, texto, colores } from "../styles/constantStyles";
import PickerProvincia from "../components/pickerProvincia";

import ProvinciaContext from "../context/ProvinciaContext";
import SucursalesContext from "../context/SucursalesContext";

import axios from "axios";
import BotonesProducto from "./BotonesProducto";

const ProductoIndividual = ({ id, navigation }) => {
  const { dataProvincia, cambiarProvincia } = useContext(ProvinciaContext);
  const { dataSucursales, cambiarSucursales } = useContext(SucursalesContext);

  const [provincia, setProvincia] = useState("");
  const [producto, setProducto] = useState([]);
  const [productoPrecioClaro, setProductoPrecioClaro] = useState(false);

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
        `https://d3e6htiiul5ek9.cloudfront.net/prod/producto?limit=30&id_producto=${id}&array_sucursales=${dataSucursales.map(
          (sucursal) => `${sucursal.id}`
        )}`
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
  }, [id, dataSucursales]);

  // filtramos array de productos para encontrar el escaneado
  const productoIndividual = producto.filter((d) => d.id_producto == id);

  if (loading) {
    return <Text style={texto.titulo}>Buscando..</Text>;
  } else if (!productoPrecioClaro.hasOwnProperty("producto")) {
    return (
      <>
        <Text style={texto.parrafo}>
          El producto no se encuentra en la lista de precios maximos de
          referencia
        </Text>
        <BotonesProducto noencontrado />
      </>
    );
  } else {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginHorizontal: 25,
            flexDirection: "row",
          }}
        >
          <Image
            style={[imagen.producto, { flex: 1 }]}
            source={{
              uri: `https://imagenes.preciosclaros.gob.ar/productos/${id}.jpg`,
            }}
          />
          <View style={{ flex: 2 }}>
            <Text style={[texto.parrafo, { marginTop: 10, fontWeight: "600" }]}>
              {typeof productoPrecioClaro.producto.nombre !== "undefined" &&
                productoPrecioClaro.producto.nombre}
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
          </View>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            borderTopColor: colores.colorTexto,
            borderTopWidth: 1,
          }}
        >
          <ScrollView>
            {productoPrecioClaro.sucursales
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
                      flexDirection: "row",
                      borderBottomColor: colores.colorTexto,
                      borderBottomWidth: 1,
                      paddingVertical: 15,
                      paddingHorizontal: 5,
                    }}
                  >
                    <View>
                      <Image
                        source={{
                          uri: `https://imagenes.preciosclaros.gob.ar/comercios/${sucursal.comercioId}-${sucursal.banderaId}.jpg`,
                        }}
                        style={imagen.logoSupermercado}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 5,
                      }}
                    >
                      <Text style={texto.listaPrecio}>
                        $
                        {sucursal.hasOwnProperty("preciosProducto") &&
                          sucursal.preciosProducto.precioLista}{" "}
                        a {kilometros}
                      </Text>
                      <Text style={texto.lista}>
                        {sucursal.banderaDescripcion} {sucursal.direccion}{" "}
                        {sucursal.localidad}
                      </Text>
                    </View>
                  </View>
                );
              })}
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
