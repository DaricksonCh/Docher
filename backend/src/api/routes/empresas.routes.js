import { Router } from "express";

import { guardarEmpresa, listarEmpresas, buscarEmpresa, actualizarEmpresa, deshabilitarEmpresa, habilitarEmpresa } from '../controllers/empresa.controllers.js';
import { validatorEmpresa } from "../validation/empresa.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorEmpresa, guardarEmpresa);
router.get("/listar", validarToken, listarEmpresas);
router.get("/buscar/:id", validarToken, buscarEmpresa);
router.put("/editar/:id", validarToken, validatorEmpresa, actualizarEmpresa);
router.patch("/deshabilitar/:id", validarToken, deshabilitarEmpresa);
router.patch("/habilitar/:id", validarToken, habilitarEmpresa);

export default router;
