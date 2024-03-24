import { validationResult } from 'express-validator';
import pool from '../config/database'; // Asegúrate de importar tu configuración de base de datos

// Función para guardar una nueva factura de proveedor
export const guardarFacturaProveedor = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreProducto,
      precioUnitario,
      stock,
      unidadMedida,
      precioTotal,
      fechaEntrega,
      fk_producto,
      fk_proveedor
    } = req.body;

    // Si la factura de proveedor no existe, procedemos con la inserción
    const sql = "INSERT INTO facturaproveedor (nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [rows] = await pool.query(sql, [nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la factura de proveedor." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la factura de proveedor." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarFacturaProveedor: " + e });
  }
};

// Función para listar todas las facturas de proveedor
export const listarFacturasProveedor = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM facturaproveedor`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron facturas de proveedor."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar facturas de proveedor: " + e,
    });
  }
};

// Función para buscar una factura de proveedor por su ID
export const buscarFacturaProveedor = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM facturaproveedor WHERE idFacturaProveedor = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar factura de proveedor: ' + e });
  }
};

// Función para actualizar una factura de proveedor
export const actualizarFacturaProveedor = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let {
      nombreProducto,
      precioUnitario,
      stock,
      unidadMedida,
      precioTotal,
      fechaEntrega,
      fk_producto,
      fk_proveedor
    } = req.body;

    let sql = `UPDATE facturaproveedor SET nombreProducto=?, precioUnitario=?, stock=?, unidadMedida=?, precioTotal=?, fechaEntrega=?, fk_producto=?, fk_proveedor=? WHERE idFacturaProveedor=?`;
    const [rows] = await pool.query(sql, [nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la factura de proveedor" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la factura de proveedor" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar factura de proveedor: ' + e });
  }
};

// Función para eliminar una factura de proveedor
export const eliminarFacturaProveedor = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("DELETE FROM facturaproveedor WHERE idFacturaProveedor = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se eliminó con éxito la factura de proveedor" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo eliminar la factura de proveedor" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar factura de proveedor: ' + e });
  }
}