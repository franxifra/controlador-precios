import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as RootNavigation from "../../RootNavigation";
import { colores, texto } from "../styles/constantStyles";
import axios from "axios";
import { Camera } from "expo-camera";

export default function ScannerCall() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [provincia, setProvincia] = useState("");
  const [arrayProductos, setArrayProductos] = useState([]);
  const [flash, setFlash] = useState("off");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    RootNavigation.navigate("Producto", {
      id: data,
      productos: arrayProductos,
    });
  };

  const styles = StyleSheet.create({
    centradoTotal: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    icono: {
      fontSize: 200,
      position: "absolute",
      color: colores.colorTexto,
      opacity: 0.5,
    },
  });

  if (hasPermission === null) {
    return (
      <View
        style={{
          flex: 6,
          backgroundColor: colores.colorFondo,
        }}
      >
        <View style={styles.centradoTotal}>
          <MaterialCommunityIcons
            name="camera"
            style={{ color: colores.colorTexto, fontSize: 50 }}
          />
          <Text style={texto.titulo}>Iniciando camara...</Text>
        </View>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <Text style={texto.titulo}>
        Para escanear el producto tenes que permitir a la aplicacion el uso de
        la camara
      </Text>
    );
  }

  return (
    <View
      style={{
        flex: 6,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Camera
        style={{ flex: 1 }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
        }}
        flashMode={flash}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="barcode-scan" style={styles.icono} />
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              right: 10,
              backgroundColor: colores.colorPrimario,
              height: 60,
              width: 60,
              zIndex: 9,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() =>
              flash === "off" ? setFlash("torch") : setFlash("off")
            }
          >
            <Ionicons
              name={flash === "torch" ? "ios-flash-off" : "ios-flash"}
              style={{ color: colores.colorTexto, fontSize: 40 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
