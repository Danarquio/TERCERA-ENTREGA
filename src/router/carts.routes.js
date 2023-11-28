import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const router = Router()
const cartManager = new CartManager()


//GESTION DE CARRITO
//obtener todos los carritos
router.get("/", async (req, res) => {
    try {
      const carts = await cartManager.getAllCarts();
      res.send({ result: "success", payload: carts });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Error al obtener carritos" });
    }
  });

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
      const result = await cartManager.addCart();
      res.send({ result: "success", payload: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Error al crear carrito" });
    }
  });

// put
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCart = req.body;
      const result = await cartManager.updateCart(id, updatedCart);
      res.send({ result: "success", payload: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Error al actualizar carrito" });
    }
  });

// Eliminar un carrito por ID
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await cartManager.deleteCart(id);
      res.send({ result: "success", payload: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Error al eliminar carrito" });
    }
  });




//GESTION DE PRODUCTOS DENTRO DE CARRITO
// Verificar si un producto está en el carrito
router.get("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;  // Obtener cartId de los parámetros de la URL
    const prodId = req.params.pid;  // Obtener prodId de los parámetros de la URL
  
    try {
      const result = await carts.existProductInCart(cartId, prodId);
  
      res.send({ result: "success", payload: result });
    } catch (error) {
      console.error("Error al verificar el producto en el carrito:", error);
      res.status(500).send({ status: "error", error: "Error al verificar el producto en el carrito" });
    }
  });
  
// Agregar productos a un carrito -- :cid es el id del carrito y :pid es el id del producto
router.post("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;
    let { product_id, quantity } = req.body; 

    try {
        const result = await cartManager.addProductInCart(cartId, prodId, product_id, quantity);

        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al agregar productos al carrito:", error);
        res.status(500).send({ status: "error", error: "Error al agregar productos al carrito" });
    }
});

// Modificar productos de un carrito
router.put("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;
    let { product_id, quantity } = req.body;

    try {
        const result = await cartManager.updateProductInCart(cartId, prodId, product_id, quantity);

        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al modificar productos en el carrito:", error);
        res.status(500).send({ status: "error", error: "Error al modificar productos en el carrito" });
    }
});

// Eliminar productos de un carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;

    try {
        const result = await cartManager.removeProductFromCart(cartId, prodId);

        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al eliminar productos del carrito:", error);
        res.status(500).send({ status: "error", error: "Error al eliminar productos del carrito" });
    }
});



//Population
//Traemos todos los carritos con http://localhost:8080/api/carts con get
router.get("/population/:cid", async (req,res)=>{
    let cartId = req.params.cid
    res.send(await cartManager.getCartWithProducts(cartId))
})



export default router;