import { Router } from "express";
import { guardarEmpresa, listarEmpresas, buscarEmpresa, actualizarEmpresa, deshabilitarEmpresa, habilitarEmpresa } from '../controllers/empresas.controller.js';


const empresaRouter = Router();

empresaRouter.post("/registrar", guardarEmpresa);
empresaRouter.get("/listar", listarEmpresas);
empresaRouter.get("/buscar/:id", buscarEmpresa);
empresaRouter.put("/editar/:id", actualizarEmpresa);
empresaRouter.patch("/deshabilitar/:id", deshabilitarEmpresa);
empresaRouter.patch("/habilitar/:id", habilitarEmpresa);

export default empresaRouter;
