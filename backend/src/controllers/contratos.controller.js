import {pool} from '../database/conexion.js';

export const listarContrato = async (req,res) => {
  try{
    const [result] = await pool.query(`SELECT * FROM contratos`);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
          "status": 204,
          "message": "No se Listo los contratos"
      });
    }
  }catch (e) {
    res.status(500).json({ message: "Error en listarContrato: " + e });
  }
}