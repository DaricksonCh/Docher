import { Router } from "express";
import { guardarProducto, listarProductos, buscarProducto, actualizarProducto, deshabilitarProducto, habilitarProducto } from '../controllers/productos.controller.js';


const productoRouter = Router();

productoRouter.post("/registrar", guardarProducto);
productoRouter.get("/listar", listarProductos);
productoRouter.get("/buscar/:id", buscarProducto);
productoRouter.put("/editar/:id", actualizarProducto);
productoRouter.patch("/deshabilitar/:id",deshabilitarProducto);
productoRouter.patch("/habilitar/:id", habilitarProducto);

export default productoRouter;
