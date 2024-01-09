openapi: 3.0.0
info:
  title: Documentación API Completa
  description: API para la gestión de carritos, productos y usuarios
  version: 1.0.0

tags:
  - name: Carts
    description: Operaciones de Carritos
  - name: Products
    description: Operaciones de Productos
  - name: Users
    description: Operaciones de Usuarios

paths:
  # Paths para Carritos
  /api/carts:
    get:
      summary: Obtiene todos los carritos
      tags:
        - Carts
      responses:
        "200":
          description: Lista de carritos
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Cart'
        "500":
          description: Error interno del servidor

  /api/carts/{id}:
    get:
      summary: Obtiene un carrito por ID
      tags:
        - Carts
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Detalles del carrito
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Cart'
        "404":
          description: Carrito no encontrado
        "500":
          description: Error interno del servidor

    put:
      summary: Actualiza un carrito
      tags:
        - Carts
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Cart'
      responses:
        "200":
          description: Carrito actualizado satisfactoriamente
        "404":
          description: Carrito no encontrado
        "500":
          description: Error interno del servidor

    delete:
      summary: Elimina un carrito
      tags:
        - Carts
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Carrito eliminado satisfactoriamente
        "404":
          description: Carrito no encontrado
        "500":
          description: Error interno del servidor

components:
  schemas:
    Cart:
      type: object
      required:
        - products
      properties:
        products:
          type: array
          items:
            $ref: '#/components/schemas/Product'
    Product:
      type: object
      required:
        - productId
        - quantity
      properties:
        productId:
          type: string
        quantity:
          type: number

  # Paths para Productos
  /api/prod:
    get:
      summary: Obtiene todos los productos
      tags:
        - Products
      responses:
        "200":
          description: Lista de productos
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'
        "500":
          description: Error interno del servidor

  /api/prod/{id}:
    get:
      summary: Obtiene un producto por ID
      tags:
        - Products
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Detalles del producto
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Product'
        "404":
          description: Producto no encontrado
        "500":
          description: Error interno del servidor

  /api/prod/add:
    post:
      summary: Agrega un nuevo producto
      tags:
        - Products
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Product'
      responses:
        "200":
          description: Producto agregado satisfactoriamente
        "500":
          description: Error interno del servidor

  /api/prod/update/{id}:
    put:
      summary: Actualiza un producto existente
      tags:
        - Products
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Product'
      responses:
        "200":
          description: Producto actualizado satisfactoriamente
        "404":
          description: Producto no encontrado
        "500":
          description: Error interno del servidor

  /api/prod/delete/{id}:
    delete:
      summary: Elimina un producto
      tags:
        - Products
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Producto eliminado satisfactoriamente
        "404":
          description: Producto no encontrado
        "500":
          description: Error interno del servidor

  # Paths para Usuarios
  /api/user/register:
    post:
      summary: Registra un nuevo usuario
      tags:
        - Users
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        "200":
          description: Usuario registrado satisfactoriamente
        "400":
          description: Datos faltantes o inválidos
        "500":
          description: Error interno del servidor

  /api/user/login:
    post:
      summary: Inicia sesión de usuario
      tags:
        - Users
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                password:
                  type: string
      responses:
        "200":
          description: Inicio de sesión exitoso
        "400":
          description: Credenciales inválidas
        "500":
          description: Error interno del servidor

  /api/user/logout:
    get:
      summary: Cierra la sesión del usuario
      tags:
        - Users
      responses:
        "200":
          description: Sesión cerrada satisfactoriamente
        "500":
          description: Error interno del servidor

  /api/user/users:
    get:
      summary: Obtiene todos los usuarios
      tags:
        - Users
      responses:
        "200":
          description: Lista de usuarios
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
        "500":
          description: Error interno del servidor

  /api/user/users/{userId}:
    get:
      summary: Obtiene un usuario por ID
      tags:
        - Users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Detalles del usuario
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        "404":
          description: Usuario no encontrado
        "500":
          description: Error interno del servidor

components:
  schemas:
    # Schemas para Carritos
    Cart:
      type: object
      required:
        - products
      properties:
        products:
          type: array
          items:
            $ref: '#/components/schemas/Product'

    # Schemas para Productos
    Product:
      type: object
      required:
        - title
        - description
        - price
        - stock
        - category
        - thumbnails
      properties:
        title:
          type: string
        description:
          type: string
        price:
          type: number
        stock:
          type: number
        category:
          type: string
        thumbnails:
          type: string
        carru1:
          type: string
        carru2:
          type: string
        carru3:
          type: string
        minimo:
          type: number
        availability:
          type: boolean

    # Schemas para Usuarios
    User:
      type: object
      required:
        - first_name
        - last_name
        - email
        - age
        - password
        - rol
      properties:
        first_name:
          type: string
        last_name:
          type: string
        email:
          type: string
        age:
          type: integer
        password:
          type: string
        rol:
          type: string


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

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Express.js**: Framework web para Node.js que permite construir aplicaciones web rápidas y robustas.
- **MongoDB**: Base de datos NoSQL flexible y escalable.
- **Mongoose**: Biblioteca de modelado de objetos MongoDB para Node.js.
- **Handlebars**: Motor de plantillas para generar vistas dinámicas en el servidor.
- **@handlebars/allow-prototype-access**: Proporciona acceso a los prototipos en Handlebars.
- **Bcrypt**: Biblioteca para el hashing de contraseñas.
- **Chance**: Generador de datos aleatorios para Node.js.
- **Connect-Mongo**: Implementación de MongoDB para el almacenamiento de sesiones en Express.js.
- **Cookie-Parser**: Middleware para analizar cookies en las solicitudes.
- **Dotenv**: Módulo que carga variables de entorno desde un archivo .env.
- **Express-Session**: Middleware para la gestión de sesiones en Express.js.
- **JsonWebToken (JWT)**: Implementa el estándar JSON Web Tokens para la creación de tokens de acceso.
- **Nodemailer**: Módulo para enviar correos electrónicos con Node.js.
- **Nodemon**: Herramienta de desarrollo que reinicia automáticamente el servidor cuando se detectan cambios en los archivos.
- **Passport**: Middleware de autenticación para Node.js.
- **Passport-Github2**: Estrategia de autenticación de Passport usando GitHub.
- **Passport-JWT**: Estrategia de autenticación de Passport usando JSON Web Tokens.
- **Passport-Local**: Estrategia de autenticación de Passport usando un nombre de usuario y contraseña.
- **Session-File-Store**: Almacenamiento de sesiones basado en archivos para Express.js.
- **Swagger-JSDoc**: Genera documentación OpenAPI (Swagger) basada en comentarios JSDoc.
- **Swagger-UI-Express**: Permite servir documentos Swagger y Swagger UI generados automáticamente.
- **Twilio**: API para enviar SMS y realizar llamadas telefónicas.
- **UUID**: Librería para la generación de identificadores únicos universales (UUID).



## Capturas de Pantalla

![Captura de Pantalla 1](/src/public/files/Capturadepantalla1.png)
![Captura de Pantalla 2](/src/public/files/Capturadepantalla2.png)
![Captura de Pantalla 3](/src/public/files/Capturadepantalla3.png)
