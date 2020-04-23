# Controlador de Precios
###### App para controlar precios cercanos mediante busqueda, scaneo de codigo de barras



## Hecho hasta ahora
- [x] Obtener ubicacion LAT LONG desde ubicacion de dispositivo (EXPO location)
- [x] Obtener provincia segun lat long utilizando api https://apis.datos.gob.ar/georef/api/ubicacion?lat=-42.959272332&lon=-71.532011
- [x] Permitir seleccionar provincia modo manual (sin ubicacion dispositivo
- [x] escaneo productos con codigo de barra con camara
- [x] mostrar precios maximos de referencia segun provincia y producto Ej: https://preciosmaximos.argentina.gob.ar/api/products?pag=1&Provincia=R%C3%ADo%20Negro&regs=1000

## Para hacer

- [ ] AGREGAR BUSCADOR AUTOCOMPLETE DE GOOGLE API PARA SACAR LA LAT Y LONG SIN UBICACIÓN

- [ ] CONECTAR LAT Y LONG CON API PRECIOS CLAROS
- [ ] Guardar en context los valores LAT y LONG del usuario
- [ ] llamar a API: https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat= **LAT** &lng= **LONG** &limit=3000& Para obtener sucursales array de cercanas a usuario
- [ ] Obtener datos de producto individual en sucursales cercanas:
https://d3e6htiiul5ek9.cloudfront.net/prod/producto?limit=30&id_producto= **ID PRODUCTO** &array_sucursales= **ARRAY SUCURSALES**
