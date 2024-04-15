import { Router } from "express";
import { actualizarContrato, buscarContrato, deshabilitarContrato, guardarContrato, habilitarContrato, listarContratos } from "../controllers/contratos.controller.js";

const contratoRouter = Router();

contratoRouter.post("/registrar",guardarContrato );
contratoRouter.get("/listar", listarContratos);
contratoRouter.get("/buscar/:id", buscarContrato);
contratoRouter.put("/editar/:id", actualizarContrato);
contratoRouter.patch("/deshabilitar/:id", deshabilitarContrato);
contratoRouter.patch("/habilitar/:id", habilitarContrato);

export default contratoRouter;
