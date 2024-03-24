import {pool} from '../database/conexion.js';

// Función para guardar un contrato
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

    // Verificar si el contrato ya existe en la tabla de contratos
    const [existingContract] = await pool.query(
      "SELECT idContrato FROM contratos WHERE numeroContrato = ?",
      [numeroContrato]
    );

    if (existingContract.length > 0) {
      return res.status(409).json({
        status: 409,
        message: "El contrato ya existe, no se pueden registrar datos repetidos."
      });
    }

    // Si el contrato no existe, procedemos con la inserción
    const sql = "INSERT INTO contratos (numeroContrato, fechaInicio, fechaFin, valorContrato) VALUES (?, ?, ?, ?)";
    const [rows] = await pool.query(sql, [numeroContrato, fechaInicio, fechaFin, valorContrato]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se registró con éxito el contrato." });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo registrar el contrato." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error en guardarContrato: " + e });
  }
};

// Función para listar todos los contratos
export const listarContratos = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM contratos`
    );
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

// Función para buscar un contrato por su ID
export const buscarContrato = async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await pool.query(
      "SELECT * FROM contratos WHERE idContrato = ?",
      [id]
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error al buscar contrato: ' + e });
  }
};

// Función para actualizar un contrato
export const actualizarContrato = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(403).json({ status: 403, error });
    }
    let id = req.params.id;
    let { numeroContrato, fechaInicio, fechaFin, valorContrato } = req.body;
    let sql = `UPDATE contratos SET numeroContrato=?, fechaInicio=?, fechaFin=?, valorContrato=? WHERE idContrato=?`;
    const [rows] = await pool.query(sql, [numeroContrato, fechaInicio, fechaFin, valorContrato, id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se actualizó con éxito el contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo actualizar el contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al actualizar contrato: ' + e });
  }
};

// Función para deshabilitar un contrato
export const deshabilitarContrato = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `UPDATE contratos SET estado = 0 WHERE idContrato = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se deshabilitó con éxito el contrato" });
    } else {
      res.status(401).json({ status: 401, message: "No se pudo deshabilitar el contrato" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al deshabilitar contrato: ' + e });
  }
};

// Función para habilitar un contrato
export const habilitarContrato = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `UPDATE contratos SET estado = 1 WHERE idContrato = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Se habilitó con éxito el contrato" });
    } else {
      res.status(404).json({ status: 404, message: "No se encontró el contrato para habilitar" });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al habilitar contrato: ' + e });
  }
};