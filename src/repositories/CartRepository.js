import { cartsModel } from '../DAO/models/carts.model.js';

class CartRepository {
  // Obtener todos los carritos
  async getAllCarts() {
    try {
      const carts = await cartsModel.find({});
      return carts;
    } catch (error) {
      throw new Error('Error al obtener carritos');
    }
  }

  // Obtener un carrito por ID
  async getCartById(cartId) {
    try {
      const cart = await cartsModel.findById(cartId);
      return cart;
    } catch (error) {
      throw new Error('Error al obtener carrito por ID');
    }
  }

  // Crear un nuevo carrito
  async createCart() {
    try {
      const newCart = new cartsModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error('Error al crear carrito');
    }
  }

  // Actualizar un carrito existente
  async updateCart(cartId, updatedCartData) {
    try {
      const updatedCart = await cartsModel.findByIdAndUpdate(cartId, updatedCartData, { new: true });
      return updatedCart;
    } catch (error) {
      throw new Error('Error al actualizar carrito');
    }
  }

  // Eliminar un carrito por ID
  async deleteCart(cartId) {
    try {
      const deletedCart = await cartsModel.findByIdAndDelete(cartId);
      return deletedCart;
    } catch (error) {
      throw new Error('Error al eliminar carrito');
    }
  }
}

export default CartRepository;
