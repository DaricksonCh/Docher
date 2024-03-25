import {pool} from '../../config/conexion.js';
import { buscarProducto } from '../controllers/productos.controller.js';

export const guardarProducto = async ( nombreProducto,unidadMedida,descripcionProducto,precioProducto,stock,fk_codigoBarra,stockMin,fk_categoria)=>{
  try{
    const sql = "INSERT INTO productos(nombreProducto,unidadMedida,descripcionProducto,precioProducto,stock,fk_codigoBarra,stockMin,fk_categoria)";
    const [rows] = await pool.query(sql,[nombreProducto,unidadMedida,descripcionProducto,precioProducto,stock,fk_codigoBarra,stockMin,fk_categoria]);
    return rows.affectedRows > 0;
  }catch(e){
    throw e;
  }
}
export const listarProductos = async ()=>{
  try{
    const [result] = await pool.query("SELECT * FROM productos");
    return result;
  }catch(e){
    throw e;
  }
}
export const buscarProducto = async (id) =>{
  try{
    const [result] = await pool.query("SELECT * FROM productos WHERE =?",[id]);
    return result;
  }catch(e){
    throw e;
  }
}
export const actualizarProducto = async (id,nombreProducto,unidadMedida,descripcionProducto,precioProducto,stock,fk_codigoBarra,stockMin,fk_categoria) =>{
  try{
    const sql = "UPDATE productos SET nombreProducto=?,unidadMedida=?,descripcionProducto=?,precioProducto=?,stock=?,fk_codigoBarra=?,stockMin=?,fk_categoria=? WHERE idProducto=?";
    const [rows] = await pool.query(sql,[nombreProducto,unidadMedida,descripcionProducto,precioProducto,stock,fk_codigoBarra,stockMin,fk_categoria]);
    return rows.affectedRows > 0;
  }catch(e){
    throw e;
  }
}