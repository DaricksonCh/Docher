import { Router } from "express";
import { validarToken } from "../controllers/autentificacion.controller.js";
import { guardarCodigoBarras, listarCodigosBarras, buscarCodigoBarras, actualizarCodigoBarras, deshabilitarCodigoBarras, habilitarCodigoBarras } from '../controllers/codigobarras.controllers.js';
import { validatorCodigoBarras } from "../validation/codigobarras.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorCodigoBarras, guardarCodigoBarras);
router.get("/listar", validarToken, listarCodigosBarras);
router.get("/buscar/:id", validarToken, buscarCodigoBarras);
router.put("/editar/:id", validarToken, validatorCodigoBarras, actualizarCodigoBarras);
router.patch("/deshabilitar/:id", validarToken, deshabilitarCodigoBarras);
router.patch("/habilitar/:id", validarToken, habilitarCodigoBarras);

export default router;
