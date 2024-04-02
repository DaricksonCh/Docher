import { validationResult } from 'express-validator';
import * as facturaModel from '../models/facturaModel.js';

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

    const result = await facturaModel.guardarFactura(fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto);
    if (result) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la factura." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la factura." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarFactura: " + e });
  }
};

export const listarFacturas = async (req, res) => {
  try {
    const result = await facturaModel.listarFacturas();
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

export const buscarFactura = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await facturaModel.buscarFactura(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar factura: ' + e });
  }
};

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

    const result = await facturaModel.actualizarFactura(id, fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto);
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la factura" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la factura" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar factura: ' + e });
  }
};
