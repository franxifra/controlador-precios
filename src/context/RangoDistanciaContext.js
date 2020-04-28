import React, { useState } from "react";

const RangoDistanciaContext = React.createContext();

export const RangoDistanciaProvider = ({ children }) => {
  const [rangoDistancia, setRangoDistancia] = useState(50);

  const cambiarRangoDistancia = (nuevoRangoDistancia) => {
    setRangoDistancia(nuevoRangoDistancia);
  };
  return (
    <RangoDistanciaContext.Provider
      value={{ dataRangoDistancia: rangoDistancia, cambiarRangoDistancia }}
    >
      {children}
    </RangoDistanciaContext.Provider>
  );
};

export default RangoDistanciaContext;
