import pool from '../../config/conexion.js';

export const guardarFactura = async (fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto) => {
    try {
        // Si la factura no existe, procedemos con la inserción
        const sql = "INSERT INTO facturas (fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto) VALUES (?, ?, ?, ?, ?)";
        const [rows] = await pool.query(sql, [fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const listarFacturas = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM facturas`);
        return result;
    } catch (e) {
        throw e;
    }
};

export const buscarFactura = async (id) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM facturas WHERE idFacturas = ?",
            [id]
        );
        return result;
    } catch (e) {
        throw e;
    }
};

export const actualizarFactura = async (id, fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto) => {
    try {
        let sql = `UPDATE facturas SET fechaFactura=?, precioTotal=?, codigoFactura=?, cantidadProducto=?, fk_producto=? WHERE idFacturas=?`;
        const [rows] = await pool.query(sql, [fechaFactura, precioTotal, codigoFactura, cantidadProducto, fk_producto, id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};