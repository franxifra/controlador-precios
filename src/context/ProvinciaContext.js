import React, { useState } from "react";

const ProvinciaContext = React.createContext();

export const ProvinciaProvider = ({ children }) => {
  const [provincia, setProvincia] = useState("");

  const cambiarProvincia = (nuevaProvincia) => {
    setProvincia(nuevaProvincia);
  };
  return (
    <ProvinciaContext.Provider
      value={{ dataProvincia: provincia, cambiarProvincia }}
    >
      {children}
    </ProvinciaContext.Provider>
  );
};

export default ProvinciaContext;
