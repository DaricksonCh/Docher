import pool from '../../config/conexion.js';


export const guardarEmpresa = async (nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato) => {
    try {
        // Si la empresa no existe, procedemos con la inserción
        const sql = "INSERT INTO empresas (nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const [rows] = await pool.query(sql, [nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const listarEmpresas = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM empresas`);
        return result;
    } catch (e) {
        throw e;
    }
};

export const buscarEmpresa = async (id) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM empresas WHERE idempresa = ?",
            [id]
        );
        return result;
    } catch (e) {
        throw e;
    }
};

export const actualizarEmpresa = async (id, nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato) => {
    try {
        let sql = `UPDATE empresas SET nombreEmpresa=?, telefonoEmpresa=?, tipoEmpresa=?, direccionEmpresa=?, departamentoEmpresa=?, municipioEmpresa=?, nitEmpresa=?, logoEmpresa=?, correoEmpresa=?, estado=?, fk_contrato=? WHERE idempresa=?`;
        const [rows] = await pool.query(sql, [nombreEmpresa, telefonoEmpresa, tipoEmpresa, direccionEmpresa, departamentoEmpresa, municipioEmpresa, nitEmpresa, logoEmpresa, correoEmpresa, estado, fk_contrato, id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const deshabilitarEmpresa = async (id) => {
    try {
        let sql = `UPDATE empresas SET estado = 0 WHERE idempresa = ?`;
        const [rows] = await pool.query(sql, [id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const habilitarEmpresa = async (id) => {
    try {
        let sql = `UPDATE empresas SET estado = 1 WHERE idempresa = ?`;
        const [rows] = await pool.query(sql, [id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};