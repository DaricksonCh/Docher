import { Router } from "express";
import { validarToken } from "../controllers/autentificacion.controller.js";
import { guardarNotificacionContrato, listarNotificacionesContratos, buscarNotificacionContrato, actualizarNotificacionContrato, desactivarNotificacionContrato, activarNotificacionContrato } from '../controllers/notificacionescontratos.controllers.js';
import { validatorNotificacionContrato } from "../validation/notificacioncontrato.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorNotificacionContrato, guardarNotificacionContrato);
router.get("/listar", validarToken, listarNotificacionesContratos);
router.get("/buscar/:id", validarToken, buscarNotificacionContrato);
router.put("/editar/:id", validarToken, validatorNotificacionContrato, actualizarNotificacionContrato);
router.patch("/desactivar/:id", validarToken, desactivarNotificacionContrato);
router.patch("/activar/:id", validarToken, activarNotificacionContrato);

export default router;
