import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// llamar width pantalla
const colores = {
  colorTexto: "white",
  colorFondo: "#0288d1",
  colorPrimario: "#004c8c",
  colorSecundario: "#005662",
  inactivo: "#999",
};

const iconos = {
  principal: {
    fontSize: RFPercentage(15),
    color: colores.colorTexto,
    alignSelf: "center",
  },
};

const container = StyleSheet.create({
  primario: {
    backgroundColor: colores.colorFondo,
    flex: 1,
    justifyContent: "center",
  },
});

const texto = StyleSheet.create({
  titulo: {
    color: colores.colorTexto,
    fontSize: RFPercentage(4.5),
    textAlign: "center",
  },
  chico: {
    color: colores.colorTexto,
    textAlign: "center",

    fontSize: RFPercentage(2),
  },
  parrafo: {
    color: colores.colorTexto,
    fontSize: RFPercentage(2.3),
    textAlign: "center",
  },
  precio: {
    color: colores.colorTexto,
    fontSize: RFPercentage(8),
    textAlign: "center",
  },
  lista: {
    fontSize: RFPercentage(1.8),
    color: colores.colorTexto,
  },
  listaPrecio: {
    fontSize: RFPercentage(2),
    color: colores.colorTexto,
    fontWeight: "bold",
  },
});

const imagen = StyleSheet.create({
  producto: {
    width: RFPercentage(15),
    height: RFPercentage(15),
  },
  logo: {
    width: RFPercentage(15),
    height: RFPercentage(15),
    alignSelf: "center",
  },
  logoSupermercado: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
});

const botones = StyleSheet.create({
  botonPrimario: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "red",
    marginTop: 15,
    justifyContent: "center",
    backgroundColor: colores.colorPrimario,
    marginHorizontal: 23,
  },
  botonSecundario: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colores.colorSecundario,
    marginTop: 15,
    justifyContent: "center",
    marginHorizontal: 23,
  },
  botonTexto: {
    color: colores.colorTexto,
    fontSize: RFPercentage(2.7),
    fontWeight: "600",
    alignSelf: "center",
  },
  botonIcono: {
    fontSize: RFPercentage(4),
    marginRight: 10,
    color: colores.colorTexto,
    alignSelf: "center",
  },
});

export { container, botones, texto, imagen, colores, iconos };
