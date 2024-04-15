import pool from '../../config/conexion.js';

export const guardarNotificacionContrato = async (fecha, fk_contrato, estado) => {
    try {
        const sql = "INSERT INTO notificacionescontratos (fecha, fk_contrato, estado) VALUES (?, ?, ?)";
        const [rows] = await pool.query(sql, [fecha, fk_contrato, estado]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const listarNotificacionesContratos = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM notificacionescontratos`);
        return result;
    } catch (e) {
        throw e;
    }
};

export const buscarNotificacionContrato = async (id) => {
    try {
        const [result] = await pool.query(
          "SELECT * FROM notificacionescontratos WHERE idNotificacion = ?",
        [id]
        );
        return result;
    } catch (e) {
        throw e;
    }
};

export const actualizarNotificacionContrato = async (id, fecha, fk_contrato, estado) => {
    try {
        let sql = `UPDATE notificacionescontratos SET fecha=?, fk_contrato=?, estado=? WHERE idNotificacion=?`;
        const [rows] = await pool.query(sql, [fecha, fk_contrato, estado, id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const desactivarNotificacionContrato = async (id) => {
    try {
        const [rows] = await pool.query("UPDATE notificacionescontratos SET estado = 0 WHERE idNotificacion = ?", [id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const activarNotificacionContrato = async (id) => {
    try {
        const [rows] = await pool.query("UPDATE notificacionescontratos SET estado = 1 WHERE idNotificacion = ?", [id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};