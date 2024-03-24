import { validationResult } from 'express-validator';
import pool from '../config/database'; // Asegúrate de importar tu configuración de base de datos

// Función para guardar una nueva empresa
export const guardarEmpresa = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let {
      nombreEmpresa,
      telefonoEmpresa,
      tipoEmpresa,
      direccionEmpresa,
      departamentoEmpresa,
      municipioEmpresa,
      nitEmpresa,
      logoEmpresa,
      correoEmpresa,
      estado,
      fk_contrato
    } = req.body;

    // Si la empresa no existe, procedemos con la inserción
    const sql = "INSERT INTO empresas (nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [rows] = await pool.query(sql, [nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito la empresa." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar la empresa." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarEmpresa: " + e });
  }
};

// Función para listar todas las empresas
export const listarEmpresas = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM empresas`
    );
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        "status": 204,
        "message": "No se encontraron empresas."
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Error al listar empresas: " + e,
    });
  }
};

// Función para buscar una empresa por su ID
export const buscarEmpresa = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM empresas WHERE idempresa = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar empresa: ' + e });
  }
};

// Función para actualizar una empresa
export const actualizarEmpresa = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let {
      nombreEmpresa,
      telefonoEmpresa,
      tipoEmpresa,
      direccionEmpresa,
      departamentoEmpresa,
      municipioEmpresa,
      nitEmpresa,
      logoEmpresa,
      correoEmpresa,
      estado,
      fk_contrato
    } = req.body;

    let sql = `UPDATE empresas SET nombreEmpresa=?, telefonoEmpresa=?, tipoEmpresa=?, direccionEmpresa=?, departamentoEmpresa=?, municipioEmpresa=?, nitEmpresa=?, logoEmpresa=?, correoEmpresa=?, estado=?, fk_contrato=? WHERE idempresa=?`;
    const [rows] = await pool.query(sql, [nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito la empresa" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar la empresa" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar empresa: ' + e });
  }
};

// Función para eliminar una empresa
export const eliminarEmpresa = async (req, res) => {
  try {
    let id = req.params.id;
    const [rows] = await pool.query("DELETE FROM empresas WHERE idempresa = ?", [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se eliminó con éxito la empresa" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo eliminar la empresa" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al eliminar empresa: ' + e });
  }
};
