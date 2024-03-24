import { Router } from "express";
import { validarToken } from "../controllers/autentificacion.controller.js";
import { guardarCaja, listarCajas, buscarCaja, actualizarCaja, deshabilitarCaja, habilitarCaja } from '../controllers/caja.controllers.js';
import { validatorCaja } from "../validation/caja.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorCaja, guardarCaja);
router.get("/listar", validarToken, listarCajas);
router.get("/buscar/:id", validarToken, buscarCaja);
router.put("/editar/:id", validarToken, validatorCaja, actualizarCaja);
router.patch("/deshabilitar/:id", validarToken, deshabilitarCaja);
router.patch("/habilitar/:id", validarToken, habilitarCaja);

export default router;
