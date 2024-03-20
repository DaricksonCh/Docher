import {pool} from '../database/conexion.js';

export const listarContrato = async (req,res) => {
  try{
    
  }catch (e) {
    res.status(500).json({ message: "Error en listarContrato: " + e });
  }
}