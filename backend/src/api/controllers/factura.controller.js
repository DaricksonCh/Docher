import { validationResult } from 'express-validator';
import pool from '../config/database'; // Asegúrate de importar tu configuración de base de datos

// Función para guardar una nueva factura
export const guardarFactura = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      fechaFactura,
      precioTotal,
      codigoFactura,
      cantidadProducto,
      fk_producto
    } = req.body;

    // Si la factura no existe, procedemos con la inserción
    const sql = "INSERT INTO facturas (fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await pool.query(sql, [fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la factura." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la factura." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarFactura: " + e });
  }
};

// Función para listar todas las facturas
export const listarFacturas = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM facturas`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron facturas."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar facturas: " + e,
    });
  }
};

// Función para buscar una factura por su ID
export const buscarFactura = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM facturas WHERE idFacturas = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar factura: ' + e });
  }
};

// Función para actualizar una factura
export const actualizarFactura = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let {
      fechaFactura,
      precioTotal,
      codigoFactura,
      cantidadProducto,
      fk_producto
    } = req.body;

    let sql = `UPDATE facturas SET fechaFactura=?, precioTotal=?, codigoFactura=?, cantidadProducto=?, fk_producto=? WHERE idFacturas=?`;
    const [rows] = await pool.query(sql, [fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la factura" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la factura" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar factura: ' + e });
  }
};

// Función para eliminar una factura
export const eliminarFactura = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("DELETE FROM facturas WHERE idFacturas = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se eliminó con éxito la factura" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo eliminar la factura" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar factura: ' + e });
  }
};
