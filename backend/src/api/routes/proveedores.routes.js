import { Router } from "express";
import { guardarProveedor, listarProveedores, buscarProveedor, actualizarProveedor, deshabilitarProveedor, habilitarProveedor } from '../controllers/proveedor.controller.js';


const proveedorRoute = Router();

proveedorRoute.post("/registrar", validarToken, validatorProveedor, guardarProveedor);
proveedorRoute.get("/listar", validarToken, listarProveedores);
proveedorRoute.get("/buscar/:id", validarToken, buscarProveedor);
proveedorRoute.put("/editar/:id", validarToken, validatorProveedor, actualizarProveedor);
proveedorRoute.patch("/deshabilitar/:id", validarToken, deshabilitarProveedor);
proveedorRoute.patch("/habilitar/:id", validarToken, habilitarProveedor);

export default proveedorRoute;
