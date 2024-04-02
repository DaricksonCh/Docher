import { Router } from "express";
import { guardarFacturaProveedor, listarFacturasProveedor, buscarFacturaProveedor, actualizarFacturaProveedor } from '../controllers/facproveedor.controller.js';

const facproveedorRouter = Router();

facproveedorRouter.post("/registrar", guardarFacturaProveedor);
facproveedorRouter.get("/listar", listarFacturasProveedor);
facproveedorRouter.get("/buscar/:id", buscarFacturaProveedor);
facproveedorRouter.put("/editar/:id", actualizarFacturaProveedor);


export default facproveedorRouter;
