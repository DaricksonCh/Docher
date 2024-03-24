import { validationResult } from 'express-validator';
import pool from '../config/database'; // Asegúrate de importar tu configuración de base de datos

// Función para guardar un nuevo proveedor
export const guardarProveedor = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let { nombreProveedor, direccionProveedor, telefonoProveedor } = req.body;

    // Verificar si el proveedor ya existe en la base de datos
    const [existingProvider] = await pool.query(
      "SELECT idProveedor FROM proveedores WHERE nombreProveedor = ?",
      [nombreProveedor]
    );

    if (existingProvider.length > 0) {
      return res.status(409).json({
        status: 409,
        message: "El proveedor ya existe, no se pueden registrar datos repetidos."
      });
    }

    // Si el proveedor no existe, procedemos con la inserción
    const sql = "INSERT INTO proveedores (nombreProveedor, direccionProveedor, telefonoProveedor) VALUES (?, ?, ?)";
    const [rows] = await pool.query(sql, [nombreProveedor, direccionProveedor, telefonoProveedor]);
    if (rows.affectedRows > 0) {
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
    const [result] = await pool.query(
      `SELECT * FROM proveedores`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron proveedores."
      });
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
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM proveedores WHERE idProveedor = ?",
      [id]
    );
    res.status(200).json(result);
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
    let id = req.params.id;
    let { nombreProveedor, direccionProveedor, telefonoProveedor } = req.body;

    let sql = `UPDATE proveedores SET nombreProveedor=?, direccionProveedor=?, telefonoProveedor=? WHERE idProveedor=?`;
    const [rows] = await pool.query(sql, [nombreProveedor, direccionProveedor, telefonoProveedor, id]);
    if (rows.affectedRows > 0) {
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
