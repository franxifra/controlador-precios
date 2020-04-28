import React from "react";
import { ProvinciaProvider } from "./src/context/ProvinciaContext";
import { CoordenadasProvider } from "./src/context/CoordenadasContext";
import { DireccionProvider } from "./src/context/DireccionContext";
import { SucursalesProvider } from "./src/context/SucursalesContext";
import { RangoDistanciaProvider } from "./src/context/RangoDistanciaContext";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import Scanner from "./src/screens/Scanner";
import TabBarIcon from "./src/components/TabBarIcon";
import Producto from "./src/screens/Producto";
import { navigationRef } from "./RootNavigation";
import { colores } from "./src/styles/constantStyles";
import Buscar from "./src/screens/Buscar";

const Tab = createBottomTabNavigator();

const App = function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colores.colorPrimario,
          inactiveTintColor: colores.inactivo,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Posición",

            headerTintColor: "#fff",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name="compass"
                libreria="MaterialCommunityIcons"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Busca"
          component={Buscar}
          options={{
            title: "Buscá",

            headerTintColor: "#fff",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="search" libreria="Feather" />
            ),
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={Scanner}
          options={{
            title: "Escaneá",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                libreria="MaterialCommunityIcons"
                name="barcode-scan"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Producto"
          component={Producto}
          options={{
            title: "Producto",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                libreria="MaterialCommunityIcons"
                name="food-apple"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <RangoDistanciaProvider>
      <SucursalesProvider>
        <DireccionProvider>
          <CoordenadasProvider>
            <ProvinciaProvider>
              <App />
            </ProvinciaProvider>
          </CoordenadasProvider>
        </DireccionProvider>
      </SucursalesProvider>
    </RangoDistanciaProvider>
  );
};
