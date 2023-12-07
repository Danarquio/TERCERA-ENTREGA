# TERCERA ENTREGA
## Servidor Express con Node, Handlebars y persistencia de datos en MongoDB con login de usuario incorporado
Este proyecto es una aplicación en Node.js que gestiona productos y carritos de compras. Permite agregar, actualizar, eliminar y consultar productos y carritos de compra. Además, utiliza Handlebars para renderizar las vistas tanto de la lista de productos y detalle del producto como el carrito con los productos agregados. Para poder acceder a las funcionalidades de ver y gestionar productos, debes pasar un login de usuario, registrarte primeramente y luego validar los datos al ingresar, el proceso de registro hace que el usuario se guarde en nuestra base de datos en MongoDb de manera codificada con la constraseña encriptada.

En la anterior actualizacion, modificamos la distribucion de los archivos, carpetas y funciones para cumplir con los parametros de arquitectura por capas utilizando DAO, router y controller. Se agrega tambien un archivo .env donde se encuentran las credenciales para acceder a la base de datos, tambien se separo la logica de acceso al session y a la db ubicado ahora en la carpeta config.

Ahora en esta nueva implementacion, agregamos la funcion de mostrar secciones de la aplicacion, identificando al usuario logueado. Impidiendo por ejemplo que otro usuario que no sea admin pueda cargar un producto, o que un usuario no logueado pueda enviar un mensaje.

## Instalación

1. Clona este repositorio en tu máquina local.

2. Asegúrate de tener Node.js y npm instalados en tu sistema.

3. Abre una terminal en la ubicación del proyecto y ejecuta los siguientes comandos para instalar las dependencias:



```bash
    npm install
    npm i express
    npm i express-handlebars
    npm i mongodb
    npm i mongoose
    npm i nodemon
    npm i cookie-parser
    npm i express-session
    npm i session-file-store
    npm i connect-mongo
    npm i bcrypt
    npm i passport
    npm i passport-local
    npm i passport-github2
    npm i jsonwebtoken
    npm i dotenv
    npm i chance
    npm i uuid
```
4. Crea un archivo en la raiz del proyecto llamado .env y agrega tus credenciales para acceder a la base de datos MongoDB siguiendo el esquema presentado debajo y modificando los siguientes segmentos "TU-NOMBRE-DE-USUARIO","TU-PASSWORD", "TU CONTRASEÑA" :



```bash
   MONGO_URI=mongodb+srv://"TU-NOMBRE-DE-USUARIO":"TU-PASSWORD"@cluster0.xtb0h9o.mongodb.net/dan?retryWrites=true&w=majority
   
   SESSION_SECRET="TU CONTRASEÑA"

```


## Uso

Inicia la aplicación ejecutando el siguiente comando:

```bash
    npm start
```
La aplicación estará disponible en:
### `http://localhost:8080`

- ### PRODUCTOS:
### 1. Puedes utilizar las siguientes rutas para interactuar con la aplicación desde POSTMAN:

- GET `/api/prod`: Obtiene la lista de productos.
- GET `/api/prod/:id`: Obtiene un producto por su ID.
- POST `/api/prod`: Agrega un nuevo producto.
- PUT `/api/prod/:id:` Actualiza un producto existente por su ID.
- DELETE `/api/prod/:id`: Elimina un producto por su ID.

- ### Estructura del Objeto: 
- Los valores necesarios para poder agregar un nuevo producto son: ` title, description, price, stock, category, thumnails`


```json
{
    "title": "nombre del producto",
    "description": "descripcion del producto",
    "price": "precio del producto como tipo number",
    "stock": "cantidad disponible como tipo number",
    "category": "categoria",
    "thumbnails": "url de la imagen en png",
    "carru1": "url de la imagen 1",
    "carru2": "url de la imagen 2",
    "carru3": "url de la imagen 3",
    "minimo": "cantidad minima de vente como tipo number",
    "availability": "disponibilidad como tipo booleano"
}
```
### 2. Puedes interactuar desde POSTMAN para otras funcionalidades:

- GET `/api/prod/limit/:limit`: Obtiene la lista de productos con un limite.
- GET `/api/prod/page/:page`: Obtiene la lista de producto por su page.
- POST `/api/prod/info`: Permite filtrar los productos por orden de precio o por categoria.
- PUT `/api/prod//info/?category=:category` filtra todos los productos que correspondan a :category .
- DELETE `/api/prod//info/?sortOrder=desc`: ordena los productos en orden descendiente.

### 3. Puedes utilizar las siguientes rutas para interactuar con la aplicación desde el navegador web:

- `/products`: Obtiene la lista renderizada de todos los productos.
- `/products/:id`: Obtiene el detalle del producto renderizado por su ID.



- ### CARRITOS

### 1. Puedes utilizar las siguientes rutas para interactuar con la aplicación desde POSTMAN:

- GET `/api/carts`: Obtiene la lista de carritos
- GET `/api/carts/:id`: Obtiene un carrito por su ID.
- POST `/api/carts`: Crea un nuevo carrito.
- DELETE `/api/carts/:id`: Elimina carrito por su ID.


- ### Estructura del Objeto: 
- Los valores necesarios para poder agregar un nuevo carrito son: ` description, quantity, total`

- POST `/api/carts`: Agrega un nuevo carrito.
```json
{
  "products": []
}
```

- Los valores necesarios para poder agregar un producto a un carrito existente: ` product_id, quantity`

- POST `/api/carts/:cid/purchase`: Agrega un producto a un carrito.
```json
{
    "cartId": "ID_DEL_CARRITO",
  "products": [
    {
      "productId": "ID_DEL_PRODUCTO_1",
      "quantity": 2
    },
    {
      "productId": "ID_DEL_PRODUCTO_2",
      "quantity": 1
    },
    {
      "productId": "ID_DEL_PRODUCTO_3",
      "quantity": 3
    }
  ]
}
```
- DELETE `/api/carts/:cid/products/:id`: Elimina un producto del carrito por su ID.


### 2. Puedes utilizar las siguientes rutas para interactuar con la aplicación desde el navegador web:

- `/cart/:cid`: Obtiene la lista renderizada de todos los productos dentro del carrito, por el id del carrito.
- `/:id`: Obtiene el producto renderizado por su ID.

- ### CHAT
- `/chat`: Te muestra un formulario para enviar un mensaje junto a tu usuario a la base de datos de Mongo Atlas
- `/chat`:Puedes utilizar tambien esta ruta para enviar el mensaje desde POSTMAN seleccionando POST

```json
{
    "user": "Nombre",
    "message": "Esto es un mensaje"
}
```

## Estructura del Proyecto
```
Tercera Entrega/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── errores.js
│   │   ├── middlewares.js
│   │   ├── nodemailer.js
│   │   ├── session.js
│   │   ├── twilio.js
│   │   └── passport.config.js
│   ├── controllers/
│   │   ├── Cartcontroller.js
│   │   ├── Productcontroller.js
│   │   ├── Usercontroller.js
│   │   ├── CartManager.js
│   │   ├── multer.js
│   │   └── ProductManager.js
│   ├── DAO/
│   │   ├── classes/
│   │   │   ├── CartDao.js
│   │   │   ├── ProductDao.js
│   │   │   └── UserDao.js
│   │   ├── models/
│   │   │   ├── CartModel.js
│   │   │   ├── MessageModel.js
│   │   │   ├── ProductModel.js
│   │   │   ├── TicketModel.js
│   │   │   └── UserModel.js
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── files/
│   ├── router/
│   │   ├── carts.routes.js
│   │   ├── messages.routes.js
│   │   ├── product.routes.js
│   │   ├── upload.routes.js
│   │   ├── user.routes.js
│   │   └── views.routes.js
│   ├── repositories/
│   │   ├── CartRepository.json
│   │   ├── ProductRepository.json
│   │   └── UserRepository.js
│   ├── views/
│   │   ├──layaouts/
│   │   ├── addProduct.handlebars
│   │   ├── cart.handlebars
│   │   ├── chat.handlebars
│   │   ├── detail.handlebars
│   │   ├── faker.handlebars
│   │   ├── home.handlebars
│   │   ├── login.handlebars
│   │   ├── productos.handlebars
│   │   ├── productAdded.handlebars
│   │   ├── profile.handlebars
│   │   └── register.handlebars
│   ├── app.js
│   ├── index.js
│   └── utils.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```



## Tecnologías Utilizadas

- Node.js: Entorno de ejecución de JavaScript del lado del servidor.
- Express.js: Framework web para Node.js que permite construir aplicaciones web rápidas y robustas.
- MongoDB: Base de datos NoSQL flexible y escalable.
- Handlebars: Motor de plantillas para generar vistas dinámicas en el servidor.
- Mongoose: Biblioteca de modelado de objetos MongoDB para Node.js.
- cookie-parser: Middleware para analizar cookies en las solicitudes.
- express-session: Middleware para la gestión de sesiones en Express.js.
- session-file-store: Almacenamiento de sesiones basado en archivos para Express.js.
- connect-mongo: Implementación de MongoDB para el almacenamiento de sesiones en Express.js.
- bcrypt: Biblioteca para el hashing de contraseñas.
- passport: Middleware de autenticación para Node.js.
- dotenv: Módulo que carga variables de entorno desde un archivo .env.
- uuid: Librería para la generación de identificadores únicos universales (UUID). Se utiliza para crear identificadores únicos basados en estándares y métodos de generación de UUID.



## Capturas de Pantalla

![Captura de Pantalla 1](/src/public/files/Capturadepantalla1.png)
![Captura de Pantalla 2](/src/public/files/Capturadepantalla2.png)
![Captura de Pantalla 3](/src/public/files/Capturadepantalla3.png)
![Captura de Pantalla 4](/src/public/files/Capturadepantalla4.png)
![Captura de Pantalla 5](/src/public/files/Capturadepantalla5.png) 
![Captura de Pantalla 6](/src/public/files/Capturadepantalla6.png)
![Captura de Pantalla 7](/src/public/files/Capturadepantalla7.png)
