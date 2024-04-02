import {pool} from '../database/conexion.js';
import * as contratoModel from '../models/contratoModel.js';


export const guardarContrato = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      numeroContrato,
      fechaInicio,
      fechaFin,
      valorContrato
    } = req.body;

    const result = await contratoModel.guardarContrato(numeroContrato, fechaInicio, fechaFin, valorContrato);
    if (result.status === 409) {
      return res.status(409).json(result);
    } else if (result.status === 200) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarContrato: " + e });
  }
};

export const listarContratos = async (req, res) => {
  try {
    const result = await contratoModel.listarContratos();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron contratos."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar contratos: " + e,
    });
  }
};

export const buscarContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await contratoModel.buscarContrato(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar contrato: ' + e });
  }
};

export const actualizarContrato = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { numeroContrato, fechaInicio, fechaFin, valorContrato } = req.body;

    const result = await contratoModel.actualizarContrato(id, numeroContrato, fechaInicio, fechaFin, valorContrato);
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar contrato: ' + e });
  }
};

export const deshabilitarContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await contratoModel.deshabilitarContrato(id);
    if (result) {
      res.status(200).json({ status: 200, message: "Se deshabilitó con éxito el contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo deshabilitar el contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al deshabilitar contrato: ' + e });
  }
};

export const habilitarContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await contratoModel.habilitarContrato(id);
    if (result) {
      res.status(200).json({ status: 200, message: "Se habilitó con éxito el contrato" });
    } else {
      res.status(404).json({ status: 404, message: "No se encontró el contrato para habilitar" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al habilitar contrato: ' + e });
  }
};