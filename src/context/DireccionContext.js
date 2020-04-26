import React, { useState } from "react";

const DireccionContext = React.createContext();

export const DireccionProvider = ({ children }) => {
  const [direccion, setDireccion] = useState("");

  const cambiarDireccion = (nuevaDireccion) => {
    setDireccion(nuevaDireccion);
  };
  return (
    <DireccionContext.Provider
      value={{ dataDireccion: direccion, cambiarDireccion }}
    >
      {children}
    </DireccionContext.Provider>
  );
};

export default DireccionContext;
