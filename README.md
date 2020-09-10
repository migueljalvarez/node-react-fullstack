# Prueba Tecnica Back

Esta es una api sencilla que cumple con los requerimientos de la  misma

## 1. Instalación

```
$ yarn install
```
configure las `.env` y configure a su modo. 

`NODE_ENV`= coloque el entorno que requiera `development` o `production`.

`PORT`= indique el puerto en el que desea iniciar la aplicacion, valor por defecto `3000`

`MONGODB_DB`= indique el nombre de la base de datos.
`MONGODB_USER`= indique el nombre de usuario
`MONGODB_PASSWORD`=indique su contraseña
`MONGODB_URL`= indique la url de coneccion al servidor, ejemplo: `myclouster.xxxxx.mongodb.net`

`JWT_SECRET`=indique una frase o valor de preferencia.
`JWT_EXPIRATION_TIME`= indique el tiempo de duracion del token en el formato `1m`, `1h` donde `m` es minutos y `h` es horas.

`S3_BUCKET`= nombre del bucket de s3
`S3_ACCESS_KEY_ID`= indique `accessKeyId`
`S3_SECRET_ACCESS_KEY`= indique `secretAccessKey`

## Ejecución del Api
* `yarn start` para produccion
* `yarn run dev` para desarrollo

### Endpoints
prefix `/api/v1`

#### Users
* **POST** `/posts`
* **GET** `/users/:id?`
* **PATCH** `/users/:id`
* **PATCH** `/users/:id/restore`
* **DELETE** `/users/:id`

#### Posts
* **POST** `/post`
* **GET** `/post/:id?`
* **PATCH** `/post/:id`
* **PATCH** `/post/:id/restore`
* **DELETE** `/post/:id`

**Nota:** cada endpoint a excepción de el post de `users`, tiene protección de autenticación con `jwt`. 