import { Router } from "express";

import { guardarFactura, listarFacturas, buscarFactura, actualizarFactura, deshabilitarFactura, habilitarFactura } from '../controllers/factura.controllers.js';
import { validatorFactura } from "../validation/factura.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorFactura, guardarFactura);
router.get("/listar", validarToken, listarFacturas);
router.get("/buscar/:id", validarToken, buscarFactura);
router.put("/editar/:id", validarToken, validatorFactura, actualizarFactura);
router.patch("/deshabilitar/:id", validarToken, deshabilitarFactura);
router.patch("/habilitar/:id", validarToken, habilitarFactura);

export default router;
