import { Router } from "express";

import { guardarProveedor, listarProveedores, buscarProveedor, actualizarProveedor, deshabilitarProveedor, habilitarProveedor } from '../controllers/proveedor.controllers.js';


const router = Router();

router.post("/registrar", validarToken, validatorProveedor, guardarProveedor);
router.get("/listar", validarToken, listarProveedores);
router.get("/buscar/:id", validarToken, buscarProveedor);
router.put("/editar/:id", validarToken, validatorProveedor, actualizarProveedor);
router.patch("/deshabilitar/:id", validarToken, deshabilitarProveedor);
router.patch("/habilitar/:id", validarToken, habilitarProveedor);

export default router;
