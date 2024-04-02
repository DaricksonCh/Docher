import { validationResult } from 'express-validator';
import * as clienteModel from '../models/clienteModel.js'

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

    const result = await clienteModel.guardarCliente(nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente)
    if (result) {
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
    const result = clienteModel.listarClientes();
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
    const result = clienteModel.buscarCliente(id);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontro el cliente."
      });
    }
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

    const result = await clienteModel.actualizarCliente( id, nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente,) 
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el cliente" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el cliente" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar cliente: ' + e });
  }
};


