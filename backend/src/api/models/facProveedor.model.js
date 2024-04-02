import pool from '../../config/conexion.js';

export const guardarFacturaProveedor = async (nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor) => {
    try {
        // Si la factura de proveedor no existe, procedemos con la inserción
        const sql = "INSERT INTO facturaproveedor (nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const [rows] = await pool.query(sql, [nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};

export const listarFacturasProveedor = async () => {
    try {
        const [result] = await pool.query(`SELECT * FROM facturaproveedor`);
        return result;
    } catch (e) {
        throw e;
    }
};

export const buscarFacturaProveedor = async (id) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM facturaproveedor WHERE idFacturaProveedor = ?",
            [id]
        );
        return result;
    } catch (e) {
        throw e;
    }
};

export const actualizarFacturaProveedor = async (id, nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor) => {
    try {
        let sql = `UPDATE facturaproveedor SET nombreProducto=?, precioUnitario=?, stock=?, unidadMedida=?, precioTotal=?, fechaEntrega=?, fk_producto=?, fk_proveedor=? WHERE idFacturaProveedor=?`;
        const [rows] = await pool.query(sql, [nombreProducto, precioUnitario, stock, unidadMedida, precioTotal, fechaEntrega, fk_producto, fk_proveedor, id]);
        return rows.affectedRows > 0;
    } catch (e) {
        throw e;
    }
};
