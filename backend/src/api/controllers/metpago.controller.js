import * as metodoPagoModel from '../models/metodoPagoModel.js';
import { validationResult } from 'express-validator';


export const guardarMetodoPago = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let { metodoPago, descripcionPago } = req.body;

    const result = await metodoPagoModel.guardarMetodoPago(metodoPago, descripcionPago);
    if (result) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el método de pago." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el método de pago." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarMetodoPago: " + e });
  }
};

export const listarMetodosPago = async (req, res) => {
  try {
    const result = await metodoPagoModel.listarMetodosPago();
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


export const buscarMetodoPago = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await metodoPagoModel.buscarMetodoPago(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar método de pago: ' + e });
  }
};

export const actualizarMetodoPago = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { metodoPago, descripcionPago } = req.body;

    const result = await metodoPagoModel.actualizarMetodoPago(id, metodoPago, descripcionPago);
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el método de pago" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el método de pago" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar método de pago: ' + e });
  }
};

