import { pool } from '../../config/conexion.js';


export const guardarMetodoPago = async (metodoPago, descripcionPago) => {
    try {
        // Si el método de pago no existe, procedemos con la inserción
        const sql = "INSERT INTO metodopagos (metodoPago, descripcionPago) VALUES (?, ?)";
        const [rows] = await pool.query(sql, [metodoPago, descripcionPago]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const listarMetodosPago = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM metodopagos`);
        return result;
    } catch (e) {
        throw e;
    }
};

export const buscarMetodoPago = async (id) => {
    try {
        const [result] = await pool.query("SELECT * FROM metodopagos WHERE idMetodoPagos = ?", [id]);
        return result;
    } catch (e) {
        throw e;
    }
};

export const actualizarMetodoPago = async (id, metodoPago, descripcionPago) => {
    try {
        let sql = `UPDATE metodopagos SET metodoPago=?, descripcionPago=? WHERE idMetodoPagos=?`;
        const [rows] = await pool.query(sql, [metodoPago, descripcionPago, id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};