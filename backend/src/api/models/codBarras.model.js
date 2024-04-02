import pool from '../../config/conexion.js';

export const guardarCodigoBarra = async (codigoBarra) => {
    try {
        const sql = "INSERT INTO codigobarras (codigoBarra) VALUES (?)";
        const [rows] = await pool.query(sql, [codigoBarra]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const listarCodigosBarra = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM codigobarras`);
        return result;
    } catch (e) {
        throw e;
    }
};

export const buscarCodigoBarra = async (id) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM codigobarras WHERE idCodigoBarra = ?",
            [id]
        );
        return result;
    } catch (e) {
        throw e;
    }
};

export const actualizarCodigoBarra = async (id, codigoBarra) => {
    try {
        const sql = `UPDATE codigobarras SET codigoBarra=? WHERE idCodigoBarra=?`;
        const [rows] = await pool.query(sql, [codigoBarra, id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};
