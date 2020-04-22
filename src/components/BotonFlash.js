import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { container, iconos } from "../styles/constantStyles";
import RNFlash from "react-native-flash";

const BotonFlash = () => {
  /*Has flash checks if the phone has flash available.
		  Since all communication between react native and native modules is asychrounous, it takes a success callback, and failure callback. atm both callbacks are necessary.

		   */

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 0,
        backgroundColor: "red",
        height: 200,
        width: 200,
        zIndex: 9,
      }}
      onPress={() => RNFlash.turnOnFlash()}
    >
      <MaterialCommunityIcons name="flash" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default BotonFlash;
