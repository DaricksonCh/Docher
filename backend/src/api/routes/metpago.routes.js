import { Router } from "express";
import { validarToken } from "../controllers/autentificacion.controller.js";
import { guardarMetodoPago, listarMetodosPago, buscarMetodoPago, actualizarMetodoPago, deshabilitarMetodoPago, habilitarMetodoPago } from '../controllers/metodopagos.controllers.js';
import { validatorMetodoPago } from "../validation/metodopago.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorMetodoPago, guardarMetodoPago);
router.get("/listar", validarToken, listarMetodosPago);
router.get("/buscar/:id", validarToken, buscarMetodoPago);
router.put("/editar/:id", validarToken, validatorMetodoPago, actualizarMetodoPago);
router.patch("/deshabilitar/:id", validarToken, deshabilitarMetodoPago);
router.patch("/habilitar/:id", validarToken, habilitarMetodoPago);

export default router;
