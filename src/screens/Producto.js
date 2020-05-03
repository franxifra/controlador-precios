import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductoIndivudual from "../components/ProductoIndividual";
import BotonesProducto from "../components/BotonesProducto";
import { container } from "../styles/constantStyles";

const Producto = ({ navigation, route }) => {
  if (typeof route.params === "undefined") {
    return (
      <SafeAreaView style={container.primario}>
        <View style={styles.centradoTotal}>
          <Text style={styles.titulo}>Busca un producto nuevo</Text>

          <BotonesProducto home />
        </View>
      </SafeAreaView>
    );
  } else {
    const idProducto = route.params.id;
    const productos = route.params.productos;

    console.log(productos);
    return (
      <SafeAreaView style={container.primario}>
        <ProductoIndivudual
          id={idProducto}
          navigation={navigation}
          productos={productos}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0288d1",
    flex: 1,
  },
  icono: {
    fontSize: 300,
    color: "white",
  },
  titulo: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  centradoTotal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Producto;
