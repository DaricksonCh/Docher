import { Router } from "express";
import { guardarProducto, listarProductos, buscarProducto, actualizarProducto, deshabilitarProducto, habilitarProducto } from '../controllers/productos.controller.js';


const productoRouter = Router();

productoRouter.post("/registrar", validarToken, validatorProducto, guardarProducto);
productoRouter.get("/listar", validarToken, listarProductos);
productoRouter.get("/buscar/:id", validarToken, buscarProducto);
productoRouter.put("/editar/:id", validarToken, validatorProducto, actualizarProducto);
productoRouter.patch("/deshabilitar/:id", validarToken, deshabilitarProducto);
productoRouter.patch("/habilitar/:id", validarToken, habilitarProducto);

export default productoRouter;
