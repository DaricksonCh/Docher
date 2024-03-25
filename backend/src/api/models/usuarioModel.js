import {pool} from '../../config/conexion.js';

export const guardarUsuario = async (nombreUsuario,rolUsuario,documentoUsuario,correoUsuario,password,fk_empresa) =>{
  try{
    const sql = "INSERT INTO usuarios(nombreUsuario,rolUsuario,documentoUsuario,correoUsuario,password,fk_empresa) VALUES (?,?,?,?,?)";
    const [rows] = await pool.query(sql, [nombreUsuario,rolUsuario,documentoUsuario,correoUsuario,password,fk_empresa]);
    return rows.affectedRows > 0;
  }catch(e){
    throw e;
  }
}
export const listarUsuarios = async () => {
  try{
    const [result] = await pool.query("SELECT * FROM usuarios");
    return result;
  }catch(e){
    throw e;
  }
}  
export const buscarUsuario = async (id) =>{
  try{
    const [result] = await pool.query("SELECT * FROM usuarios WHERE idUsuario = ?",[id]);
    return result;
  }catch(e){
    throw e;
  }
}
export const actualizarUsuario = async (id,nombreUsuario,rolUsuario,documentoUsuario,correoUsuario,password,fk_empresa) =>{
  try{
    const sql = "UPDATE usuarios SET nombreUsuario=?,rolUsuario=?,documentoUsuario=?,correoUsuario=?,password=?,fk_empresa=? WHERE idUsuarios=?";
    const [rows] = await pool.query(sql, [nombreUsuario,rolUsuario,documentoUsuario,correoUsuario,password,fk_empresa,id]);
    return rows.affectedRows > 0;
  }catch(e){
    throw e;
  }
}