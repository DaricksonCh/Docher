import { validationResult } from 'express-validator';
import pool from '../config/database'; // Asegúrate de importar tu configuración de base de datos

// Función para guardar un nuevo cliente
export const guardarCliente = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreCliente,
      documentoCliente,
      correoCliente,
      telefonoCliente,
      direccionCliente
    } = req.body;

    // Si el cliente no existe, procedemos con la inserción
    const sql = "INSERT INTO clientes (nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await pool.query(sql, [nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el cliente." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el cliente." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarCliente: " + e });
  }
};

// Función para listar todos los clientes
export const listarClientes = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM clientes`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron clientes."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar clientes: " + e,
    });
  }
};

// Función para buscar un cliente por su ID
export const buscarCliente = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM clientes WHERE idCliente = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar cliente: ' + e });
  }
};

// Función para actualizar un cliente
export const actualizarCliente = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente } = req.body;

    let sql = `UPDATE clientes SET nombreCliente=?, documentoCliente=?, correoCliente=?, telefonoCliente=?, direccionCliente=? WHERE idCliente=?`;
    const [rows] = await pool.query(sql, [nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el cliente" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el cliente" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar cliente: ' + e });
  }
};

// Función para eliminar un cliente
export const eliminarCliente = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("DELETE FROM clientes WHERE idCliente = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se eliminó con éxito el cliente" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo eliminar el cliente" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar cliente: ' + e });
  }
};
