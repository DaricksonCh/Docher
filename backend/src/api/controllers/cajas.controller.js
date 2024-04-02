import { validationResult } from 'express-validator';
import * as cajasModel from '../models/cajasModel.js';

// Función para guardar una nueva caja
export const guardarCaja = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreCaja,
      totalCaja,
      fk_empresa,
      fk_factura,
      fk_cliente,
      fk_metodo
    } = req.body;

    // Si el usuario no existe, procedemos con la inserción
    const success = await cajasModel.guardarCaja(nombreCaja, totalCaja, fk_empresa, fk_factura, fk_cliente, fk_metodo);
    if(success){
      res.status(200).json({ status: 200, message: "Se registró con éxito la caja." });
    }else{
      res.status(401).json({ status: 401, message: "No se pudo registrar la caja." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarCaja: " + e });
  }
};

// Función para listar todas las cajas
export const listarCajas = async (req, res) => {
  try {
    const cajas = await cajasModel.listarCajas();

    if (cajas.length > 0) {
      res.status(200).json(cajas);
    } else {
      res.status(204).json({ status: 204, message: "No se encontraron cajas." });
    }
  } catch (e) {
    res.status(500).json({ status: 500, message: "Error al listar cajas: " + e });
  }
};

// Función para buscar una caja por su ID
export const buscarCaja = async (req, res) => {
  try {
    const id = req.params.id;
    const caja = await cajasModel.buscarCajaPorId(id);

    if (caja.length > 0) {
      res.status(200).json(caja);
    } else {
      res.status(404).json({ status: 404, message: "Caja no encontrada." });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar caja: ' + e });
  }
};

// Función para actualizar una caja
export const actualizarCaja = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error: error.array() });
    }

    const id = req.params.id;
    const { nombreCaja, totalCaja, fk_empresa, fk_factura, fk_cliente, fk_metodo } = req.body;

    const success = await cajasModel.actualizarCaja(id, nombreCaja, totalCaja, fk_empresa, fk_factura, fk_cliente, fk_metodo);

    if (success) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la caja." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la caja." });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar caja: ' + e });
  }
};

