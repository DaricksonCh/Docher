import { Router } from "express";
import { validarToken } from "../api/controllers/autentificacion.controller.js";
import { guardarContrato, listarContratos, buscarContrato, actualizarContrato, deshabilitarContrato, habilitarContrato } from '../api/controllers/contrato.controllers.js';
import { validatorContrato } from "../validation/contrato.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorContrato, guardarContrato);
router.get("/listar", validarToken, listarContratos);
router.get("/buscar/:id", validarToken, buscarContrato);
router.put("/editar/:id", validarToken, validatorContrato, actualizarContrato);
router.patch("/deshabilitar/:id", validarToken, deshabilitarContrato);
router.patch("/habilitar/:id", validarToken, habilitarContrato);

export default router;
