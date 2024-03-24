import { validationResult } from 'express-validator';
import pool from '../config/database'; // Asegúrate de importar tu configuración de base de datos

// Función para guardar una nueva notificación de contrato
export const guardarNotificacionContrato = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let { fecha, fk_contrato, estado } = req.body;

    // Si la notificación de contrato no existe, procedemos con la inserción
    const sql = "INSERT INTO notificacionescontratos (fecha, fk_contrato, estado) VALUES (?, ?, ?)";
    const [rows] = await pool.query(sql, [fecha, fk_contrato, estado]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la notificación de contrato." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la notificación de contrato." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarNotificacionContrato: " + e });
  }
};

// Función para listar todas las notificaciones de contratos
export const listarNotificacionesContratos = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM notificacionescontratos`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron notificaciones de contratos."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar notificaciones de contratos: " + e,
    });
  }
};

// Función para buscar una notificación de contrato por su ID
export const buscarNotificacionContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM notificacionescontratos WHERE idNotificacion = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar notificación de contrato: ' + e });
  }
};

// Función para actualizar una notificación de contrato
export const actualizarNotificacionContrato = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { fecha, fk_contrato, estado } = req.body;

    let sql = `UPDATE notificacionescontratos SET fecha=?, fk_contrato=?, estado=? WHERE idNotificacion=?`;
    const [rows] = await pool.query(sql, [fecha, fk_contrato, estado, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la notificación de contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la notificación de contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar notificación de contrato: ' + e });
  }
};

// Función para desactivar una notificación de contrato
export const desactivarNotificacionContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("UPDATE notificacionescontratos SET estado = 0 WHERE idNotificacion = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se desactivó con éxito la notificación de contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo desactivar la notificación de contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al desactivar notificación de contrato: ' + e });
  }
};

// Función para activar una notificación de contrato
export const activarNotificacionContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("UPDATE notificacionescontratos SET estado = 1 WHERE idNotificacion = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se activó con éxito la notificación de contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo activar la notificación de contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al activar notificación de contrato: ' + e });
  }
};
