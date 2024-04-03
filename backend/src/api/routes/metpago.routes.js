import { Router } from "express";
import { guardarMetodoPago, listarMetodosPago, buscarMetodoPago, actualizarMetodoPago} from '../controllers/metpago.controller.js';

const metpagoRouter = Router();

metpagoRouter.post("/registrar", guardarMetodoPago);
metpagoRouter.get("/listar", listarMetodosPago);
metpagoRouter.get("/buscar/:id", buscarMetodoPago);
metpagoRouter.put("/editar/:id", actualizarMetodoPago);


export default metpagoRouter;
