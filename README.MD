# Comparador de Precios
Primer proyecto Open Source de app de control de precios de Argentina.

App para controlar precios cercanos mediante busqueda, escaneo de codigo de barras programada en React Native para IOS y Android.

<img src="https://lh3.googleusercontent.com/uVJfn1APIWmcdpgViNn6Rb1Bqo7cBA142B8-HLMMUOcHb0HisOzb0IkJzpBtHvfc9q7x=w1440-h789-rw" width="250" height="auto"/>&nbsp;&nbsp;&nbsp;<img src="https://lh3.googleusercontent.com/Lk33U-sz78oXub7Y7ads6SCNh58wKiXhz79kAyTu83ZK29LtMnmpu_IpvWWP0LI-BOE=w1440-h789-rw" width="250" height="auto"/>

## Descargar App en Play Store
<a href="https://play.google.com/store/apps/details?id=com.xifra.controlpreciosmaximos" target="_BLANK"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/es-419_badge_web_generic.png" width="250" height="auto"/></a>



### Datos de Precios
- [x] Precios claros Minoristas: http://preciosclaros.gob.ar/
- [ ] Precios claros Mayoristas: https://mayoristas.preciosclaros.gob.ar/ (NO IMPLEMENTADO TODAVÍA)
- [x] Precios Máximos: https://preciosmaximos.argentina.gob.ar/
- [ ] Precios Cuidados: https://www.argentina.gob.ar/precios-cuidados (NO IMPLEMENTADO TODAVÍA)




## Hecho hasta ahora
- [x] Obtener ubicacion LAT LONG desde ubicacion de dispositivo (EXPO location)
- [x] Obtener provincia segun lat long utilizando api https://apis.datos.gob.ar/georef/api/ubicacion?lat=-42.959272332&lon=-71.532011
- [x] Permitir seleccionar provincia modo manual (sin ubicacion dispositivo
- [x] escaneo productos con codigo de barra con camara
- [x] mostrar precios maximos de referencia segun provincia y producto Ej: https://preciosmaximos.argentina.gob.ar/api/products?pag=1&Provincia=R%C3%ADo%20Negro&regs=1000
- [x] AGREGAR BUSCADOR AUTOCOMPLETE DE GOOGLE API PARA SACAR LA LAT Y LONG SIN UBICACIÓN

- [x] CONECTAR LAT Y LONG CON API PRECIOS CLAROS
- [x] Guardar en context los valores LAT y LONG del usuario
- [x] llamar a API: https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat= **LAT** &lng= **LONG** &limit=3000& Para obtener sucursales array de cercanas a usuario
- [x] Obtener datos de producto individual en sucursales cercanas:
https://d3e6htiiul5ek9.cloudfront.net/prod/producto?limit=30&id_producto= **ID PRODUCTO** &array_sucursales= **ARRAY SUCURSALES**

## Para hacer (Programación)
- [x] Agregar funcionalidad de busqueda de productos sin escanear
- [x] mensaje de producto no encontrado o sin disponibilidad
- [x] cambiar rango de busqueda en kilometros y permitir cambiar al usuario
- [x] opciones para hacer con los precios (navegar al supermercado, compartir precio,
- [ ] agregar precios cuidados
- [ ] agregar precios claros mayoristas
- [ ] Funcionalidad armar lista de compras y ver donde mas conviene comprarlo
- [ ] Permitir agregar precios al usuario
- [ ] Hacer version de navegador con React Native Web

## Para hacer (Marketing y diseño)
- [ ] Conseguir fondos para lanzarla en App Store
- [ ] Promocionarla en distintos medios de comunicación
- [ ] Evaluar un nuevo Logo
- [ ] Analizar UX



## Más capturas de la App
<img src="https://lh3.googleusercontent.com/Oc-xnIBCrF3j74tvDP2GfrCyH6HzguBHau540ETBLFey4dSyVRjffcC-nGAptzZaeXwU=w1440-h789-rw" width="250" height="auto"/>&nbsp;&nbsp;&nbsp;<img src="https://lh3.googleusercontent.com/gvMlGErn_630BjVvVDx_zkurQp53CSFQ9M780vV75hDBRCFw5Uda8rrilSxb5fZIXw=w1440-h789-rw" width="250" height="auto"/>&nbsp;&nbsp;&nbsp;<img src="https://lh3.googleusercontent.com/TqKrzBn2LrpmNVTh1oTR3qdpZpl28m4t7BjET7EibWc9OIoJaxhZVDJUB2fYVnM_xg=w1440-h789-rw" width="250" height="auto"/>


Abierto a nuevas ideas, colaboradores y propuestas!





