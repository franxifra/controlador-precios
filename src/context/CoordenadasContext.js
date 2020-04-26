import React, { useState } from "react";

const CoordenadasContext = React.createContext();

export const CoordenadasProvider = ({ children }) => {
  const [coordenadas, setCoordenadas] = useState("");

  const cambiarCoordenadas = (nuevasCoordenadas) => {
    setCoordenadas(nuevasCoordenadas);
  };

  return (
    <CoordenadasContext.Provider
      value={{ dataCoordenadas: coordenadas, cambiarCoordenadas }}
    >
      {children}
    </CoordenadasContext.Provider>
  );
};
//acordarse de ponerlo en APP.js

export default CoordenadasContext;
