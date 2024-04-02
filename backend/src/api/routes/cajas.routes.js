import { Router } from "express";
import { actualizarCaja, buscarCaja, guardarCaja, listarCajas } from "../controllers/cajas.controller";

const cajaRouter= Router();

cajaRouter.post("/registrar", guardarCaja);
cajaRouter.get("/listar", listarCajas);
cajaRouter.get("/buscar/:id", buscarCaja);
cajaRouter.put("/editar/:id",  actualizarCaja);
cajaRouter.patch("/deshabilitar/:id", );
cajaRouter.patch("/habilitar/:id",  );

export default cajaRouter;
