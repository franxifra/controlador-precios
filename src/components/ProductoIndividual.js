import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { imagen, texto } from "../styles/constantStyles";
import PickerProvincia from "../components/pickerProvincia";

import ProvinciaContext from "../context/ProvinciaContext";

import axios from "axios";
import BotonesProducto from "./BotonesProducto";
import * as RootNavigation from "../../RootNavigation";

const ProductoIndividual = ({ id, navigation }) => {
  const { dataProvincia, cambiarProvincia } = useContext(ProvinciaContext);
  const [provincia, setProvincia] = useState("");
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tiempo, setTiempo] = useState(false);

  console.log("la provincia es " + dataProvincia);

  useEffect(() => {
    //llamamos a la api con useEffect para llamarla sol cuando cambie la provincia
    axios
      .get(
        `https://preciosmaximos.argentina.gob.ar/api/products?pag=1&Provincia=${encodeURI(
          dataProvincia
        )}&regs=5000`
      )
      .then(function (response) {
        setProducto(response.data.result);
        console.log("la api busca");
      })

      .finally(function () {
        console.log("setea loading falses");
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log("esto da error " + error);
      });

    const timer = setTimeout(() => {
      setTiempo(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [dataProvincia /* llamar API solo cuando provincia cambie*/]);

  // recuperar datos de provincia segun posicion del usuario utilizando AsyncStorage
  let Hola = async () => {
    try {
      const getProvincia = await AsyncStorage.getItem("provincia");
      setProvincia(getProvincia);
    } catch (e) {
      console.error(e);
    }
  };
  Hola();
  console.log("obtuvo producto exitoso fuera de use effect" + producto);
  console.log(producto.length);

  // filtramos array de productos para encontrar el escaneado
  const productoIndividual = producto.filter((d) => d.id_producto == id);
  console.log(productoIndividual[0]);

  if (loading || !tiempo || producto.length === 0) {
    return <Text style={texto.titulo}>Buscando..</Text>;
  } else if (typeof productoIndividual[0] === "undefined") {
    return (
      <>
        {console.log("se activo el if")}

        <Text style={texto.parrafo}>
          El producto no se encuentra en la lista de precios maximos de
          referencia
        </Text>
        {/* {setTimeout(() => {
          console.log("pasaron 2 segundos");
        }, 1000)} */}
        <BotonesProducto noencontrado />
      </>
    );
  } else {
    console.log(productoIndividual);
    return (
      <>
        <View
          style={{
            backgroundColor: "white",
            flex: 2,
            justifyContent: "center",
            marginHorizontal: 25,
          }}
        >
          <Image
            style={imagen.producto}
            source={{
              uri: `https://imagenes.preciosclaros.gob.ar/productos/${id}.jpg`,
            }}
          />
        </View>
        <View
          style={{ flex: 2, justifyContent: "flex-end", marginHorizontal: 25 }}
        >
          <Text style={[texto.titulo, { marginTop: 10 }]}>
            {typeof producto[0] !== "undefined" &&
              productoIndividual[0].Producto}
          </Text>
          <Text style={[texto.parrafo, { marginTop: 10 }]}>
            Precio Máximo sugerido:
          </Text>
          <Text style={texto.precio}>
            ${productoIndividual[0]["Precio sugerido"]}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Text style={[texto.chico, { marginRight: 3 }]}>
            Valido para la provincia de {dataProvincia}
          </Text>
          <PickerProvincia cambiar />
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <BotonesProducto individual />
        </View>
      </>
    );
  }
};

export default ProductoIndividual;
