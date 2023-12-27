import express from 'express';
import { engine } from 'express-handlebars';
import * as path from 'path';
import passport from 'passport';
import initializePassword from './config/passport.config.js';
import __dirname from './utils.js';
import session from 'express-session';
import sessionConfig from './config/session.js';
import connectDB from './config/db.js';
import viewsRouter from './router/views.routes.js';
import cartsRouter from './router/carts.routes.js';
import productsRouter from './router/product.routes.js';
import userRouter from './router/user.routes.js';
import messagesRouter from "./router/messages.routes.js"
import Chance from 'chance';

import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

// Configuración de .env
import dotenv from 'dotenv';
dotenv.config();

// Inicializar la aplicación de Express
const app = express();

// Define tus helpers personalizados
const customHandlebarsHelpers = {
  eq: (v1, v2) => v1 === v2,
  or: (v1, v2) => v1 || v2,
  // Puedes añadir más helpers aquí si es necesario
};

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Conectar a la base de datos MongoDB
connectDB();

// Configuración de la sesión
app.use(session(sessionConfig));

// ---------------------------------------------

//Passport
initializePassword()
app.use(passport.initialize())
app.use(passport.session())

//Rutas CRUD con Postman
app.use("/api/carts", cartsRouter)
app.use("/api/prod", productsRouter)
app.use("/api/user", userRouter)
app.use("/api/msg", messagesRouter)

//handlebars
app.engine('handlebars', engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: customHandlebarsHelpers
}));
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.set("views", __dirname+"/views")



const chance = new Chance()
//Mocking con 100 productos
app.get('/mockingproducts', (req, res) => {
  const mockProducts = [];

  for (let i = 0; i < 100; i++) {
    const mockProduct = {
      _id: i + 1,
      title: chance.name(),
      price: chance.floating({ min: 0, max: 100, fixed: 2 }),
      minimo: chance.integer({ min: 50, max: 200 }),
      carru1: chance.avatar({protocol: 'https'})
    };

    mockProducts.push(mockProduct);
  }

  res.render('faker', { products: mockProducts });
});



//Css static
app.use("/", express.static(__dirname + "/public"))

//URLs al Front
app.use('/', viewsRouter);


export default app;

