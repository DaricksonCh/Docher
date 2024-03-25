import pool from '../../config/conexion.js';

export const guardarCaja = async (nombreCaja, totalCaja, fk_empresa, fk_factura, fk_cliente, fk_metodo) => {
  try{
    const sql = "INSERT INTO cajas(nombreCaja, totalCaja, fk_empresa, fk_factura, fk_cliente, fk_metodo) VALUES (?,?,?,?,?,?)";
    const [rows] = await pool.query(sql,[nombreCaja, totalCaja, fk_empresa, fk_factura, fk_cliente, fk_metodo]);
    return rows.affectedRows > 0;
  }catch(e){
    throw e;
  }
}
export const listarCajas = async () => {
  try {
    const [result] = await pool.query("SELECT * FROM cajas");
    return result;
  } catch (e) {
    throw e;
  }
};

export const buscarCaja = async (id) => {
  try {
    const [result] = await pool.query("SELECT * FROM cajas WHERE idcajas = ?", [id]);
    return result;
  } catch (e) {
    throw e;
  }
};

export const actualizarCaja = async (id, nombreCaja, totalCaja, fk_empresa, fk_factura, fk_cliente, fk_metodo) => {
  try {
    const sql = "UPDATE cajas SET nombreCaja=?, totalCaja=?, fk_empresa=?, fk_factura=?, fk_cliente=?, fk_metodo=? WHERE idcajas=?";
    const [rows] = await pool.query(sql, [nombreCaja, totalCaja, fk_empresa, fk_factura, fk_cliente, fk_metodo, id]);
    return rows.affectedRows > 0;
  } catch (e) {
    throw e;
  }
};

export const eliminarCaja = async (id) => {
  try {
    const [rows] = await pool.query("DELETE FROM cajas WHERE idcajas = ?", [id]);
    return rows.affectedRows > 0;
  } catch (e) {
    throw e;
  }
};