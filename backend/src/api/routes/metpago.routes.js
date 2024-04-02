import { Router } from "express";
import { guardarMetodoPago, listarMetodosPago, buscarMetodoPago, actualizarMetodoPago, deshabilitarMetodoPago, habilitarMetodoPago } from '../controllers/metpago.controller.js';

const metpagoRouter = Router();

metpagoRouter.post("/registrar", guardarMetodoPago);
metpagoRouter.get("/listar", listarMetodosPago);
metpagoRouter.get("/buscar/:id", buscarMetodoPago);
metpagoRouter.put("/editar/:id", actualizarMetodoPago);
metpagoRouter.patch("/deshabilitar/:id", deshabilitarMetodoPago);
metpagoRouter.patch("/habilitar/:id", habilitarMetodoPago);

export default metpagoRouter;
