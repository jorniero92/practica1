# Front

# Back
<pre>
    ___      ___      ___      ___      ___      ___   
   /\__\    /\  \    /\  \    /\  \    /\  \    /\  \  
  /:| _|_  /::\  \  /::\  \  /::\  \  _\:\  \  /::\  \ 
 /::|/\__\/:/\:\__\/:/\:\__\/::\:\__\/\/::\__\/\:\:\__\
 \/|::/  /\:\/:/  /\:\/:/  /\:\:\/  /\::/\/__/\:\:\/__/
   |:/  /  \::/  /  \::/  /  \:\/  /  \/__/    \::/  / 
   \/__/    \/__/    \/__/    \/__/             \/__/  

</pre>

## Desarrolo del servidor "nodepop"

 * Pasos para la instalacion:
```	
express nodepop --ejs
npm i mongoose
```

## Para empezar con el proyecto:

 1 Iniciamos la Base de Datos.
```
	startMongo
```

  2 Realizar los comandos dentro del proyecto nodepop/nodepop.
```
	cd nodepop
```

  3 Creacion de las dependencias.
```
	npm install
```

  4 Inicializar algunos usuarios.
```
	npm run usuarios
```

   5 Inicializar algunos anuncios.
```
npm run anuncios
```



## Instrucciones de uso:

#### Añadir usuarios o anuncios.

 * Usuario.
 ```
 PUT http://localhost:3000/usuario
 ```
 Formato de un usuario: 

	nombre: String
	email: String
	clave: String


 * Anuncios.
 ```
 PUT http://localhost:3000/anuncios
 ```
 Formato de un anuncio

	nombre: String
	venta: Boolean
	precio: Number
	foto: String
	tags: [String]



#### Ejemplo de filtrado de anuncios.

  * Autentificacion de un usuario y devuelve la lista de anuncios.
 ```
 GET http://localhost:3000/anuncios
 ```

  * Devuelve la lista de anuncios con un precio exacto.
 ```
 GET http://localhost:3000/anuncios?precio:10
 ```

  * Devuelve la lista de anuncios con un precio menor al insertado
 ```
 GET http://localhost:3000/anuncios?precio:-10
 ```

  * Devuelve la lista de anuncios con un precio mayor al insertado
 ```
 GET http://localhost:3000/anuncios?precio:10-
 ```

  * Devuelve la lista de anuncios con un precio entre un rango
 ```
 GET http://localhost:3000/anuncios?precio:0-10
 ```

  * Ejemplo completo de una peticion de una lista con restricciones
 ```
 GET http://localhost:3000/anuncios?ptag=mobile&venta:false&nombre=ip&recio:50-
 ```


## Api V1.0 2016-03-18

* 1. Crear la app Express 
* 2. Instalar Mongoose
* 3. Instalar las dependencias
* 4. Inicializar la Base de Datos
* 5. Hacer peticiones para añadir usuario 
* 6. Con autentificacion, añadir anuncion y consultarlos
* 7. Filtrado de anuncios poniendo filtros
* 8. Comentar el README.md para saber el correcto funcionamiento
