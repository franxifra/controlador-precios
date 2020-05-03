import React from "react";
import { Image, Text } from "react-native";
import { container, iconos, texto, imagen } from "../styles/constantStyles";

const LogoTitulo = () => {
  return (
    <>
      <Image source={require("../assets/logo.png")} style={imagen.logo} />
      <Text style={[texto.titulo, { marginTop: 20, marginHorizontal: 10 }]}>
        Comparador de Precios
      </Text>
      <Text></Text>
    </>
  );
};

export default LogoTitulo;
