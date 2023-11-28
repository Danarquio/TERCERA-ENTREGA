import ProductManager from '../controllers/ProductManager.js';

const productManager = new ProductManager();

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productManager.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error al obtener los productos' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productManager.getProductById(productId);

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error al obtener el producto por ID' });
    }
  },

  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      const result = await productManager.addProducts(productData);

      //res.status(201).json({ message: 'Producto agregado correctamente', product: result });
      //renderizado de producto agregado a la base de datos
      res.render('productAdded', { title: result.title, price: result.price });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error al agregar el producto' });
    }
  },

  updateProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const productData = req.body;
      const result = await productManager.updateProducts(productId, productData);

      if (result) {
        res.json({ message: 'Producto actualizado correctamente', product: result });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error al actualizar el producto' });
    }
  },

  deleteProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const result = await productManager.deleteProducts(productId);

      if (result) {
        res.json({ message: 'Producto eliminado correctamente', product: result });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error al eliminar el producto' });
    }
  },
};

export default ProductController;
