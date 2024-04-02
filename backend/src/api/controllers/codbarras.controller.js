import { validationResult } from 'express-validator';
import * as codigoBarraModel from '../models/codigoBarraModel.js';


export const guardarCodigoBarra = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let { codigoBarra } = req.body;

    const result = await codigoBarraModel.guardarCodigoBarra(codigoBarra);
    if (result) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el código de barras." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el código de barras." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarCodigoBarra: " + e });
  }
};

export const listarCodigoBarra = async (req, res) => {
  try {
    const result = await codigoBarraModel.listarCodigosBarra();
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

export const buscarCodigoBarra = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await codigoBarraModel.buscarCodigoBarra(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar código de barras: ' + e });
  }
};

export const actualizarCodigoBarra = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { codigoBarra } = req.body;

    const result = await codigoBarraModel.actualizarCodigoBarra(id, codigoBarra);
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el código de barras" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el código de barras" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar código de barras: ' + e });
  }
};


