import pool from '../../config/conexion.js';

export const guardarCliente = async (nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente) => {
    try {
        const sql = "INSERT INTO clientes (nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente) VALUES (?, ?, ?, ?, ?)";
        const [rows] = await pool.query(sql, [nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw new Error('Error al guardar cliente') + e;
    }
}

export const listarClientes = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM clientes`);
        return result
    } catch (error) {
        throw new Error('Error al listar cliente: ' + error);
    }
}

export const buscarCliente = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM clientes WHERE idCliente = ?`
        [id]);
        return result;
    } catch (error) {
        throw new Error('Error al buscar cliente: ' + error);
    }
}

export const actualizarCliente = async () => {
    try {
        const sql = `UPDATE clientes SET nombreCliente=?, documentoCliente=?, correoCliente=?, telefonoCliente=?, direccionCliente=? WHERE idCliente=?`;
        const [actualizar] = await pool.query(sql, [nombreCliente, documentoCliente, correoCliente, telefonoCliente, direccionCliente, id]);
        return actualizar;
    } catch (error) {
        throw new Error('Error al actualizar cliente: ' + error);
    }
}
