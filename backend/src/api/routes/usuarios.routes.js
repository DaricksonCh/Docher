import { Router } from "express";
import { registrarUsuario, listarUsuarios, buscarUsuario, actualizarUsuario } from '../controllers/usuarios.controller.js';


const usuarioRouter = Router();

usuarioRouter.post("/registrar", registrarUsuario);
usuarioRouter.get("/listar", listarUsuarios);
usuarioRouter.get("/buscar/:id", buscarUsuario);
usuarioRouter.put("/editar/:id", actualizarUsuario);


export default usuarioRouter;
