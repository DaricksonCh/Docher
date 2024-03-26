import { validationResult } from 'express-validator';
import pool from '../config/'; // Asegúrate de importar tu configuración de base de datos

// Función para guardar un nuevo código de barras
export const guardarCodigoBarra = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let { codigoBarra } = req.body;

    // Si el código de barras no existe, procedemos con la inserción
    const sql = "INSERT INTO codigobarras (codigoBarra) VALUES (?)";
    const [rows] = await pool.query(sql, [codigoBarra]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el código de barras." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el código de barras." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarCodigoBarra: " + e });
  }
};

// Función para listar todos los códigos de barras
export const listarCodigosBarra = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM codigobarras`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron códigos de barras."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar códigos de barras: " + e,
    });
  }
};

// Función para buscar un código de barras por su ID
export const buscarCodigoBarra = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM codigobarras WHERE idCodigoBarra = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar código de barras: ' + e });
  }
};

// Función para actualizar un código de barras
export const actualizarCodigoBarra = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { codigoBarra } = req.body;

    let sql = `UPDATE codigobarras SET codigoBarra=? WHERE idCodigoBarra=?`;
    const [rows] = await pool.query(sql, [codigoBarra, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el código de barras" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el código de barras" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar código de barras: ' + e });
  }
};

// Función para eliminar un código de barras
export const eliminarCodigoBarra = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("DELETE FROM codigobarras WHERE idCodigoBarra = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se eliminó con éxito el código de barras" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo eliminar el código de barras" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar código de barras: ' + e });
  }
};
