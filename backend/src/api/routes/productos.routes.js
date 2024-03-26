import { Router } from "express";

import { guardarProducto, listarProductos, buscarProducto, actualizarProducto, deshabilitarProducto, habilitarProducto } from '../controllers/producto.controllers.js';


const router = Router();

router.post("/registrar", validarToken, validatorProducto, guardarProducto);
router.get("/listar", validarToken, listarProductos);
router.get("/buscar/:id", validarToken, buscarProducto);
router.put("/editar/:id", validarToken, validatorProducto, actualizarProducto);
router.patch("/deshabilitar/:id", validarToken, deshabilitarProducto);
router.patch("/habilitar/:id", validarToken, habilitarProducto);

export default router;
