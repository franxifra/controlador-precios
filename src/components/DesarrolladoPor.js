import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { texto } from "../styles/constantStyles";
import * as WebBrowser from "expo-web-browser";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CreditosDesarrollador = () => {
  return (
    <TouchableOpacity
      onPress={() => WebBrowser.openBrowserAsync("https://xifra.com.ar")}
    >
      <Text style={[texto.chico]}>
        Desarrollado con <MaterialCommunityIcons name="heart" /> por:
      </Text>
      <Image
        style={{ width: 71, height: 40, alignSelf: "center" }}
        resizeMode="contain"
        source={require("../assets/creditos.png")}
      />
    </TouchableOpacity>
  );
};

export default CreditosDesarrollador;
