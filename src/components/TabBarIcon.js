import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";

import Colors from "../constants/Colors";
import { colores } from "../styles/constantStyles";

export default function TabBarIcon(props) {
  return props.libreria === "Feather" ? (
    <Feather
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? colores.colorPrimario : Colors.tabIconDefault}
    />
  ) : (
    props.libreria === "MaterialCommunityIcons" && (
      <MaterialCommunityIcons
        name={props.name}
        size={30}
        style={{ marginBottom: -3 }}
        color={props.focused ? colores.colorPrimario : Colors.tabIconDefault}
      />
    )
  );
}
