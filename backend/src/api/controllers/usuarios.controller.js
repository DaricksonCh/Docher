import { validationResult } from 'express-validator';
import * as usuarioModel from '../models/usuarioModel.js';
import { pool } from '../../config/conexion.js';

// Función para registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreUsuario,
      rolUsuario,
      documentoUsuario,
      correoUsuario,
      password,
      fk_empresa
    } = req.body;

    const success = await usuarioModel.guardarUsuario(nombreUsuario,rolUsuario,documentoUsuario,correoUsuario,password,fk_empresa)
    if(success){
      res.status(200).json({ status: 200, message: "Se registró con éxito el usuario." });
    }else{
      res.status(401).json({ status: 401, message: "No se pudo registrar el usuario." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en registrarUsuario: " + e });
  }
};

// Función para listar todos los usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.listarUsuarios();
    if (usuarios.length > 0) {
      res.status(200).json(cajas);
    } else {
      res.status(204).json({ status: 204, message: "No se encontraron usuarios." });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar usuarios: " + e,
    });
  }
};

// Función para buscar un usuario por su ID
export const buscarUsuario = async (req, res) => {
  try {
    let id = req.params.id;
    const usuario = await usuarioModel.buscarUsuario(id);
    if (usuario.length > 0) {
      res.status(200).json(caja);
    } else {
      res.status(404).json({ status: 404, message: "usuario no encontrada." });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar usuario: ' + e });
  }
};

// Función para actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { nombreUsuario, rolUsuario, documentoUsuario, correoUsuario, password, fk_empresa } = req.body;

    const success = await usuarioModel.actualizarUsuario(nombreUsuario, rolUsuario, documentoUsuario, correoUsuario, password, fk_empresa);
    if (success) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito usuario." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar usuario." });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar usuario: ' + e });
  }
};
