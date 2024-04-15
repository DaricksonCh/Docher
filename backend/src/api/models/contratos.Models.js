import { pool } from '../../config/conexion.js';

export const guardarContratosModel = async (numeroContrato, fechaInicio, fechaFin, valorContrato) => {
    try {
        // Verificar si el contrato ya existe en la tabla de contratos
        const [existingContract] = await pool.query(
            "SELECT idContrato FROM contratos WHERE numeroContrato = ?",
            [numeroContrato]
        );

        if (existingContract.length > 0) {
            return {
                status: 409,
                message: "El contrato ya existe, no se pueden registrar datos repetidos."
            };
        }

        // Si el contrato no existe, procedemos con la inserción
        const sql = "INSERT INTO contratos (numeroContrato, fechaInicio, fechaFin, valorContrato) VALUES (?, ?, ?, ?)";
        const [rows] = await pool.query(sql, [numeroContrato, fechaInicio, fechaFin, valorContrato]);
        if (rows.affectedRows > 0) {
            return { status: 200, message: "Se registró con éxito el contrato." };
        } else {
            return { status: 401, message: "No se pudo registrar el contrato." };
        }
    } catch (e) {
        throw e;
    }
};

export const listarContratosModel = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM contratos`);
        return result;
    } catch (e) {
        throw e;
    }
};

export const buscarContratoModel = async (id) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM contratos WHERE idContrato = ?",
            [id]
        );
        return result;
    } catch (e) {
        throw e;
    }
};

export const actualizarContratoModel = async (id, numeroContrato, fechaInicio, fechaFin, valorContrato) => {
    try {
        let sql = `UPDATE contratos SET numeroContrato=?, fechaInicio=?, fechaFin=?, valorContrato=? WHERE idContrato=?`;
        const [rows] = await pool.query(sql, [numeroContrato, fechaInicio, fechaFin, valorContrato, id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const deshabilitarContratoModel= async (id) => {
    try {
        let sql = `UPDATE contratos SET estado = 0 WHERE idContrato = ?`;
        const [rows] = await pool.query(sql, [id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const habilitarContratoModel = async (id) => {
    try {
        let sql = `UPDATE contratos SET estado = 1 WHERE idContrato = ?`;
        const [rows] = await pool.query(sql, [id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};