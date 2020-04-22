import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import RNPicker from "rn-modal-picker";
import { colores } from "../styles/constantStyles";
import * as RootNavigation from "../../RootNavigation";
import ProvinciaContext from "../context/ProvinciaContext";

const PickerProvincia = ({ provinciaScanner, onChange, cambiar }) => {
  const { dataProvincia, cambiarProvincia } = useContext(ProvinciaContext);
  console.log("laprovinciaes " + dataProvincia);
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [provincia, setProvincia] = useState("");

  function nuevaProvincia(valor) {
    // Here, we invoke the callback with the new value
    onChange(valor);
  }

  useEffect(() => {
    (async () => {
      const provincia = await AsyncStorage.getItem("provincia");
      setValorSeleccionado(provincia);
    })();
  }, []);

  const data = [
    {
      id: "1",
      name: "Misiones",
    },
    {
      id: "2",
      name: "San Luis",
    },
    {
      id: "3",
      name: "San Juan",
    },
    {
      id: "4",
      name: "Entre Ríos",
    },
    {
      id: "5",
      name: "Santa Cruz",
    },
    {
      id: "6",
      name: "Río Negro",
    },
    {
      id: "7",
      name: "Chubut",
    },
    {
      id: "8",
      name: "Córdoba",
    },
    {
      id: "9",
      name: "Mendoza",
    },
    {
      id: "10",
      name: "La Rioja",
    },
    {
      id: "11",
      name: "Catamarca",
    },
    {
      id: "12",
      name: "La Pampa",
    },
    {
      id: "13",
      name: "Santiago del Estero",
    },
    {
      id: "14",
      name: "Corrientes",
    },
    {
      id: "15",
      name: "Tucumán",
    },
    {
      id: "16",
      name: "Santa Fe",
    },
    {
      id: "17",
      name: "Neuquén",
    },
    {
      id: "18",
      name: "Salta",
    },
    {
      id: "19",
      name: "Chaco",
    },
    {
      id: "20",
      name: "Formosa",
    },
    {
      id: "21",
      name: "Jujuy",
    },
    {
      id: "22",
      name: "CABA",
    },
    {
      id: "23",
      name: "Buenos Aires",
    },
    {
      id: "24",
      name: "Tierra del Fuego",
    },
  ];
  const selectedValue = (index, item) => {
    console.log(item);
    cambiarProvincia(item.name);
  };
  console.log(valorSeleccionado);
  return (
    <View style={!cambiar && Styles.container}>
      <RNPicker
        dataSource={data}
        dummyDataSource={data}
        pickerTitle={"Elegi tu Provincia"}
        defaultValue={false}
        showSearchBar={true}
        disablePicker={false}
        changeAnimation={"none"}
        placeHolderText={
          cambiar ? "cambiar" : "Selecciona tu provincia de la lista"
        }
        placeHolderLabel={
          cambiar
            ? "cambiar"
            : dataProvincia === ""
            ? "Selecciona tu provincia de la lista"
            : dataProvincia
        }
        searchBarPlaceHolder={"Buscar....."}
        showPickerTitle={true}
        pickerStyle={cambiar ? Styles.pickerStyleCambiar : Styles.pickerStyle}
        pickerItemTextStyle={Styles.listTextViewStyle}
        selectedLabel={cambiar ? "cambiar" : dataProvincia}
        selectLabelTextStyle={[
          Styles.selectLabelTextStyle,
          !cambiar && { width: "99%" },
        ]}
        dropDownImage={cambiar && false}
        placeHolderTextStyle={Styles.placeHolderTextStyle}
        selectedValue={(index, item) => {
          selectedValue(index, item);
          provinciaScanner && nuevaProvincia(item);
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    margin: 15,
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: "#90caf9",
    shadowColor: "#90caf9",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: colores.colorTexto,
    textAlign: "left",
    padding: 10,
    flexDirection: "row",
    fontWeight: "600",
    textAlign: "center",
    marginLeft: 13,
    marginRight: -13,
  },
  placeHolderTextStyle: {
    color: colores.colorTexto,
    padding: 10,
    textAlign: "center",
    width: "99%",
    flexDirection: "row",
    fontWeight: "600",
    marginLeft: 13,
    marginRight: -13,
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left",
  },
  pickerStyle: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    backgroundColor: colores.colorPrimario,
    flexDirection: "row",
  },
  pickerStyleCambiar: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default PickerProvincia;
