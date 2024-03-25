import { validationResult } from 'express-validator';
import * as productoModel from '../models/productosModel.js';
// Función para guardar un nuevo producto
export const guardarProducto = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreProducto,
      unidadMedida,
      descripcionProducto,
      precioProducto,
      stock,
      fk_codigoBarra,
      stockMin,
      fk_categoria
    } = req.body;

    // Verificar si el producto ya existe en la base de datos
    // const [existingProduct] = await pool.query(
    //   "SELECT idProducto FROM productos WHERE nombreProducto = ?",
    //   [nombreProducto]
    // );

    // if (existingProduct.length > 0) {
    //   return res.status(409).json({
    //     status: 409,
    //     message: "El producto ya existe, no se pueden registrar datos repetidos."
    //   });
    // }

    // Si el producto no existe, procedemos con la inserción
    const success = await productoModel.guardarProducto(nombreProducto,unidadMedida,descripcionProducto,precioProducto,stock,fk_codigoBarra,stockMin,fk_categoria)
    if (success) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el producto." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el producto." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarProducto: " + e });
  }
};

// Función para listar todos los productos
export const listarProductos = async (req, res) => {
  try {
    const productos = await productoModel.listarProductos();
    if (productos.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron productos."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar productos: " + e,
    });
  }
};

// Función para buscar un producto por su ID
export const buscarProducto = async (req, res) => {
  try {
    let id = req.params.id;
    const producto = await productoModel.buscarProducto(id);
    if (producto.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron producto."
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar producto: ' + e });
  }
};

// Función para actualizar un producto
export const actualizarProducto = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let {
      nombreProducto,
      unidadMedida,
      descripcionProducto,
      precioProducto,
      stock,
      fk_codigoBarra,
      stockMin,
      fk_categoria
    } = req.body;
    const success = await productoModel.actualizarProducto(nombreProducto,unidadMedida,descripcionProducto,precioProducto,stock,fk_codigoBarra,stockMin,fk_categoria);
    if (success.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el producto" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el producto" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar producto: ' + e });
  }
};