import { Router } from "express";
import { actualizarCodigoBarra, buscarCodigoBarra, guardarCodigoBarra, listarCodigoBarra } from "../controllers/codbarras.controller";

const codbarraRouter = Router();

codbarraRouter.post("/registrar", guardarCodigoBarra) 
codbarraRouter.get("/listar", listarCodigoBarra);
codbarraRouter.get("/buscar/:id", buscarCodigoBarra );
codbarraRouter.put("/editar/:id", actualizarCodigoBarra)
codbarraRouter.patch("/deshabilitar/:id",)
codbarraRouter.patch("/habilitar/:id", );

export default codbarraRouter;
