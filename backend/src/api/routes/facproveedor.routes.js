import { Router } from "express";
import { validarToken } from "../controllers/autentificacion.controller.js";
import { guardarFacturaProveedor, listarFacturasProveedor, buscarFacturaProveedor, actualizarFacturaProveedor, deshabilitarFacturaProveedor, habilitarFacturaProveedor } from '../controllers/facturaproveedor.controllers.js';
import { validatorFacturaProveedor } from "../validation/facturaproveedor.validation.js";

const router = Router();

router.post("/registrar", validarToken, validatorFacturaProveedor, guardarFacturaProveedor);
router.get("/listar", validarToken, listarFacturasProveedor);
router.get("/buscar/:id", validarToken, buscarFacturaProveedor);
router.put("/editar/:id", validarToken, validatorFacturaProveedor, actualizarFacturaProveedor);
router.patch("/deshabilitar/:id", validarToken, deshabilitarFacturaProveedor);
router.patch("/habilitar/:id", validarToken, habilitarFacturaProveedor);

export default router;
