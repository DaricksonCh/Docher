import { Router } from "express";
import { guardarCategoria, listarCategorias, buscarCategoria, actualizarCategoria } from '../controllers/categoria.controllers.js';
import { validatorCategoria } from "../validation/categoria.validation.js";

const categoria = Router();

categoria.post("/registrar", validarToken, validatorCategoria, guardarCategoria);
categoria.get("/listar", validarToken, listarCategorias);
categoria.get('/buscar/:id', validarToken, buscarCategoria);
categoria.put("/editar/:id", validarToken, validatorCategoria, actualizarCategoria);

export default categoria;
