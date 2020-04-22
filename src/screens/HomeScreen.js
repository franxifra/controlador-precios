import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
  Linking,
  View,
} from "react-native";
import axios from "axios";

import { container, iconos } from "../styles/constantStyles";
import GetLocation from "../components/GetLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ComprobarPermiso from "../components/ComprobarPermiso";
import CreditosDesarrollador from "../components/DesarrolladoPor";
import BotonesProducto from "../components/BotonesProducto";
import LogoTitulo from "../components/LogoTitulo";

const HomeScreen = () => {
  return (
    <SafeAreaView style={container.primario}>
      <View
        style={[
          { justifyContent: "space-between", flex: 1, marginVertical: 30 },
        ]}
      >
        <View>
          <LogoTitulo />
        </View>
        <View>
          <ComprobarPermiso />
          <GetLocation />
          <BotonesProducto home />
        </View>
        <CreditosDesarrollador />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
  icono: {
    fontSize: 250,
    color: "white",
  },
});

export default HomeScreen;
