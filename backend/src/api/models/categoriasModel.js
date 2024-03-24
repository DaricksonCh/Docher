import pool from '../../config/database.js';

export const guardarCategoria = async (nombreCategoria) => {
  try {
    const sql = "INSERT INTO categorias (nombreCategoria) VALUES (?)";
    const [rows] = await pool.query(sql, [nombreCategoria]);
    return rows.affectedRows > 0;
  } catch (e) {
    throw e;
  }
};

export const listarCategorias = async () => {
  try {
    const [result] = await pool.query("SELECT * FROM categorias");
    return result;
  } catch (e) {
    throw e;
  }
};

export const buscarCategoriaPorId = async (id) => {
  try {
    const [result] = await pool.query("SELECT * FROM categorias WHERE idCategoria = ?", [id]);
    return result;
  } catch (e) {
    throw e;
  }
};

export const actualizarCategoria = async (id, nombreCategoria) => {
  try {
    const sql = `UPDATE categorias SET nombreCategoria=? WHERE idCategoria=?`;
    const [rows] = await pool.query(sql, [nombreCategoria, id]);
    return rows.affectedRows > 0;
  } catch (e) {
    throw e;
  }
};

export const eliminarCategoria = async (id) => {
  try {
    const [rows] = await pool.query("DELETE FROM categorias WHERE idCategoria = ?", [id]);
    return rows.affectedRows > 0;
  } catch (e) {
    throw e;
  }
};