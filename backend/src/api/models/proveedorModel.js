import {pool} from '../../config/conexion.js';

export const guardarProveedor = async (nombreProveedor, direccionProveedor, telefonoProveedor) =>{
  try{
    const sql = "INSERT INTO proveedores(nombreProveedor, direccionProveedor, telefonoProveedor) VALUES (?,?,?)";
    const [rows] = await pool.query(sql,[nombreProveedor, direccionProveedor, telefonoProveedor]);
    return rows.affectedRows > 0;
  }catch(e){
    throw e;
  }
}
export const listarProveedores = async () =>{
  try{
    const [result] = await pool.query("SELECT * FROM proveedores");
    return result; 
  }catch(e){
    throw e;
  }
}
export const buscarProveedor = async (id) =>{
  try{
    const [result] = await pool.query("SELECT * FROM proveedores WHERE = ?",[id]);
    return result;
  }catch(e){
    throw e;
  }
}
export const actualizarProveedor = async (id,nombreProveedor, direccionProveedor, telefonoProveedor) =>{
  try{ 
    const sql = "UPDATE proveedores SET nombreProveedor=?,direccionProveedor=?,telefonoProveedor=? WHERE idProveedor =?";
    const [rows] = await pool.query(sql,[nombreProveedor, direccionProveedor, telefonoProveedor]);
    return rows.affectedRows > 0;
  }catch(e){
    throw e;
  }
}