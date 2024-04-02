import { Router } from "express";
import { actualizarCategoria, buscarCategoria, listarUsuarios, guardarCategoria  } from "../controllers/categorias.controller.js";


const categoriaRoute = Router();

categoriaRoute.post("/registrar", guardarCategoria);
categoriaRoute.get("/listar",  listarUsuarios);
categoriaRoute.get('/buscar/:id', buscarCategoria);
categoriaRoute.put("/editar/:id", actualizarCategoria);

export default categoriaRoute;   
