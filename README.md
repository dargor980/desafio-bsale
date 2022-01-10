# Tienda Online BSALE
Bienvenido a la documentación de la Tienda Online BSALE

"Tienda Online BSALE" es un proyecto basado en el ejercicio propuesto por la empresa BSale para el proceso de selección de Desarrollador.

El ejercicio consiste en construir una tienda online, la cuál debe desplegar productos agrupados por categoría a la cuál pertenecen.

# Arquitectura del Sistema

De acuerdo a lo pedido, se realizó una API REST en el backend, desarrollado en NodeJS, utilizando herramientas como Express, mientras que por otro lado, en el frontend se realizó una app basada en vanilla Javascript el cual consume de la API

## Diagrama de la arquitectura

<img src="estructura.png"/>


#Backend

La API REST está basada en NodeJS, se utilizó las siguientes dependencias para su construcción:

- Express: ^4.17.2
- mysql: ^2.18.1
- cors: ^2.8.5
- moment: ^2.29.1
- supervisor: ^0.12.0

Para revisar referencias de la API vea la [Documentación de la API](https://api-bsale.readme.io/reference/getting-started-with-your-api-1) 

## Despliegue del Backend
La API se desplegará en Heroku. Para esto se debe seguir los siguientes pasos:

- Poseer cuenta en Heroku
- Instalar CLI de Heroku
- Iniciar sesión usando el CLI (ejecutar heroku login en la consola de comandos)
- Ejecutar heroku create nombre-app en la carpeta del backend
- Crear el siguiente archivo Procfile (sin extensión):

```
web: supervisor index.js
```

- Ejecutar el comando git push heroku master
- Probar nuestra aplicación (puede usar Postman para realizar una petición).

## 🚦 Consideraciones 
Si  necesita cambiar la dirección o el nombre de la base de datos, modifique los parámetros en el archivo db.js 


#  Frontend

El Frontend (cliente que consumirá la API REST) esta basa en vanilla Javascript, se utilizó dependencias como:

- MDBootstrap
- CSS3
- HTML5

## Despliegue del Frontend

Para desplegar el Frontend se utilizará netlify. Para esto, se deberá seguir los siguientes pasos:

- Crear cuenta en netlify
- iniciar sesión
- ir a sección sites->new site
- seleccionar manual deploy
- copiar la carpeta del Frontend
- como paso opcional, modificar el subdominio o asignar un dominio personalizado.
- acceder al link generado y probar

# [API DOC](https://api-bsale.readme.io/reference/getting-started-with-your-api-1)

