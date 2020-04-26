import React, { useState } from "react";

const SucursalesContext = React.createContext();

export const SucursalesProvider = ({ children }) => {
  const [sucursales, setSucursales] = useState("");

  const cambiarSucursales = (nuevasSucursales) => {
    setSucursales(nuevasSucursales);
  };

  return (
    <SucursalesContext.Provider
      value={{ dataSucursales: sucursales, cambiarSucursales }}
    >
      {children}
    </SucursalesContext.Provider>
  );
};
//acordarse de ponerlo en APP.js
export default SucursalesContext;
