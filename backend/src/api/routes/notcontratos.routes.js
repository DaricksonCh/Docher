import { Router } from "express";
import { guardarNotificacionContrato, listarNotificacionesContratos, buscarNotificacionContrato, actualizarNotificacionContrato, desactivarNotificacionContrato, activarNotificacionContrato } from '../controllers/notcontratos.controller.js';


const notcontratoRouter = Router();

notcontratoRouter.post("/registrar", guardarNotificacionContrato);
notcontratoRouter.get("/listar", listarNotificacionesContratos);
notcontratoRouter.get("/buscar/:id", buscarNotificacionContrato);
notcontratoRouter.put("/editar/:id", actualizarNotificacionContrato);
notcontratoRouter.patch("/desactivar/:id", desactivarNotificacionContrato);
notcontratoRouter.patch("/activar/:id", activarNotificacionContrato);

export default notcontratoRouter;
