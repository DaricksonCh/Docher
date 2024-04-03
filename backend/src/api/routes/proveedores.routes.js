import { Router } from "express";
import { guardarProveedor, listarProveedores, buscarProveedor, actualizarProveedor, deshabilitarProveedor, habilitarProveedor } from '../controllers/proveedor.controller.js';


const proveedorRoute = Router();

proveedorRoute.post("/registrar", guardarProveedor);
proveedorRoute.get("/listar", listarProveedores);
proveedorRoute.get("/buscar/:id", buscarProveedor);
proveedorRoute.put("/editar/:id", actualizarProveedor);
proveedorRoute.patch("/deshabilitar/:id", deshabilitarProveedor);
proveedorRoute.patch("/habilitar/:id", habilitarProveedor);

export default proveedorRoute;
