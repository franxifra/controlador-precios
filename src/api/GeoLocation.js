import axios from "axios";

export default axios.create({
  baseURL: "https://apis.datos.gob.ar/georef/api",
});
