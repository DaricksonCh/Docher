import { validationResult } from 'express-validator';
import * as notificacionContratoModel from '../models/notificacionContratoModel.js';

export const guardarNotificacionContrato = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let { fecha, fk_contrato, estado } = req.body;

    const result = await notificacionContratoModel.guardarNotificacionContrato(fecha, fk_contrato, estado);
    if (result) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la notificación de contrato." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la notificación de contrato." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarNotificacionContrato: " + e });
  }
};

export const listarNotificacionesContratos = async (req, res) => {
  try {
    const result = await notificacionContratoModel.listarNotificacionesContratos();
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

export const buscarNotificacionContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await notificacionContratoModel.buscarNotificacionContrato(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar notificación de contrato: ' + e });
  }
};

export const actualizarNotificacionContrato = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { fecha, fk_contrato, estado } = req.body;

    const result = await notificacionContratoModel.actualizarNotificacionContrato(id, fecha, fk_contrato, estado);
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la notificación de contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la notificación de contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar notificación de contrato: ' + e });
  }
};

export const desactivarNotificacionContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await notificacionContratoModel.desactivarNotificacionContrato(id);
    if (result) {
      res.status(200).json({ status: 200, message: "Se desactivó con éxito la notificación de contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo desactivar la notificación de contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al desactivar notificación de contrato: ' + e });
  }
};

export const activarNotificacionContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await notificacionContratoModel.activarNotificacionContrato(id);
    if (result) {
      res.status(200).json({ status: 200, message: "Se activó con éxito la notificación de contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo activar la notificación de contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al activar notificación de contrato: ' + e });
  }
};
