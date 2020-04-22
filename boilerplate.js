import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { container, iconos } from "../styles/constantStyles";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Titulo</Text>
      <MaterialCommunityIcons name="map"></MaterialCommunityIcons>
      <Text>Contenido</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
