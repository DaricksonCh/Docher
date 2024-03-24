import { validationResult } from 'express-validator';
import * as categoriasModel from '../models/categoriasModel';

export const guardarCategoria = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let { nombreCategoria } = req.body;

    const result = await categoriasModel.guardarCategoria(nombreCategoria);
    if (result) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la categoría." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la categoría." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarCategoria: " + e });
  }
};

export const listarCategorias = async (req, res) => {
  try {
    const result = await categoriasModel.listarCategorias();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ "status": 204, "message": "No se encontraron categorías." });
    }
  } catch (e) {
    res.status(500).json({ status: 500, message: "Error al listar categorías: " + e });
  }
};

export const buscarCategoria = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await categoriasModel.buscarCategoriaPorId(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar categoría: ' + e });
  }
};

export const actualizarCategoria = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { nombreCategoria } = req.body;

    const result = await categoriasModel.actualizarCategoria(id, nombreCategoria);
    if (result) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la categoría" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la categoría" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar categoría: ' + e });
  }
};

export const eliminarCategoria = async (req, res) => {
  try {
    let id = req.params.id;
    const result = await categoriasModel.eliminarCategoria(id);
    if (result) {
      res.status(200).json({ status: 200, message: "Se eliminó con éxito la categoría" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo eliminar la categoría" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar categoría: ' + e });
  }
};
