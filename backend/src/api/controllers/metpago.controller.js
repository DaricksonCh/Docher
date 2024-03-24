import { validationResult } from 'express-validator';
import pool from '../config/database'; // Asegúrate de importar tu configuración de base de datos

// Función para guardar un nuevo método de pago
export const guardarMetodoPago = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let { metodoPago, descripcionPago } = req.body;

    // Si el método de pago no existe, procedemos con la inserción
    const sql = "INSERT INTO metodopagos (metodoPago, descripcionPago) VALUES (?, ?)";
    const [rows] = await pool.query(sql, [metodoPago, descripcionPago]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el método de pago." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el método de pago." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarMetodoPago: " + e });
  }
};

// Función para listar todos los métodos de pago
export const listarMetodosPago = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM metodopagos`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron métodos de pago."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar métodos de pago: " + e,
    });
  }
};

// Función para buscar un método de pago por su ID
export const buscarMetodoPago = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM metodopagos WHERE idMetodoPagos = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar método de pago: ' + e });
  }
};

// Función para actualizar un método de pago
export const actualizarMetodoPago = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { metodoPago, descripcionPago } = req.body;

    let sql = `UPDATE metodopagos SET metodoPago=?, descripcionPago=? WHERE idMetodoPagos=?`;
    const [rows] = await pool.query(sql, [metodoPago, descripcionPago, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el método de pago" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el método de pago" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar método de pago: ' + e });
  }
};

// Función para eliminar un método de pago
export const eliminarMetodoPago = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("DELETE FROM metodopagos WHERE idMetodoPagos = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se eliminó con éxito el método de pago" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo eliminar el método de pago" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar método de pago: ' + e });
  }
};
