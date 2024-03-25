// proveedoresController.js
import { validationResult } from 'express-validator';
import * as proveedorModel from '../models/proveedorModel.js';

// Función para guardar un nuevo proveedor
export const guardarProveedor = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }

    const { nombreProveedor, direccionProveedor, telefonoProveedor } = req.body;

    const success = await proveedorModel.guardarProveedor(nombreProveedor, direccionProveedor, telefonoProveedor);
    if (success) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el proveedor." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el proveedor." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarProveedor: " + e });
  }
};

// Función para listar todos los proveedores
export const listarProveedores = async (req, res) => {
  try {
    const proveedores = await proveedorModel.listarProveedores();
    if (proveedores.length > 0) {
      res.status(200).json(proveedores);
    } else {
      res.status(204).json({ status: 204, message: "No se encontraron proveedores." });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar proveedores: " + e,
    });
  }
};

// Función para buscar un proveedor por su ID
export const buscarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await proveedorModel.buscarProveedor(id);
    if (proveedor.length > 0) {
      res.status(200).json(proveedor);
    } else {
      res.status(404).json({ status: 404, message: "Proveedor no encontrado." });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar proveedor: ' + e });
  }
};

// Función para actualizar un proveedor
export const actualizarProveedor = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }

    const { id } = req.params;
    const { nombreProveedor, direccionProveedor, telefonoProveedor } = req.body;

    const success = await proveedorModel.actualizarProveedor(id, nombreProveedor, direccionProveedor, telefonoProveedor);
    if (success) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el proveedor" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el proveedor" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar proveedor: ' + e });
  }
};

// Función para deshabilitar un proveedor
export const deshabilitarProveedor = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("UPDATE proveedores SET estado = 0 WHERE idProveedor = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se deshabilitó con éxito el proveedor" });
    } else {
      res.status(401).json({ status: 401, message: "No se deshabilitó el proveedor" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error en deshabilitarProveedor: ' + e });
  }
};

// Función para habilitar un proveedor
export const habilitarProveedor = async (req, res) => {
  try {
    let id = req.params.id; 
    const [rows] = await pool.query("UPDATE proveedores SET estado = 1 WHERE idProveedor = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se habilitó con éxito el proveedor" });
    } else {
      res.status(404).json({ status: 404, message: "No se encontró el proveedor para habilitar" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en habilitarProveedor: " + e });
  }
};
