import { Router } from "express";
import { guardarFactura, listarFacturas, buscarFactura, actualizarFactura} from '../controllers/factura.controller.js';
const facturaRouter = Router();

facturaRouter.post("/registrar", guardarFactura);
facturaRouter.get("/listar", listarFacturas);
facturaRouter.get("/buscar/:id", buscarFactura);
facturaRouter.put("/editar/:id", actualizarFactura);


export default facturaRouter;
