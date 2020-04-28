import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { texto, colores } from "../styles/constantStyles";
import RangoDistanciaContext from "../context/RangoDistanciaContext";

const CambiarRango = ({ individual }) => {
  const { dataRangoDistancia, cambiarRangoDistancia } = useContext(
    RangoDistanciaContext
  );

  const [rangoFormulario, setRangoFormulario] = useState(dataRangoDistancia);
  const [modal, setModal] = useState(false);

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center" }}
            activeOpacity={1}
            onPressOut={() => {
              setModal(false);
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: colores.colorTexto,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
              >
                <View
                  style={{
                    padding: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, marginBottom: 14 }}>
                    Cambiar Rango de busqueda
                  </Text>
                  <Text style={{ fontSize: 15, marginBottom: 14 }}>
                    {rangoFormulario}km
                  </Text>
                  <Slider
                    value={dataRangoDistancia}
                    minimumValue={1}
                    maximumValue={300}
                    onValueChange={(valor) => setRangoFormulario(valor)}
                    step={1}
                    style={{ width: 150, height: 20 }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      cambiarRangoDistancia(rangoFormulario);
                      setModal(false);
                    }}
                    style={{ flex: 1, padding: 20 }}
                  >
                    <Text style={{ textAlign: "center", fontWeight: "600" }}>
                      Aplicar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModal(false)}
                    style={{ flex: 1, padding: 20 }}
                  >
                    <Text style={{ textAlign: "center" }}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          flexWrap: individual ? "wrap" : "nowrap",
          justifyContent: "center",
          paddingHorizontal: individual ? 10 : 32,
          paddingVertical: 10,
        }}
        onPress={() => setModal(true)}
      >
        <FontAwesome
          name="map-marker"
          style={{
            color: colores.colorTexto,
            fontSize: 15,
            marginRight: 10,
          }}
        />
        {individual ? (
          <Text style={[texto.lista, { marginRight: 10 }]}>
            Rango: {dataRangoDistancia}km
          </Text>
        ) : (
          <>
            <Text style={[texto.lista, { marginRight: 10 }]}>
              Rango de búsqueda {dataRangoDistancia}km
            </Text>

            <Text
              style={[
                texto.lista,
                { textDecorationLine: "underline", textAlign: "center" },
              ]}
            >
              cambiar
            </Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});

export default CambiarRango;
